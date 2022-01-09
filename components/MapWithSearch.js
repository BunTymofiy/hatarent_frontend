import { useCallback, useRef, useState } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

function MapWithSearch(props) {
  const [viewport, setViewport] = useState({
    width: "50vw",
    height: "50vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
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
  const handleResult = (event) => {
    props.parentCallback(event.result);
    // console.log(event.result.place_name);
  };
  return (
    <div style={{ height: "100vh" }} className="rounded-xl">
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={"mapbox://styles/timaboon/ckxlj75b63bcq15rj973a4ac3"}
        mapboxApiAccessToken={process.env.mapbox_key}
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.mapbox_key}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          onResult={handleResult}
          mapboxApiAccessToken={process.env.mapbox_key}
          position="top-left"
        />
      </MapGL>
      {/* <MapGL
    mapStyle={"mapbox://styles/timaboon/ckxlj75b63bcq15rj973a4ac3"}
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    ></MapGL> */}
    </div>
  );
}

export default MapWithSearch;
