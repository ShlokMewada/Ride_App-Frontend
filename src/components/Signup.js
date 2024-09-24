import { useRef, useState } from "react";
import { checkValidDataSignIn } from "../utils/validate";
import GoogleAuth from "./GoogleAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Signup = ({ isDriver }) => {
  const email = useRef();
  const password = useRef();
  const [emailErrorMsg, setEmailErrorMsg] = useState();
  const [passwordErrorMsg, setPasswordErrorMsg] = useState();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const navigateToSignInUser = () => {
    navigate("/login");
  };

  const navigateToSignInRider = () => {
    navigate("/driver/login");
  };

  const handleSubmit = async () => {
    // console.log(role); <<Role Check Console Log>>

    const message = checkValidDataSignIn(
      email.current.value,
      password.current.value
    );

    setEmailErrorMsg(message.emailMsg);
    setPasswordErrorMsg(message.passwordMsg);

    if (message.emailMsg !== "" || message.passwordMsg !== "") {
      return;
    }
    const formData = new FormData();
    formData.append("email", email.current.value);
    formData.append("password", password.current.value);
    formData.append("user_type", isDriver ? "driver" : "rider");

    await axios
      .post("http://localhost:8000/check-email/", {
        email: email.current.value,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(
          addUser({
            email: email.current.value,
            password: password.current.value,
            user_type: isDriver ? "driver" : "rider",
          })
        );
        localStorage.setItem("user_type", isDriver ? "driver" : "rider");
        // toast.success("Successfully Signed Up!");
        navigate("/finalsignup");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid Email or Password!");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <form
        className="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Sign Up
        </h2>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            type="text"
            placeholder="Enter Email"
            ref={email}
          />
          {emailErrorMsg && (
            <p className="mt-2 text-sm text-red-600">{emailErrorMsg}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            type="password"
            placeholder="Enter Password"
            ref={password}
          />
          {passwordErrorMsg && (
            <p className="mt-2 text-sm text-red-600">{passwordErrorMsg}</p>
          )}
        </div>

        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={handleSubmit}
        >
          Sign Up
        </button>

        <div className="flex flex-col items-center gap-y-2">
          <p className="text-sm font-medium text-gray-700">
            Sign Un Using Google:
          </p>
          <GoogleAuth isSignIn={false} role={false} />
        </div>

        {!isDriver ? (
          <div className="flex justify-center gap-x-1 text-sm">
            <p className="text-gray-600">Already a user?</p>
            <button
              className="font-medium text-gray-800 hover:text-gray-600"
              onClick={navigateToSignInUser}
            >
              Sign In now.
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-x-1 text-sm">
            <p className="text-gray-600">Already a driver?</p>
            <button
              className="font-medium text-gray-800 hover:text-gray-600"
              onClick={navigateToSignInRider}
            >
              Sign In now.
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
