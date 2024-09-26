import logo from "../assets/Cabify_Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [onSignUpClick, setOnSignUpClick] = useState(false);
  const [onSignInClick, setOnSignInClick] = useState(false);
  const navigate = useNavigate();
  const checkAuthenticate = localStorage.getItem("is_authenticated");
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthenticate);
  const userType = localStorage.getItem("user_type");
  const dispatch = useDispatch();

  const toggleSignUpClick = () => {
    setOnSignUpClick(!onSignUpClick);
  };

  const toggleSignInClick = () => {
    setOnSignInClick(!onSignInClick);
  };

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const navigateToBooking = () => {
    if (isAuthenticated) {
      navigate("/booking");
    } else {
      navigate("/login");
    }
  };

  const navigateToDriverDashboard = () => {
    if (isAuthenticated) {
      navigate("/driverdashboard");
    } else {
      navigate("/driver/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("is_authenticated");
    localStorage.removeItem("user_type");
    setIsAuthenticated(null);
    navigate("/");
    toast.success("Successfully Logged Out!");
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
            <ul className="flex flex-col gap-y-1 items-start w-full mt-14 pr-4 bg-white">
              <li className="font-semibold pl-2 py-2 text-2xl w-full">
                <button onClick={navigateToBooking}>Ride</button>
              </li>
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
          {userType !== "driver" && (
            <li className="font-semibold text-lg cursor-pointer">
              <button onClick={navigateToBooking}>Ride</button>
            </li>
          )}
          {userType !== "rider" && (
            <li className="font-semibold text-lg">
              <button onClick={navigateToDriverDashboard}>Drive</button>
            </li>
          )}
          <li className="font-semibold text-lg">About</li>
        </ul>
        {!isAuthenticated ? (
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
                <button className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full">
                  <Link to="/login">Login as Rider</Link>
                </button>
                <button className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full">
                  <Link to="/driver/login">Login as Driver</Link>
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
                <button className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full">
                  <Link to="/signup">Signup as Rider</Link>
                </button>
                <button className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full">
                  <Link to="/driver/signup">Signup as Driver</Link>
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
        ) : (
          <button
            className="text-lg px-7 py-2 bg-black hover:bg-opacity-80 transition-all duration-100 text-white rounded-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
