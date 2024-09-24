import React, { useState, useEffect } from "react";
// import { source, destination, plotOnMap } from "./context";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const RideOptions = () => {
  let { distance, plot, sourceCoordinates, destinationCoordinates } =
    useSelector((state) => state.location);
  distance = distance / 1000;
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState({});
  const [prices, setPrices] = useState([]);

  const getPrizes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getPrizes/");
      console.log(response.data);
      setPrices(response.data);
      console.log(prices, "Prices"); // Log the response data
      // Handle the data
    } catch (error) {
      console.error("Failed to fetch:", error); // Log the actual error
    }
  };
  useEffect(() => {
    getPrizes();
  }, []);

  return (
    <>
      {distance !== -1 && prices.length !== 0 && plot ? (
        <div className="w-full py-4">
          <div className="grid grid-cols-3 grid-rows-[8rem_8rem_auto] w-[24rem] h-full gap-y-4 gap-x-2">
            <div
              className={`py-2  w-full h-32 border-2 grid grid-rows-[1rem_4rem_1rem] gap-y-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-110 duration-200 transition-all cursor-pointer ${
                active === 1 ? "border-black bg-gray-300" : ""
              }`}
              onClick={() => {
                setActive(1);
                setSelected({
                  name: "bike",
                  destination: destinationCoordinates,
                  source: sourceCoordinates,
                  price: prices[0].price * distance,
                });
              }}
            >
              <span className="flex text-md font-semibold justify-center items-center">
                Bike
              </span>
              <img
                src="/images/Bike.png"
                className="h-16 w-full object-cover flex justify-center items-center"
                alt="bike"
              />
              <div className="flex justify-evenly items-center text-sm">
                <span className="font-bold ">
                  {Math.ceil(prices[0].price * distance)}₹
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <title>Person</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  2
                </span>
              </div>
            </div>

            <div
              className={`py-2  w-full h-32 border-2 grid grid-rows-[1rem_4rem_1rem] gap-y-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-110 duration-200 transition-all cursor-pointer ${
                active === 2 ? "border-black bg-gray-300" : ""
              }`}
              onClick={() => {
                setActive(2);
                setSelected({
                  name: "auto",
                  destination: destinationCoordinates,
                  source: sourceCoordinates,
                  price: prices[1].price * distance,
                });
              }}
            >
              <span className="flex text-md font-semibold justify-center items-center">
                Auto
              </span>
              <img
                src="/images/Auto.png"
                className="h-16 w-full object-cover flex justify-center items-center"
                alt="auto"
              />
              <div className="flex justify-evenly items-center text-sm">
                <span className="font-bold ">
                  {Math.ceil(prices[1].price * distance)}₹
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <title>Person</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  3
                </span>
              </div>
            </div>

            <div
              className={`py-2 w-full h-32 border-2 grid grid-rows-[1rem_4rem_1rem] gap-y-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-110 duration-200 transition-all cursor-pointer' ${
                active === 3 ? "border-black  bg-gray-300 " : ""
              }`}
              onClick={() => {
                setActive(3);
                setSelected({
                  name: "economy",
                  destination: destinationCoordinates,
                  source: sourceCoordinates,
                  price: prices[2].price * distance,
                });
              }}
            >
              <span className="flex text-md font-semibold justify-center items-center">
                Economy
              </span>
              <img
                src="/images/Economy.png"
                className="h-16 w-full object-cover flex justify-center items-center"
                alt="economy car"
              />
              <div className="flex justify-evenly items-center text-sm">
                <span className="font-bold ">
                  {Math.ceil(prices[2].price * distance)}₹
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <title>Person</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  4
                </span>
              </div>
            </div>

            <div
              className={`py-2  w-full h-32 border-2 grid grid-rows-[1rem_4rem_1rem] gap-y-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-110 duration-200 transition-all cursor-pointer ${
                active === 4 ? "border-black bg-gray-300" : ""
              }`}
              onClick={() => {
                setActive(4);
                setSelected({
                  name: "classic",
                  destination: destinationCoordinates,
                  source: sourceCoordinates,
                  price: prices[3].price * distance,
                });
              }}
            >
              <span className="flex text-md font-semibold justify-center items-center">
                Classic
              </span>
              <img
                src="/images/Classic.png"
                className="h-16 w-full object-cover flex justify-center items-center"
                alt="classic car"
              />
              <div className="flex justify-evenly items-center text-sm">
                <span className="font-bold ">
                  {Math.ceil(prices[3].price * distance)}₹
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <title>Person</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  4
                </span>
              </div>
            </div>

            <div
              className={`py-2  w-full h-32 border-2 grid grid-rows-[1rem_4rem_1rem] gap-y-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-110 duration-200 transition-all cursor-pointer ${
                active === 5 ? "border-black bg-gray-300" : ""
              }`}
              onClick={() => {
                setActive(5);
                setSelected({
                  name: "premium",
                  destination: destinationCoordinates,
                  source: sourceCoordinates,
                  price: prices[4].price * distance,
                });
              }}
            >
              <span className="flex text-md font-semibold justify-center items-center">
                Premium
              </span>
              <img
                src="/images/Premium.png"
                className="h-16 w-full object-cover flex justify-center items-center"
                alt="premium car"
              />
              <div className="flex justify-evenly items-center text-sm">
                <span className="font-bold ">
                  {Math.ceil(prices[4].price * distance)}₹
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <title>Person</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  4
                </span>
              </div>
            </div>

            <div
              className={`py-2 w-full h-32 border-2 grid grid-rows-[1rem_4rem_1rem] gap-y-1 border-gray-200 rounded-lg hover:bg-gray-300 bg-[#F3F3F3] hover:border-black hover:scale-110 duration-200 transition-all cursor-pointer' ${
                active === 6 ? "border-black  bg-gray-300 " : ""
              }`}
              onClick={() => {
                setActive(6);
                setSelected({
                  name: "extra large",
                  destination: destinationCoordinates,
                  source: sourceCoordinates,
                  price: prices[5].price * distance,
                });
              }}
            >
              <span className="flex text-md font-semibold justify-center items-center">
                Extra Large
              </span>
              <img
                src="/images/Extra Large.png"
                className="h-16 w-full object-cover flex justify-center items-center"
                alt="extra large car"
              />
              <div className="flex justify-evenly items-center text-sm">
                <span className="font-bold ">
                  {Math.ceil(prices[5].price * distance)}₹
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <title>Person</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.5 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0ZM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  6
                </span>
              </div>
            </div>

            <button
              className={`${
                active === 0 ? "bg-gray-700" : "bg-black"
              } w-[24rem] h-[2.75rem] text-lg text-white py-2 rounded-full ${
                active === 0 ? "cursor-not-allowed" : ""
              }`}
              disabled={active === 0}
              onClick={() => {
                toast.success("Cab Booked!");
              }}
            >
              Book Ride
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default RideOptions;
