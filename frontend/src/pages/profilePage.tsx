import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faPhone, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { UserType } from '../types/types';

const ProfilePage = () => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        navigate("/login");
        // consider removing reload, and redirect user to login page
        //window.location.reload();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Warning!</strong>
                    <span className="block sm:inline">Please log in to view your profile.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl w-full mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-12 px-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight">
                                Welcome, {user.firstName} {user.lastName}
                            </h1>
                            <p className="mt-2 text-lg opacity-80">Manage your profile and settings here.</p>
                        </div>
                        <img
                            src="https://avatars.dicebear.com/api/avataaars/:seed.svg"
                            alt="Profile Avatar"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                        />
                    </div>
                </div>

                {/* Profile Content Section */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information Card */}
                    <div className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
                                <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                                Personal Information
                            </h2>
                            <div className="space-y-3">
                                <p><strong className="text-gray-600">First Name:</strong> {user.firstName}</p>
                                <p><strong className="text-gray-600">Last Name:</strong> {user.lastName}</p>
                            </div>
                        </div>
                    </div>

                    {/* Account Details Card */}
                    <div className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
                                <FontAwesomeIcon icon={faLock} className="mr-2 text-purple-500" />
                                Account Details
                            </h2>
                            <div className="space-y-3">
                                <p><strong className="text-gray-600">Username:</strong> {user.username}</p>
                                <p className="flex items-center">
                                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-green-500" />
                                    <strong className="text-gray-600">Email:</strong> {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Card (Optional) */}
                    {user.phone && (
                        <div className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
                                    <FontAwesomeIcon icon={faPhone} className="mr-2 text-yellow-500" />
                                    Contact Information
                                </h2>
                                <div className="space-y-3">
                                    <p><strong className="text-gray-600">Phone:</strong> {user.phone}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Social Links (Example - Customize as needed) */}
                    <div className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
                                Social Links
                            </h2>
                            <div className="flex space-x-4">
                                <a href="#" className="text-blue-500 hover:text-blue-700">
                                    <FontAwesomeIcon icon={faGithub} size="2x" />
                                </a>
                                <a href="#" className="text-blue-500 hover:text-blue-700">
                                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="p-8 flex justify-end">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 flex items-center"
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;