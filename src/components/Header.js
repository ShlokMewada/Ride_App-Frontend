import logo from "../assets/Cabify_Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [onSignUpClick, setOnSignUpClick] = useState(false);
  const [onSignInClick, setOnSignInClick] = useState(false);
  const navigate = useNavigate();

  const toggleSignUpClick = () => {
    setOnSignUpClick(!onSignUpClick);
  };

  const toggleSignInClick = () => {
    setOnSignInClick(!onSignInClick);
  };

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const navigateToSignInUser = () => {
    navigate("/login");
  };

  const navigateToSignInRider = () => {
    navigate("/rider/login");
  };

  const navigateToSignUpUser = () => {
    navigate("/signup");
  };

  const navigateToSignUpRider = () => {
    navigate("/rider/signup");
  };

  return (
    <div className="w-full md:border-b-2 md:border-gray-300">
      <div className="w-full md:w-10/12 flex flex-col items-start gap-y-4 md:flex-row md:justify-between md:items-center mx-auto md:p-5">
        <div
          className={
            isOpen
              ? "flex flex-col md:hidden w-full py-4 px-5"
              : "w-full py-4 px-5 md:hidden"
          }
        >
          <div className="w-full flex justify-between items-center">
            <Link to="/">
              <img src={logo} alt="LOGO" className="w-16 md:w-20" />
            </Link>
            <button
              onClick={toggleSideBar}
              className={
                isOpen
                  ? "bg-black hover:bg-opacity-80 transition-all duration-200 text-white rounded-full h-6 w-6 flex items-center justify-center"
                  : "h-6 w-6"
              }
            >
              {isOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>
          {isOpen && (
            <ul className="flex flex-col gap-y-1 items-start w-full absolute mt-14 pr-4 bg-white">
              <li className="font-semibold pl-2 py-2 text-2xl w-full">Ride</li>
              <li className="font-semibold pl-2 py-2 text-2xl w-full">Drive</li>
              <li className="font-semibold pl-2 py-2 text-2xl w-full">About</li>
              <div className="font-semibold pl-2 py-2 text-2xl w-full">
                Login
              </div>
              <div className="font-semibold pl-2 py-2 text-2xl w-full">
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
          {!onSignInClick && (
            <button
              className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full"
              onClick={toggleSignInClick}
            >
              Login
            </button>
          )}
          {onSignInClick && (
            <div className="flex gap-x-2 items-center">
              <button
                onClick={toggleSignInClick}
                className="bg-black hover:bg-opacity-80 transition-all duration-200 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <button
                className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full"
                onClick={navigateToSignInUser}
              >
                Login as User
              </button>
              <button
                className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full"
                onClick={navigateToSignInRider}
              >
                Login as Rider
              </button>
            </div>
          )}
          {!onSignUpClick && (
            <button
              className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full"
              onClick={toggleSignUpClick}
            >
              Signup
            </button>
          )}

          {onSignUpClick && (
            <div className="flex gap-x-2 items-center">
              <button
                className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full"
                onClick={navigateToSignUpUser}
              >
                Signup as User
              </button>
              <button
                className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full"
                onClick={navigateToSignUpRider}
              >
                Signup as Rider
              </button>
              <button
                onClick={toggleSignUpClick}
                className="bg-black hover:bg-opacity-80 transition-all duration-200 text-white rounded-full h-6 w-6 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
