import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GoogleAuth({ isSignIn, role }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const sendTokenToBackend = async (idToken) => {
    try {
      const response = await axios.post("https://api.example.com/signin", {
        id_token: idToken,
        role,
      });
      console.log(response.data);

      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.tokens.access);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        console.log("Login successful");
        navigate(redirectPath);
      } else {
        throw new Error("Failed to login with Google");
      }
    } catch (error) {
      console.error("Error sending token to backend:", error);
      setErrors("Failed to login. Please try again.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      sendTokenToBackend(codeResponse.access_token);
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      setErrors("Login failed. Please try again.");
    },
  });

  return (
    <div className="w-full">
      <button
        onClick={() => login()}
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <svg
          width="18"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
        {isSignIn ? "Sign in with Google" : "Sign up with Google"}
      </button>
      {errors && <div className="text-red-500 mt-2 text-sm">{errors}</div>}
    </div>
  );
}

export default GoogleAuth;
