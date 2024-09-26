import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const isAuthenticated = localStorage.getItem("is_authenticated");
  const rideBooked = useSelector((store) => store.user.rideBooked);
  const userType = localStorage.getItem("user_type");
  const [tripHistory, setTripHistory] = useState();

  const getTripHistory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/get-user-history/",
        {
          user_id: JSON.parse(localStorage.getItem("user_id")),
        }
      );
      console.log(response.data);
      const sortedHistory = response.data.history.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setTripHistory(sortedHistory);
    } catch (error) {
      console.error("Failed to fetch:", error); // Log the actual error
    }
  };

  useEffect(() => {
    userType === "rider" && getTripHistory();
  }, []);

  return (
    <div className="w-full bg-white min-h-screen py-20 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          <div className="space-y-6 lg:w-1/2">
            <h1 className="text-5xl font-bold leading-tight text-gray-900">
              Ride Anytime, Anywhere With Cabify
            </h1>
            <p className="text-lg font-medium">
              Discover the ease and convenience of finding a ride at any moment.
              Whether you're commuting or heading to a distant destination, our
              services are always here for you.
            </p>
            <p className="text-lg">
              Experience unparalleled comfort and safety as you journey to your
              destination. Your ride, your way.
            </p>
            {!rideBooked ? (
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-500 transition-all duration-300">
                <Link to={isAuthenticated ? "/booking" : "/login"}>
                  Book a Ride Now
                </Link>
              </button>
            ) : (
              userType === "rider" && (
                <div className="w-full h-[100px] bg-green-400 text-white font-semibold text-4xl rounded-lg p-3">
                  Your Ride is coming in 10 minutes!
                </div>
              )
            )}
          </div>

          <div className="lg:w-[50%]">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_446,w_670/v1712926828/assets/a3/cf8564-e2a6-418c-b9b0-65dd285c100b/original/3-2-ridesharing-new.jpg"
              alt="Ridesharing"
              className="rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500"
            />
          </div>
        </div>
        {userType === "rider" && (
          <div className="trip-history-container bg-gray-100 p-6 rounded-md shadow-md mt-20">
            <h2 className="text-2xl font-bold mb-4">Rider Trip History</h2>
            {tripHistory && tripHistory?.length > 0 ? (
              <div className="space-y-4">
                {tripHistory?.map((trip, index) => (
                  <div
                    key={index}
                    className="trip-card bg-white p-4 rounded-md shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Ride Type:</span>
                      <span className="text-gray-700 capitalize">
                        {trip.cab_type}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm">
                        <span className="font-semibold">Source:</span>{" "}
                        {trip.source.sourcePlace
                          ? trip.source.sourcePlace
                          : `${trip.source.lat}, ${trip.source.lon}`}
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">Destination:</span>{" "}
                        {trip.destination.destinationPlace
                          ? trip.destination.destinationPlace
                          : `${trip.destination.lat}, ${trip.destination.lon}`}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="text-sm">
                        <span className="font-semibold">Price:</span> ₹
                        {trip.price}
                      </div>
                      <div
                        className={`text-sm ${
                          trip.status === "accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        <span className="font-semibold">Status:</span>{" "}
                        {trip.status}
                      </div>
                    </div>
                    {trip.driver_first_name && (
                      <div className="mt-2 text-sm">
                        <span className="font-semibold">Driver:</span>{" "}
                        {trip.driver_first_name} {trip.driver_last_name}
                      </div>
                    )}
                    <div className="mt-2 text-xs text-gray-500">
                      <span className="font-semibold">Trip Date:</span>{" "}
                      {new Date(trip.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No trips found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
