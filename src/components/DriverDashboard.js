import React, { useEffect, useState } from "react";
import { MapPin, ChevronRight, CheckCircle, XCircle, User } from "lucide-react";
import Header from "./Header";
import axios from "axios";
import { useSelector } from "react-redux";
import MapBoxDriver from "./MapBoxDriver";
import Footer from "./Footer";

const DriverDashboard = () => {
  const coordinates = useSelector((store) => store.location.coordinates);
  console.log(coordinates);
  const [activeRideRequests, setActiveRideRequests] = useState([]);
  const [drivingHistory, setDrivingHistory] = useState([]);
  const [accept, setAccept] = useState(null);
  const [sourceCoordinates, setSourceCoordinates] = useState();
  const [destinationCoordinates, setDestinationCoordinates] = useState();

  // const [drivingHistory, setDrivingHistory] = useState([
  //   { id: 1, user: "Pranay Shah", date: "2024-09-15", earnings: "₹100" },
  //   { id: 2, user: "Kunj Panchal", date: "2024-09-14", earnings: "₹51" },
  //   { id: 3, user: "Khush Trivedi", date: "2024-09-13", earnings: "₹89" },
  // ]);

  const handleAccept = async (id, source, destination) => {
    await axios.post("http://localhost:8000/accept-booking/", {
      driver_id: JSON.parse(localStorage.getItem("user_id")),
      booking_id: id,
    });
    setAccept(true);
    setSourceCoordinates({ latitude: source.lat, longitude: source.lon });
    setDestinationCoordinates({
      latitude: destination.lat,
      longitude: destination.lon,
    });
  };

  const handleReject = async (id) => {
    await axios.post("http://localhost:8000/reject-booking/", {
      driver_id: JSON.parse(localStorage.getItem("user_id")),
      booking_id: id,
    });
    setAccept(false);
  };

  const getBookingRequests = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/get-nearby-bookings/",
        {
          lat: coordinates.lat,
          lon: coordinates.lon,
        }
      );
      console.log(response.data);
      setActiveRideRequests(response.data);
      setAccept(null);
    } catch (error) {
      console.error("Failed to fetch:", error); // Log the actual error
    }
  };
  const getDrivingHistory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/get-driver-history/",
        {
          driver_id: JSON.parse(localStorage.getItem("user_id")),
        }
      );
      console.log(response.data);
      setDrivingHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch:", error); // Log the actual error
    }
  };
  useEffect(() => {
    getBookingRequests();
    getDrivingHistory();
  }, [accept]);

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
              {activeRideRequests?.message !==
              "No nearby bookings available." ? (
                activeRideRequests.map((request) => (
                  <div
                    key={request.booking_id}
                    className="bg-gray-50 rounded-lg p-4 mb-4 transition-all duration-300 hover:shadow-md"
                  >
                    <p className="font-medium text-black text-lg">
                      {request.user_id}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <MapPin size={16} className="mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {request.source.sourcePlace}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <ChevronRight size={16} className="mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {request.destination.destinationPlace}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end mt-3 space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() =>
                          handleAccept(
                            request.booking_id,
                            request.source,
                            request.destination
                          )
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center w-full sm:w-auto"
                      >
                        <CheckCircle size={18} className="mr-2" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(request.booking_id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 flex items-center justify-center w-full sm:w-auto"
                      >
                        <XCircle size={18} className="mr-2" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  No ride requests
                </div>
              )}
            </div>

            {/* Driving History Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-black">
                Driving History
              </h2>
              <div className="space-y-3">
                {drivingHistory?.message !==
                "No trip history available for the driver." ? (
                  drivingHistory?.history?.map((ride, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <User
                          size={20}
                          className="text-gray-600 mr-3 flex-shrink-0"
                        />
                        <div>
                          <p className="font-medium text-black">
                            {ride.first_name + " " + ride.last_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(ride.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="font-medium text-black">
                    No Driving History
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="w-full lg:w-2/3">
            <MapBoxDriver
              sourceCoordinates={sourceCoordinates}
              destinationCoordinates={destinationCoordinates}
            />
          </div>
        </div>
      </div>
      <div className="mt-16 relative bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default DriverDashboard;

// first,lastname , phone no(optional)
