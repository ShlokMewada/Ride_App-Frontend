import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setRideBooked } from "../redux/userSlice";

const RideOptions = () => {
  let {
    distance,
    plot,
    sourceCoordinates,
    destinationCoordinates,
    sourcePlace,
    destinationPlace,
  } = useSelector((state) => state.location);
  distance = distance / 1000;
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState({});
  const [prices, setPrices] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(sourceCoordinates);

  const getPrizes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getPrizes/");
      console.log(response.data);
      setPrices(response.data);
      console.log(prices, "Prices");
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };
  useEffect(() => {
    getPrizes();
  }, []);

  const cabBooking = async () => {
    await axios
      .post("http://localhost:8000/create-booking/", {
        cab_type: selected.cab_type,
        user_id: JSON.parse(localStorage.getItem("user_id")),
        source: {
          lat: sourceCoordinates?.latitude,
          lon: sourceCoordinates?.longitude,
          sourcePlace: sourcePlace,
        },
        destination: {
          lat: destinationCoordinates?.latitude,
          lon: destinationCoordinates?.longitude,
          destinationPlace: destinationPlace,
        },
      })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          dispatch(setRideBooked(true));
          navigate("/");
        }, 2000);
        toast.success("Cab Book, Cab coming in 10mins!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {distance !== -1 && prices.length !== 0 && plot ? (
        <div className="w-full py-4 px-2 max-w-sm mx-auto">
          <div className="flex flex-col h-[calc(100vh-200px)] max-h-[600px]">
            <div className="flex-grow overflow-y-auto overflow-x-hidden">
              <div className="space-y-4 pr-1">
                {[
                  {
                    type: "byke",
                    name: "Bike",
                    img: "/images/Bike.png",
                    capacity: 2,
                    priceIndex: 0,
                  },
                  {
                    type: "auto",
                    name: "Auto",
                    img: "/images/Auto.png",
                    capacity: 3,
                    priceIndex: 1,
                  },
                  {
                    type: "economy",
                    name: "Economy",
                    img: "/images/Economy.png",
                    capacity: 4,
                    priceIndex: 2,
                  },
                  {
                    type: "classic",
                    name: "Classic",
                    img: "/images/Classic.png",
                    capacity: 4,
                    priceIndex: 3,
                  },
                  {
                    type: "premium",
                    name: "Premium",
                    img: "/images/Premium.png",
                    capacity: 4,
                    priceIndex: 4,
                  },
                  {
                    type: "extra large",
                    name: "Extra Large",
                    img: "/images/Extra Large.png",
                    capacity: 6,
                    priceIndex: 5,
                  },
                ].map((ride, index) => (
                  <div
                    key={index}
                    className={`py-2 w-full h-28 border-2 grid grid-cols-[1fr_2fr_1fr] items-center gap-x-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-105 duration-200 transition-all cursor-pointer ${
                      active === index + 1 ? "border-black bg-gray-300" : ""
                    }`}
                    onClick={() => {
                      setActive(index + 1);
                      setSelected({
                        cab_type: ride.type,
                        destination: destinationCoordinates,
                        source: sourceCoordinates,
                        price: prices[ride.priceIndex].price * distance,
                      });
                    }}
                  >
                    <span className="text-sm font-semibold text-center">
                      {ride.name}
                    </span>
                    <img
                      src={ride.img}
                      className="h-14 w-full object-contain"
                      alt={ride.name}
                    />
                    <div className="flex flex-col justify-center items-center text-xs">
                      <span className="font-bold">
                        {Math.ceil(prices[ride.priceIndex].price * distance)}₹
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <title>Person</title>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        {ride.capacity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <button
                className={`${
                  active === 0 ? "bg-gray-700" : "bg-black"
                } w-full h-[2.75rem] text-lg text-white py-2 rounded-full ${
                  active === 0 ? "cursor-not-allowed" : ""
                }`}
                disabled={active === 0}
                onClick={cabBooking}
              >
                Book Ride
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default RideOptions;
