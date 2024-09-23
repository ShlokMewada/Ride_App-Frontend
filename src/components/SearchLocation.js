import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestinationMapboxId,
  setPlot,
  setSourceMapboxId,
} from "../redux/locationSlice";

function SearchLocation() {
  const [sourceSelected, setSourceSelected] = useState(false);
  const [source, setSource] = useState("");
  const [sourceAddressList, setSourceAddressList] = useState([]);
  const [sourceSuggest, setSourceSuggest] = useState(false);
  const [destinationSelected, setDestinationSelected] = useState(false);
  const [destination, setDestination] = useState("");
  const [destinationAddressList, setDestinationAddressList] = useState([]);
  const [destinationSuggest, setDestinationSuggest] = useState(false);
  const [sourceFocus, setSourceFocus] = useState(false);
  const [destinationFocus, setDestinationFocus] = useState(false);

  const [sourceItem, setSourceItem] = useState(null);
  const [destinationItem, setDestinationItem] = useState(null);

  const dispatch = useDispatch();

  const { lon, lat } = useSelector((store) => store.location.coordinates);
  console.log("lon", lon, "lat", lat);

  const getSourceAddressList = async () => {
    if (source == "") {
      setSourceSuggest(false);
    } else if (sourceSuggest) {
      const res = await fetch(
        `http://localhost:8000/getSearchResults/?q=${source}&lat=${lat}&lon=${lon}`
      );
      const result = await res.json();
      setSourceAddressList(result);
    }
  };

  const getDestinationAddressList = async () => {
    if (destination == "") {
      setDestinationSuggest(false);
    } else if (destinationSuggest) {
      const res = await fetch(
        `http://localhost:8000/getSearchResults/?q=${destination}&lat=${lat}&lon=${lon}`
      );
      const result = await res.json();
      setDestinationAddressList(result);
    }
  };

  useEffect(() => {
    const delayedBounceFunction = setTimeout(
      () => getSourceAddressList(),
      1000
    );
    return () => clearTimeout(delayedBounceFunction);
  }, [source]);

  useEffect(() => {
    const delayedBounceFunction = setTimeout(
      () => getDestinationAddressList(),
      1000
    );
    return () => clearTimeout(delayedBounceFunction);
  }, [destination]);

  return (
    <div className="flex flex-col gap-4 w-[24rem] h-[16rem] border-solid border-gray-200 border-2 px-4 py-4 rounded-xl">
      <h1 className="text-2xl font-bold">Get a ride</h1>

      <div className={destinationSuggest ? "" : "focus:relative"}>
        <div
          className={`${
            sourceFocus
              ? "bg-transparent border-2 border-solid border-black"
              : "bg-[#F3F3F3]"
          } h-[3rem] w-[22rem] grid grid-cols-12 grid-rows-1 py-2 px-4 rounded-md`}
        >
          <svg
            className="col-span-1 flex justify-center items-center h-full"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            data-testid="pickup-icon"
            data-movable-handle="true"
          >
            <title>Radio button selected</title>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              fill="currentColor"
            ></path>
          </svg>
          <input
            className="col-span-11 outline-none bg-transparent"
            type="text"
            value={source}
            placeholder="Enter the Source"
            onChange={(e) => {
              setSource(e.target.value);
              setSourceSuggest(true);
              setSourceItem(null);
            }}
            onFocus={() => setSourceFocus(true)}
            onBlur={() => {
              sourceSelected
                ? setSourceSelected(false)
                : setSourceSuggest(false);
              setSourceFocus(false);
            }}
          />
        </div>
        {sourceSuggest ? (
          sourceAddressList.suggestions ? (
            <div
              className="rounded-tr-md cursor-pointer"
              onMouseOver={() => setSourceSelected(true)}
              onMouseOut={() => setSourceSelected(false)}
            >
              <div className="bg-white shadow-gray-300 shadow-xl block absolute w-[22rem] max-h-80 overflow-y-scroll rounded-md">
                {sourceAddressList.suggestions.map((item, index) => (
                  <div
                    onClick={() => {
                      setSource(item.name + ", " + item.full_address);
                      setSourceSuggest(false);
                      setSourceItem(item);
                      console.log("src", item.mapbox_id);
                    }}
                  >
                    <div
                      id={index}
                      className="grid grid-cols-12 grid-rows-1 py-2 pr-4"
                    >
                      <div className="flex items-center justify-center col-span-2">
                        <div className="p-2 w-[2rem] h-[2rem] bg-[#F3F3F3] rounded-full">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <title>Location marker</title>
                            <path
                              d="M18.7 3.8C15 .1 9 .1 5.3 3.8c-3.7 3.7-3.7 9.8 0 13.5L12 24l6.7-6.8c3.7-3.6 3.7-9.7 0-13.4ZM12 12.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="col-span-10 flex flex-col">
                        <h2 className="font-semibold text-sm">{item.name}</h2>
                        <p className="text-sm">{item.full_address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        ) : null}
      </div>
      <div className={sourceSuggest ? "" : "focus:relative"}>
        <div
          className={`${
            destinationFocus
              ? "bg-transparent border-2 border-solid border-black"
              : "bg-[#F3F3F3]"
          } h-[3rem] w-[22rem] grid grid-cols-12 grid-rows-1 py-2 px-4 rounded-md`}
        >
          <svg
            className="col-span-1 flex justify-center items-center h-full"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            data-testid="drop-icon"
          >
            <title>Dropoff</title>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22 2H2v20h20V2Zm-7 7H9v6h6V9Z"
              fill="currentColor"
            ></path>
          </svg>
          <input
            className="col-span-11 outline-none bg-transparent"
            type="text"
            value={destination}
            placeholder="Enter the Destination"
            onChange={(e) => {
              setDestination(e.target.value);
              setDestinationSuggest(true);
              setDestinationItem(null);
            }}
            onFocus={() => setDestinationFocus(true)}
            onBlur={() => {
              destinationSelected
                ? setDestinationSelected(false)
                : setDestinationSuggest(false);
              setDestinationFocus(false);
            }}
          />
        </div>
        {destinationSuggest ? (
          destinationAddressList.suggestions ? (
            <div
              className="rounded-tr-md cursor-pointer"
              onMouseOver={() => setDestinationSelected(true)}
              onMouseOut={() => setDestinationSelected(false)}
            >
              <div className="bg-white shadow-gray-300 shadow-xl block absolute w-[22rem] max-h-80 overflow-y-scroll rounded-md">
                {destinationAddressList.suggestions.map((item, index) => (
                  <div
                    onClick={() => {
                      setDestination(item.name + ", " + item.full_address);
                      setDestinationSuggest(false);
                      setDestinationItem(item);
                      console.log("dest", item.mapbox_id);
                    }}
                  >
                    <div
                      id={index}
                      className="grid grid-cols-12 grid-rows-1 py-2 pr-4"
                    >
                      <div className="flex items-center justify-center col-span-2">
                        <div className="p-2 w-[2rem] h-[2rem] bg-[#F3F3F3] rounded-full">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <title>Location marker</title>
                            <path
                              d="M18.7 3.8C15 .1 9 .1 5.3 3.8c-3.7 3.7-3.7 9.8 0 13.5L12 24l6.7-6.8c3.7-3.6 3.7-9.7 0-13.4ZM12 12.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="col-span-10 flex flex-col">
                        <h2 className="font-semibold text-sm">{item.name}</h2>
                        <p className="text-sm">{item.full_address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        ) : null}
      </div>
      <button
        className={`${
          sourceItem == null || destinationItem == null
            ? "bg-[#000000A0]"
            : "bg-black"
        } w-[22rem] text-white py-2 rounded-md ${
          sourceItem != null && destinationItem != null
            ? ""
            : "cursor-not-allowed"
        }`}
        disabled={sourceItem == null || destinationItem == null}
        onClick={() => {
          dispatch(setDestinationMapboxId(destinationItem.mapbox_id));
          dispatch(setSourceMapboxId(sourceItem.mapbox_id));
          dispatch(setPlot(true));
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchLocation;
