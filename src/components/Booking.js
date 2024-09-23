import { useDispatch, useSelector } from "react-redux";
import MapBoxMap from "./MapBoxMap";
import SearchLocation from "./SearchLocation";
import {
  setSourceMapboxId,
  setDestinationMapboxId,
  setPlot,
  setSourceCoordinates,
  setDestinationCoordinates,
  setHamburgerOpen,
} from "../redux/locationSlice";
import { useEffect } from "react";

const Booking = () => {
  const dispatch = useDispatch();
  const {
    authenticated,
    sourceMapboxId,
    destinationMapboxId,
    plot,
    sourceCoordinates,
    destinationCoordinates,
    distance,
    coordinates,
  } = useSelector((state) => state.location);

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

  // if (!authenticated) return <NotFound />;
  return (
    <div className="w-full bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          <SearchLocation />
          <div className="w-full lg:w-2/3">
            <MapBoxMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
