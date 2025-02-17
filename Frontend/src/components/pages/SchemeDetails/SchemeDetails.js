import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSchemeById } from "../../../services/schemes/schemeService";
import { ArrowLeft, Target, List, FileText, Users, Building, Globe, Download, Share2 } from 'lucide-react';
import { jsPDF } from 'jspdf';  // Import jsPDF
import ChatBot from '../../common/ChatBot/ChatBot';

const SchemeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scheme, setScheme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchemeDetails = async () => {
            try {
                const data = await getSchemeById(id);
                setScheme(data);
            } catch (err) {
                setError("Failed to fetch scheme details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemeDetails();
    }, [id]);

    if (loading) return <div className="p-4 text-center">Loading...</div>;
    if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
    if (!scheme) return <div className="p-4 text-center">Scheme not found</div>;


    // pdf generate option
    const generatePDF = () => {
        try {
            const doc = new jsPDF();
    
            doc.setFontSize(20);
            doc.text(scheme.title, 20, 30);
    
            doc.setFontSize(16);
            doc.text("Objective:", 20, 40);
            doc.setFontSize(12);
            doc.text(scheme.objective, 20, 50);
    
            doc.setFontSize(16);
            doc.text("Key Features:", 20, 60);
            scheme.keyFeatures.forEach((feature, index) => {
                doc.text(`${index + 1}. ${feature}`, 20, 70 + (index * 10));
            });
    
            doc.setFontSize(16);
            doc.text("How to Apply:", 20, 90);
            if (scheme.howToApply.online) {
                doc.setFontSize(12);
                doc.text("Online:", 20, 100);
                doc.text(scheme.howToApply.online, 20, 110);
            }
            if (scheme.howToApply.offline) {
                doc.setFontSize(12);
                doc.text("Offline:", 20, 120);
                doc.text(scheme.howToApply.offline, 20, 130);
            }
    
            doc.setFontSize(16);
            doc.text("Required Documents:", 20, 140);
            scheme.documentsRequired.forEach((docItem, index) => {
                doc.setFontSize(12);
                doc.text(`${index + 1}. ${docItem}`, 20, 150 + (index * 10));
            });
    
            doc.setFontSize(16);
            doc.text("Categories:", 20, 170);
            scheme.category.incomeGroup.forEach((group, index) => {
                doc.setFontSize(12);
                doc.text(group, 20, 180 + (index * 10));
            });
    
            doc.save(`${scheme.title}.pdf`);
        } catch (error) {
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
                <p className="text-red-700">Error generating PDF: {error}</p>
            </div>
        }
    };

    const handleShare = () => {
        const shareText = `Check out this scheme: ${scheme.title}\n\nLearn more here: ${window.location.href}`;
        // mutile chize direct share nhi kar sakte that why share text
        if (navigator.share) {
            navigator.share({
                text: shareText,
            })
            .then(() => console.log("Shared successfully"))
            .catch((error) => console.log("Sharing failed", error));
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert("Scheme URL copied to clipboard!");
            }).catch((error) => {
                console.error("Failed to copy URL: ", error);
                alert("Failed to copy URL to clipboard.");
            });
        }
    };
    

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button 
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center"
            >
                <ArrowLeft className="mr-2" size={20} />
                Back
            </button>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold mb-4 text-[#74B83E]">{scheme.title}</h1>
                
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 flex items-center">
                        <Target className="mr-2" size={24} />
                        Objective
                    </h2>
                    <p className="text-gray-700">{scheme.objective}</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 flex items-center">
                        <List className="mr-2" size={24} />
                        Key Features
                    </h2>
                    <ul className="list-disc pl-5">
                        {scheme.keyFeatures.map((feature, index) => (
                            <li key={index} className="text-gray-700 mb-1">{feature}</li>
                        ))}
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 flex items-center">
                        <FileText className="mr-2" size={24} />
                        How to Apply
                    </h2>
                    {scheme.howToApply.online && (
                        <div className="mb-2">
                            <h3 className="font-medium">Online:</h3>
                            <p className="text-gray-700">{scheme.howToApply.online}</p>
                        </div>
                    )}
                    {scheme.howToApply.offline && (
                        <div>
                            <h3 className="font-medium">Offline:</h3>
                            <p className="text-gray-700">{scheme.howToApply.offline}</p>
                        </div>
                    )}
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 flex items-center">
                        <FileText className="mr-2" size={24} />
                        Required Documents
                    </h2>
                    <ul className="list-disc pl-5">
                        {scheme.documentsRequired.map((doc, index) => (
                            <li key={index} className="text-gray-700 mb-1">{doc}</li>
                        ))}
                    </ul>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2 flex items-center">
                            <Users className="mr-2" size={24} />
                            Categories
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {scheme.category.incomeGroup.map((group, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                                    {group}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2 flex items-center">
                            <Building className="mr-2" size={24} />
                            Additional Info
                        </h2>
                        <p className="text-gray-700">Ministry: {scheme.ministry}</p>
                        <p className="text-gray-700">Level: {scheme.level}</p>
                    </div>
                </section>

                <div className="mt-8 flex flex-wrap gap-4">
                    <a href={scheme.howToApply.online} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#74B83E] text-white rounded-md hover:bg-[#629a33] flex items-center">
                        <Globe className="mr-2" size={20} />
                        Apply Online
                    </a>
                    <button 
                        onClick={generatePDF} //call jayegi
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                    >
                        <Download className="mr-2" size={20} />
                        Download PDF
                    </button>
                    <button onClick={handleShare} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex items-center">
                        <Share2 className="mr-2" size={20} />
                        Share
                    </button>
                </div>
            </div>
            {scheme && <ChatBot schemeId={scheme._id} />}
        </div>
    );
};

export default SchemeDetails;
