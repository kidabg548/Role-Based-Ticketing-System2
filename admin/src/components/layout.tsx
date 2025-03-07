import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  Ticket,
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'tickets', label: 'Tickets', icon: Ticket, path: '/tickets' },
   
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
    setActiveItem(path.replace('/', '') || 'dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-white border-r border-gray-200 shadow-lg ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-72`}
      >
        <div className="flex items-center h-16 px-6 bg-white border-b border-gray-200">
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <Ticket className="h-9 w-9 text-blue-600 transform transition-all duration-300 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-blue-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
            </div>
            <span className="ml-2.5 text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              TicketFlow
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 ml-auto text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="py-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center w-full px-6 py-3.5 space-x-3 transition-all duration-200 group ${
                activeItem === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon
                size={20}
                className={`transition-transform duration-200 group-hover:scale-110 ${
                  activeItem === item.id ? 'text-blue-600' : 'text-gray-400'
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="md:ml-72">
        <header className="fixed top-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg md:hidden hover:bg-gray-100 text-gray-500"
              >
                <Menu size={24} />
              </button>
              <div className="hidden md:flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200 focus-within:border-blue-400 transition-colors duration-200">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="bg-transparent border-none focus:outline-none w-64 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-5">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <Bell size={20} className="text-gray-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white flex items-center justify-center shadow-md">
                    <User size={18} />
                  </div>
                  <span className="hidden sm:block font-medium text-gray-700">John Doe</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 border border-gray-200 transform transition-all duration-200">
                    <button className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 w-full transition-colors duration-200">
                      <Settings size={16} className="text-gray-400" />
                      <span className="text-gray-600">Settings</span>
                    </button>
                    <button className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 w-full transition-colors duration-200">
                      <HelpCircle size={16} className="text-gray-400" />
                      <span className="text-gray-600">Help Center</span>
                    </button>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <button className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 w-full text-red-600 transition-colors duration-200">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 pt-24">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;