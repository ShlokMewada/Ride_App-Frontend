import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AutoCompleteAddress from "./SearchLocation";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const userLocation = useSelector((store) => store.user.userLocation);
  return (
    <div className="w-full bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center justify-between">
          <AutoCompleteAddress />
          <div className="hidden lg:block lg:w-[60%] px-16">
            <img
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_446,w_670/v1712926828/assets/a3/cf8564-e2a6-418c-b9b0-65dd285c100b/original/3-2-ridesharing-new.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
