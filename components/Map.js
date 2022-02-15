import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

function Map({ longitude, latitude }) {
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "33.33%",
    latitude: parseFloat(latitude),
    longitude:  parseFloat(longitude),
    zoom: 9,
  });
  return (
    <div style={{ height: "50vh" }} className="rounded-xl">
      <ReactMapGL
        mapStyle={"mapbox://styles/timaboon/ckxlj75b63bcq15rj973a4ac3"}
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewPort) => setViewPort(nextViewPort)}
        className="rounded-3xl"
      >
        <Marker longitude={parseFloat(longitude)} latitude={parseFloat(latitude)}>
          <p className="cursor-pointer animate-bounce" aria-label="push-pin">
            📍
          </p>
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default Map;
