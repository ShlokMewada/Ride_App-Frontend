import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Booking from "./components/Booking";
import { useDispatch } from "react-redux";
import { is_authenticated } from "./redux/userSlice";
import { useEffect } from "react";
import DriverDashboard from "./components/DriverDashboard";
import FinalSignup from "./components/FinalSignup";
import { Toaster } from "react-hot-toast";
import { setCoordinates } from "./redux/locationSlice";

const App = () => {
  const dispatch = useDispatch();

  // const isAuthenticated = () => {
  //   const isAuthenticate = JSON.parse(localStorage.getItem("is_authenticated"));
  //   console.log(isAuthenticate);
  //   dispatch(is_authenticated(isAuthenticate));
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login isDriver={false} />,
    },
    {
      path: "/signup",
      element: <Signup isDriver={false} />,
    },
    {
      path: "driver/login",
      element: <Login isDriver={true} />,
    },
    {
      path: "driver/signup",
      element: <Signup isDriver={true} />,
    },
    {
      path: "/booking",
      element: <Booking />,
    },
    {
      path: "/driverdashboard",
      element: <DriverDashboard />,
    },
    {
      path: "/finalsignup",
      element: <FinalSignup />,
    },
  ]);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      dispatch(
        setCoordinates({ lat: pos.coords.latitude, lon: pos.coords.longitude })
      );
    });
  };

  getUserLocation();

  // useEffect(() => {
  //   isAuthenticated();
  // }, []);

  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
