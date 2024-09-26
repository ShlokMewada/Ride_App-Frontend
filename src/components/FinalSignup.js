import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addIsAuthenticated } from "../redux/userSlice";

const FinalSignup = ({ isDriver }) => {
  const formDataSignup = useSelector((store) => store.user.user);
  const firstName = useRef();
  const lastName = useRef();
  const phoneNo = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formData = new FormData();

  function addObjectToFormData(formData, obj) {
    Object.keys(obj).forEach((key) => {
      formData.append(key, obj[key]);
    });
    return formData;
  }

  addObjectToFormData(formData, formDataSignup);

  const handleSubmit = async () => {
    formData.append("first_name", firstName.current.value);
    formData.append("last_name", lastName.current.value);
    formData.append("phone_number", phoneNo.current.value);

    await axios
      .post("http://localhost:8000/register/", formData)
      .then((response) => {
        localStorage.setItem("is_authenticated", true);
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("user_type", response.data.type);
        dispatch(addIsAuthenticated(true));
        console.log(response);
        toast.success("Successfully Signed Up!");
        response.data.type === "driver"
          ? navigate("/driverdashboard")
          : navigate("/");
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
          Register
        </h2>

        <div>
          <label
            htmlFor="firstname"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstname"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            type="text"
            placeholder="Enter First Name"
            ref={firstName}
          />
        </div>
        <div>
          <label
            htmlFor="lastname"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastname"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            type="text"
            placeholder="Enter Last Name"
            ref={lastName}
          />
        </div>

        <div>
          <label
            htmlFor="phoneNo"
            className="block text-sm font-medium text-gray-700"
          >
            Phone no.
          </label>
          <input
            id="phoneNo"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            type="text"
            placeholder="Enter Phone Number"
            ref={phoneNo}
          />
        </div>

        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FinalSignup;
