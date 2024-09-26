import { useDispatch, useSelector } from "react-redux";
import MapBoxMap from "./MapBoxMap";
import SearchLocation from "./SearchLocation";
import {
  setSourceCoordinates,
  setDestinationCoordinates,
} from "../redux/locationSlice";
import { useEffect } from "react";
import Header from "./Header";
import RideOptions from "./RideOptions";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sourceMapboxId, destinationMapboxId, plot } = useSelector(
    (state) => state.location
  );
  const isAuthenticated = useSelector((store) => store.user.isAuthenticated);

  const getCoordinates = async (id, set) => {
    const res = await fetch(`http://localhost:8000/getCoordinates/?id=${id}`);
    const result = await res.json();
    set({
      latitude: result.coordinates.latitude,
      longitude: result.coordinates.longitude,
    });
  };

  useEffect(() => {
    if (plot) {
      getCoordinates(sourceMapboxId, (coords) =>
        dispatch(setSourceCoordinates(coords))
      );
      getCoordinates(destinationMapboxId, (coords) =>
        dispatch(setDestinationCoordinates(coords))
      );
    }
  }, [plot, sourceMapboxId, destinationMapboxId, dispatch]);

  if (!isAuthenticated) return navigate("/login");
  return (
    <div className="w-full bg-white min-h-screen py-12">
      <div className="top-0 left-0 right-0 -mt-12">
        <Header />
      </div>
      <div className="w-11/12 flex mx-auto px-4 sm:px-6 lg:px-8 mt-16 gap-x-10">
        <div className="flex flex-col gap-2">
          <SearchLocation />
          {plot && <RideOptions />}
        </div>
        <div className="w-full lg:w-2/3">
          <MapBoxMap />
        </div>
      </div>
    </div>
  );
};

export default Booking;
