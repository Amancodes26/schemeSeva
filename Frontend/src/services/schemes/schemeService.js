import { saveSchemes, getStoredSchemes } from '../../utils/indexedDB';

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/schemes`;

export const getFilteredSchemes = async (filters) => {
    try {
        const queryParams = new URLSearchParams();
        
        // Add filters to query params
        if (filters.tags) queryParams.append('tags', filters.tags);
        if (filters.gender) queryParams.append('gender', filters.gender);
        if (filters.age) queryParams.append('age', filters.age);
        if (filters.incomeGroup) queryParams.append('incomeGroup', filters.incomeGroup);
        if (filters.state) queryParams.append('state', filters.state);

        // Try to fetch from network first
        try {
            const response = await fetch(`${BACKEND_URL}/get-scheme-filtered?${queryParams}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            
            // Store the fetched data in IndexedDB
            await saveSchemes(data);
            return data;
        } catch (networkError) {
            console.log('Network error, falling back to cached data:', networkError);
            
            // If network request fails, get data from IndexedDB
            const cachedSchemes = await getStoredSchemes();
            
            // Apply filters to cached schemes
            return filterCachedSchemes(cachedSchemes, filters);
        }
    } catch (error) {
        throw error;
    }
};

export const getSchemeById = async (id) => {
    try {
        // Try to fetch from network first
        try {
            const response = await fetch(`${BACKEND_URL}/get-scheme-by-id/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (networkError) {
            console.log('Network error, falling back to cached data:', networkError);
            
            // If network request fails, get data from IndexedDB
            const cachedSchemes = await getStoredSchemes();
            return cachedSchemes.find(scheme => scheme._id === id);
        }
    } catch (error) {
        throw error;
    }
};

// Helper function to filter cached schemes
const filterCachedSchemes = (schemes, filters) => {
    return schemes.filter(scheme => {
        let matches = true;
        
        if (filters.tags) {
            matches = matches && scheme.tags.includes(filters.tags);
        }
        if (filters.gender) {
            matches = matches && scheme.category.gender.includes(filters.gender);
        }
        if (filters.incomeGroup) {
            matches = matches && scheme.category.incomeGroup.includes(filters.incomeGroup);
        }
        if (filters.state) {
            matches = matches && (scheme.state.includes(filters.state) || scheme.state.includes('all'));
        }
        
        return matches;
    });
};

// New function to sync schemes with server
export const syncSchemes = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/get-scheme-filtered`);
        if (!response.ok) throw new Error('Network response was not ok');
        const schemes = await response.json();
        await saveSchemes(schemes);
        return true;
    } catch (error) {
        console.error('Failed to sync schemes:', error);
        return false;
    }
};