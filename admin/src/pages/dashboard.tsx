import { Ticket, TrendingUp, Users, Clock, AlertCircle, Settings, HelpCircle } from "lucide-react";

const AdminDashboard = () => {
  const notifications = [
    { id: 1, text: "New ticket submitted", time: "2 min ago" },
    { id: 2, text: "Server alert: High CPU usage", time: "10 min ago" },
    { id: 3, text: "Weekly report ready", time: "1 hour ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Tickets
            </h3>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Ticket size={20} className="text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-600 mt-4">245</p>
          <p className="text-green-600 text-sm mt-2 flex items-center">
            <TrendingUp size={16} className="mr-1" /> +12.5% from last week
          </p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Open Tickets
            </h3>
            <div className="p-2 bg-green-100 rounded-lg">
              <AlertCircle size={20} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-green-600 mt-4">42</p>
          <p className="text-sm text-gray-500 mt-2">Active cases</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Avg Response
            </h3>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock size={20} className="text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-600 mt-4">2.4h</p>
          <p className="text-sm text-gray-500 mt-2">Average time</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Active Users
            </h3>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users size={20} className="text-orange-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-orange-600 mt-4">1.2k</p>
          <p className="text-sm text-gray-500 mt-2">Online now</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {notifications.map((note) => (
              <div
                key={note.id}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {note.text}
                  </p>
                  <p className="text-xs text-gray-500">{note.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center">
                <Ticket size={24} className="text-blue-600 mb-2" />
                <span className="text-sm font-medium">New Ticket</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center">
                <Users size={24} className="text-green-600 mb-2" />
                <span className="text-sm font-medium">Add User</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center">
                <Settings size={24} className="text-purple-600 mb-2" />
                <span className="text-sm font-medium">Settings</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center">
                <HelpCircle size={24} className="text-orange-600 mb-2" />
                <span className="text-sm font-medium">Help</span>
              </button>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
