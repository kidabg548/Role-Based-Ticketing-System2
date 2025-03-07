import React, { ReactNode, useState, useEffect } from "react";
import { Ticket, User, Menu, X, HelpCircle, MessageSquare, Info } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <Ticket className="h-9 w-9 text-blue-600 transform transition-all duration-300 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-blue-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
              </div>
              <span className="ml-2.5 text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                TicketFlow
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link to="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors duration-200">
                <div className="flex items-center gap-1.5">
                  <Info className="h-4 w-4" />
                  <span>About</span>
                </div>
              </Link>
              <Link to="/features" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors duration-200">
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4" />
                  <span>Features</span>
                </div>
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors duration-200">
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4" />
                  <span>Contact</span>
                </div>
              </Link>

              <div className="w-px h-6 bg-gray-200 mx-2"></div>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/create/ticket"
                    className="ml-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow transform hover:-translate-y-0.5"
                  >
                    Create Ticket
                  </Link>
                  <Link
                    to="/profile"
                    className="ml-2 text-gray-700 hover:text-blue-600 px-3 py-2 flex items-center gap-1.5 rounded-lg transition-colors duration-200 hover:bg-blue-50 border border-transparent hover:border-blue-100"
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">Account</span>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-3 ml-2">
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow transform hover:-translate-y-0.5"
                  >
                    Login
                  </Link>
                </div>
              )}
            </nav>

            <button
              className="md:hidden rounded-md p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-96 border-t border-gray-100" : "max-h-0"
        }`}>
          <div className="px-4 pt-2 pb-4 space-y-1 bg-white">
            <Link to="/about" className="block px-3 py-2.5 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200">
              <div className="flex items-center">
                <Info className="h-5 w-5 mr-3" />
                <span className="font-medium">About</span>
              </div>
            </Link>
            <Link to="/features" className="block px-3 py-2.5 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200">
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-3" />
                <span className="font-medium">Features</span>
              </div>
            </Link>
            <Link to="/contact" className="block px-3 py-2.5 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-3" />
                <span className="font-medium">Contact</span>
              </div>
            </Link>
            
            <div className="h-px bg-gray-100 my-2"></div>
            
            {isLoggedIn ? (
              <>
                <Link to="/create/ticket" className="block px-3 py-2.5 text-blue-600 hover:text-blue-700 rounded-md hover:bg-blue-50 transition-colors duration-200 font-medium">
                  <div className="flex items-center">
                    <Ticket className="h-5 w-5 mr-3" />
                    <span>Create Ticket</span>
                  </div>
                </Link>
                <Link to="/profile" className="block px-3 py-2.5 text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3" />
                    <span className="font-medium">Account</span>
                  </div>
                </Link>
              </>
            ) : (
              <div className="flex flex-col space-y-2 mt-3 px-3">
                <Link to="/register" className="w-full text-center py-2.5 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  Sign Up
                </Link>
                <Link to="/login" className="w-full text-center py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Ticket className="h-7 w-7 text-blue-400 mr-2" />
                <span className="text-xl font-bold text-white">TicketFlow</span>
              </div>
              <p className="text-gray-400 text-sm">
                Streamlined support ticketing to help you resolve issues faster and more efficiently.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:col-span-2">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/docs" className="text-gray-400 hover:text-white transition-colors">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link to="/guides" className="text-gray-400 hover:text-white transition-colors">
                      Guides
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center md:flex md:items-center md:justify-between">
            <p className="text-sm">© 2025 TicketFlow. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4 md:mt-0">
              {/* Social icons */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;