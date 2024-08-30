import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeroSection = () => {
  return (
    <div className="w-10/12 mx-auto mt-10">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="">
          <h1>Request a ride</h1>
          <div className="flex flex-col">
            {/* <FontAwesomeIcon icon={faLocationArrow} /> */}
            <input type="text" />
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
