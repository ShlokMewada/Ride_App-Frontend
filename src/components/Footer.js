import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Cabify_Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const navigate = useNavigate();

  const navigateToBooking = () => {
    navigate("/booking");
  };

  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/">
              <img src={logo} alt="LOGO" className="w-32 h-16 object-contain" />
            </Link>
            <p className="mt-4 text-sm text-center md:text-left">
              Connecting you to what matters most
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Company
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-800 transition-colors duration-300"
                >
                  About us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Products
            </h2>
            <ul className="space-y-2">
              <li className="hover:text-gray-800 transition-colors duration-300">
                <button onClick={navigateToBooking}>Ride</button>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-800 transition-colors duration-300"
                >
                  Drive
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Global Citizenship
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-800 transition-colors duration-300"
                >
                  Safety
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 Cabify. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              <FontAwesomeIcon icon={faFacebookF} className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-600 hover:text-pink-600 transition duration-300"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-600 hover:text-blue-400 transition duration-300"
            >
              <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
