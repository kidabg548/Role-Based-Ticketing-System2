// Home.tsx
import {
    Clock,
    CheckCircle,
    MessageCircle,
    ArrowRight,
  } from "lucide-react";
  import { Link } from "react-router-dom";
  import { useAppContext } from "../contexts/AppContext";
  
  const Home = () => {
    const { isLoggedIn } = useAppContext();
  
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        {isLoggedIn ? (
          <section className="mb-24">
            <div className="text-center mb-16">
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 animate__animated animate__fadeInDown">
                Welcome Back!
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate__animated animate__fadeIn">
                Manage your support tickets and track their progress in real-time.
              </p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">Open Tickets</h3>
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <div className="flex justify-end">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
  
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">In Progress</h3>
                  <span className="text-2xl font-bold text-yellow-500">2</span>
                </div>
                <div className="flex justify-end">
                  <button className="text-yellow-500 hover:text-yellow-700 text-sm font-medium flex items-center gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
  
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-700">Resolved</h3>
                  <span className="text-2xl font-bold text-green-500">8</span>
                </div>
                <div className="flex justify-end">
                  <button className="text-green-500 hover:text-green-700 text-sm font-medium flex items-center gap-1">
                    View All <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
  
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <Link to="/tickets">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-700">
                      Total Tickets
                    </h3>
                    <span className="text-2xl font-bold text-purple-500">
                      13
                    </span>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <button className="text-purple-500 hover:text-purple-700 text-sm font-medium flex items-center gap-1">
                    View History <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
  
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/create/ticket"
                    className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow"
                  >
                    Create New Ticket
                  </Link>
                  <button className="bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    Contact Support
                  </button>
                  <button className="bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    View Timeline
                  </button>
                  <button className="bg-gray-100 text-gray-700 p-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    Track Progress
                  </button>
                </div>
              </div>
  
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    <div>
                      <p className="text-gray-700">Ticket #1234 was updated</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="text-gray-700">Ticket #1233 was resolved</p>
                      <p className="text-sm text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <div>
                      <p className="text-gray-700">
                        New response on Ticket #1232
                      </p>
                      <p className="text-sm text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          // Hero section before login
          <section className="text-center mb-24">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 animate__animated animate__fadeInDown">
              Support Made Simple
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate__animated animate__fadeIn">
              Create, track, and resolve support tickets effortlessly. Get the
              help you need, when you need it.
            </p>
            <div className="flex justify-center gap-4 animate__animated animate__fadeInUp">
              <button className="bg-blue-600 text-white px-8 py-4 text-lg rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg cursor-pointer">
                Get Started <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 text-lg rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:shadow-md cursor-pointer">
                Learn More
              </button>
            </div>
          </section>
        )}
  
        <section className="mt-32">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200">
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-time Updates
              </h3>
              <p className="text-gray-600">
                Stay informed with instant notifications and real-time status
                updates.
              </p>
            </div>
  
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200">
              <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quick Resolution
              </h3>
              <p className="text-gray-600">
                Get your issues resolved quickly with our efficient ticketing
                system.
              </p>
            </div>
  
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200">
              <MessageCircle className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Communication
              </h3>
              <p className="text-gray-600">
                Seamless communication between users and support staff.
              </p>
            </div>
          </div>
        </section>
  
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose TicketFlow?
          </h2>
          <div className="bg-blue-600 rounded-xl p-8 text-white text-center shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">99%</div>
                <div className="text-blue-100">Resolution Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">2h</div>
                <div className="text-blue-100">Average Response Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support Available</div>
              </div>
            </div>
          </div>
        </section>
  
        {!isLoggedIn && (
          <section className="mt-32 py-16 bg-gray-100 rounded-xl">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Simplify Your Support?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Start your free trial today and experience the power of TicketFlow.
              </p>
              <button className="bg-green-600 text-white px-8 py-4 text-lg rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer">
                Start Free Trial
              </button>
            </div>
          </section>
        )}
      </div>
    );
  };
  
  export default Home;