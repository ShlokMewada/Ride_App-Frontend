import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login isRider={false}/>,
    },
    {
      path: "/signup",
      element: <Signup isRider={false}/>,
    },
    {
      path: "rider/login",
      element: <Login isRider={true}/>,
    },
    {
      path: "rider/signup",
      element: <Signup isRider={true}/>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
