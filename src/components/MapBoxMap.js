// src/components/MapBox.js
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { setDistance } from "../redux/locationSlice";

function MapBoxMap() {
  const dispatch = useDispatch();
  const { coordinates, sourceCoordinates, destinationCoordinates } =
    useSelector((state) => state.location);

  const mapRef = useRef();
  const [duration, setDuration] = useState(0);
  const [path, setPath] = useState([]);

  const pathfinder = async (slon, slat, dlon, dlat) => {
    const res = await fetch(
      `http://localhost:8000/getPath/?slon=${slon}&slat=${slat}&dlon=${dlon}&dlat=${dlat}`
    );
    const result = await res.json();
    dispatch(setDistance(result.distance));
    setDuration(result.duration);
    setPath(result.coordinates);
  };

  useEffect(() => {
    if (sourceCoordinates && mapRef.current && destinationCoordinates) {
      pathfinder(
        sourceCoordinates.longitude,
        sourceCoordinates.latitude,
        destinationCoordinates.longitude,
        destinationCoordinates.latitude
      );
      mapRef.current.flyTo({
        center: [sourceCoordinates.longitude, sourceCoordinates.latitude],
        duration: 2500,
      });
      setTimeout(() => {
        mapRef.current.flyTo({
          center: [
            destinationCoordinates.longitude,
            destinationCoordinates.latitude,
          ],
          duration: 2500,
        });
      }, 3000);
    }
  }, [sourceCoordinates, destinationCoordinates]);

  if (coordinates.lat === 0 && coordinates.lon === 0) return null;

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: coordinates.lon,
        latitude: coordinates.lat,
        zoom: 14,
      }}
      style={{
        width: "100%",
        height: "85vh",
        objectFit: "cover",
        borderRadius: "10px",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {sourceCoordinates && destinationCoordinates && (
        <>
          <Marker
            longitude={parseFloat(sourceCoordinates.longitude)}
            latitude={parseFloat(sourceCoordinates.latitude)}
            anchor="bottom"
          >
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              fill="none"
              data-testid="pickup-icon"
              data-movable-handle="true"
            >
              <title>Radio button selected</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                fill="currentColor"
              ></path>
            </svg>
          </Marker>
          <Marker
            longitude={parseFloat(destinationCoordinates.longitude)}
            latitude={parseFloat(destinationCoordinates.latitude)}
            anchor="bottom"
          >
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              fill="none"
              data-testid="drop-icon"
            >
              <title>Dropoff</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 2H2v20h20V2Zm-7 7H9v6h6V9Z"
                fill="currentColor"
              ></path>
            </svg>
          </Marker>
          {path.length === 0 ? (
            <></>
          ) : (
            <Source
              type="geojson"
              data={{
                type: "Feature",
                geometry: { type: "LineString", coordinates: path },
              }}
            >
              <Layer
                type="line"
                layout={{ "line-join": "round", "linee-cap": "circle" }}
                paint={{ "line-color": "#000000", "line-width": 4 }}
              />
            </Source>
          )}
        </>
      )}
    </Map>
  );
}

export default MapBoxMap;
