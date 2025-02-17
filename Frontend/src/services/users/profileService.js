import userAuthenticatedAxiosInstance from './userAuthenticatedAxiosInstance';

export const getUserProfile = async () => {
    try {
        const response = await userAuthenticatedAxiosInstance.get('/profile');
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (profileData) => {
    try {
        const response = await userAuthenticatedAxiosInstance.patch('/profile', profileData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
