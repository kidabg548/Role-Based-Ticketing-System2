import React, { ReactNode } from 'react';
import {
    Ticket,
    User,
} from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [accountOpen, setAccountOpen] = useState(false);
    const accountButtonRef = useRef<HTMLDivElement>(null);
    const { isLoggedIn } = useAppContext();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                accountButtonRef.current &&
                !accountButtonRef.current.contains(event.target as Node)
            ) {
                setAccountOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [accountButtonRef]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
            <header className="bg-white shadow-md sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <Ticket className="h-8 w-8 text-blue-600 mr-2 transform transition-transform hover:scale-110 cursor-pointer" />
                            <span className="ml-2 text-xl font-bold text-gray-900">
                                TicketFlow
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200 cursor-pointer">
                            About
                        </button>
                        <button className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200 cursor-pointer">
                            Features
                        </button>
                        <button className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200 cursor-pointer">
                            Contact
                        </button>

                        {isLoggedIn ? (
                            <>
                                <Link to="/create/ticket" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer">
                                    Create Ticket
                                </Link>
                                <div className="relative" ref={accountButtonRef}>
                                    <button
                                        className="text-gray-600 hover:text-blue-600 px-3 py-2 flex items-center gap-2 rounded-md transition-colors duration-200 cursor-pointer"
                                        onClick={() => setAccountOpen(!accountOpen)}
                                    >
                                        <User className="h-5 w-5" /> Account
                                    </button>
                                    {accountOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md p-2">
                                            {/* Removed Logout Button */}
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer">
                                Login
                            </Link>
                        )}
                    </div>
                </nav>
            </header>

            <main className="flex-grow">
                {children}
            </main>

            <footer className="bg-gray-900 text-gray-300 py-12 mt-12 text-center">
                <p>© 2025 TicketFlow. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;