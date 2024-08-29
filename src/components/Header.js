import logo from "../assets/Cabify_Logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full border-b-2 border-gray-300">
      <div className="w-full md:w-10/12 flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center mx-auto md:p-5">
        <div
          className={
            isOpen
              ? "flex flex-col md:hidden w-full p-2 "
              : "w-full p-3 md:hidden"
          }
        >
          <div className="w-full flex justify-between items-center">
            <button
              onClick={toggleSideBar}
              className={
                isOpen
                  ? "bg-black hover:bg-opacity-80 transition-all duration-200 text-white rounded-full h-6 w-6 flex items-center justify-center"
                  : ""
              }
            >
              {isOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
            <Link to="/">
              <img src={logo} alt="LOGO" className="w-16 md:w-20" />
            </Link>
          </div>
          {isOpen && (
            <ul className="flex flex-col gap-y-1 items-start w-full mt-2">
              <li className="pl-2 text-sm border hover:bg-opacity-80 transition-all duration-200 border-black rounded-md w-full p-1 bg-black text-white">
                Ride
              </li>
              <li className="pl-2 text-sm border hover:bg-opacity-80 transition-all duration-200 border-black rounded-md w-full p-1 bg-black text-white">
                Drive
              </li>
              <li className="pl-2 text-sm border hover:bg-opacity-80 transition-all duration-200 border-black rounded-md w-full p-1 bg-black text-white">
                About
              </li>
              <div className="pl-2 text-sm border hover:bg-opacity-80 transition-all duration-200 border-black rounded-md w-full p-1 bg-black text-white">
                Login
              </div>
              <div className="pl-2 text-sm border hover:bg-opacity-80 transition-all duration-200 border-black rounded-md w-full p-1 bg-black text-white">
                Signup
              </div>
            </ul>
          )}
        </div>
        <ul className="gap-x-8 items-center hidden md:flex">
          <li className="">
            <Link to="/">
              <img src={logo} alt="LOGO" className="w-16 md:w-20" />
            </Link>
          </li>
          <li className="font-semibold text-lg">Ride</li>
          <li className="font-semibold text-lg">Drive</li>
          <li className="font-semibold text-lg">About</li>
        </ul>
        <div className="gap-x-2 hidden md:flex">
          <button className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full">
            Login
          </button>
          <button className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
