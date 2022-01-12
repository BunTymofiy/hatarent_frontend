import { useCallback, useRef, useState } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

function MapWithSearch(props) {
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
  const getSelectedResult = useCallback((event) => 
    props.parentCallback(event.result), []);
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
        mapboxApiAccessToken={process.env.mapbox_key}
        className="rounded-3xl"
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={handleGeocoderViewportChange}
          onResult={getSelectedResult}
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
