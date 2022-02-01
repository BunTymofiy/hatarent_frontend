import { useCallback, useEffect, useRef, useState } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import AddressHandler from "../helper/AddressHandler";

function MapWithSearch(props) {
  const [address, setAddress] = useState(null);
  const [addressRaw, setAddressRaw] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );
  useEffect(() => {
    if (props.mapValue === null || props.mapValue === undefined) return;
    // console.log(props.mapValue)
    setAddress(props.mapValue);
    setAddressRaw(AddressHandler.getAddressString(props.mapValue));
  });
  const getSelectedResult = useCallback(
    (event) => props.parentCallback(event.result),
    []
  );
  return (
    <div style={{ height: "100vh" }} className="rounded-xl">
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="33.33%"
        mapStyle={"mapbox://styles/timaboon/ckxlj75b63bcq15rj973a4ac3"}
        mapboxApiAccessToken={process.env.mapbox_key}
        onViewportChange={handleViewportChange}
        className="rounded-3xl"
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={handleGeocoderViewportChange}
          onResult={getSelectedResult}
          mapboxApiAccessToken={process.env.mapbox_key}
          position="top-left"
          inputValue={addressRaw}
          className="input"
        />
      </MapGL>
    </div>
  );
}

export default MapWithSearch;
