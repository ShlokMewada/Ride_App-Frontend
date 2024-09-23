import React, { useState } from "react";
import {
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle,
  XCircle,
  User,
  DollarSign,
} from "lucide-react";
import MapBoxMap from "./MapBoxMap";
import Header from "./Header";

const DriverDashboard = () => {
  const [activeRideRequests, setActiveRideRequests] = useState([
    { id: 1, user: "John Doe", pickup: "123 Main St", dropoff: "456 Elm St" },
    {
      id: 2,
      user: "Jane Smith",
      pickup: "789 Oak Ave",
      dropoff: "321 Pine Rd",
    },
  ]);

  const [drivingHistory, setDrivingHistory] = useState([
    { id: 1, user: "Alice Johnson", date: "2024-09-15", earnings: "$25.50" },
    { id: 2, user: "Bob Williams", date: "2024-09-14", earnings: "$18.75" },
    { id: 3, user: "Carol Davis", date: "2024-09-13", earnings: "$32.00" },
  ]);

  const handleAccept = (id) => {
    setActiveRideRequests(
      activeRideRequests.filter((request) => request.id !== id)
    );
  };

  const handleReject = (id) => {
    setActiveRideRequests(
      activeRideRequests.filter((request) => request.id !== id)
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-black">Driver Dashboard</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Ride Requests and Driving History */}
          <div className="lg:w-1/3 space-y-6">
            {/* Ride Requests Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-black">
                Ride Requests
              </h2>
              {activeRideRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-gray-50 rounded-lg p-4 mb-4 transition-all duration-300 hover:shadow-md"
                >
                  <p className="font-medium text-black text-lg">
                    {request.user}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <MapPin size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{request.pickup}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <ChevronRight size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{request.dropoff}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end mt-3 space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center w-full sm:w-auto"
                    >
                      <CheckCircle size={18} className="mr-2" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 flex items-center justify-center w-full sm:w-auto"
                    >
                      <XCircle size={18} className="mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Driving History Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-black">
                Driving History
              </h2>
              <div className="space-y-3">
                {drivingHistory.map((ride) => (
                  <div
                    key={ride.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <User
                        size={20}
                        className="text-gray-600 mr-3 flex-shrink-0"
                      />
                      <div>
                        <p className="font-medium text-black">{ride.user}</p>
                        <p className="text-sm text-gray-600">{ride.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-black font-medium">
                      <DollarSign size={18} className="mr-1" />
                      {ride.earnings}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 h-full border border-gray-200">
              <div className="h-[calc(100vh-12rem)]">
                <MapBoxMap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;


// first,lastname , phone no(optional)