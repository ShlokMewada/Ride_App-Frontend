import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="w-full bg-white min-h-screen py-20 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
          <div className="space-y-6 lg:w-1/2">
            <h1 className="text-5xl font-bold leading-tight text-gray-900">
              Ride Anytime, Anywhere With Cabify
            </h1>
            <p className="text-lg font-medium">
              Discover the ease and convenience of finding a ride at any moment.
              Whether you're commuting or heading to a distant destination, our
              services are always here for you.
            </p>
            <p className="text-lg">
              Experience unparalleled comfort and safety as you journey to your
              destination. Your ride, your way.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-500 transition-all duration-300">
              <Link to="/booking">Book a Ride Now</Link>
            </button>
          </div>

          <div className="lg:w-[50%]">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_446,w_670/v1712926828/assets/a3/cf8564-e2a6-418c-b9b0-65dd285c100b/original/3-2-ridesharing-new.jpg"
              alt="Ridesharing"
              className="rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
