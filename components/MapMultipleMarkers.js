import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import {v4 as uuidv4} from 'uuid';

function MapMultipleMarkers({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const coordinates = searchResults.map((searchResult) => ({
    longitude: parseFloat(searchResult.address.longitude),
    latitude: parseFloat(searchResult.address.latitude),
  }));
  const center = getCenter(coordinates);
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  return (
    <ReactMapGL
      mapStyle={"mapbox://styles/timaboon/ckxlj75b63bcq15rj973a4ac3"}
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewPort) => setViewPort(nextViewPort)}
      className="border-t border-b"
    >
      {searchResults.map((result) => (
        <div key={uuidv4()}>
          <Marker
            longitude={parseFloat(result.address.longitude)}
            latitude={parseFloat(result.address.latitude)}
            // offsetLeft={-20}
            // offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer animate-bounce"
              aria-label="push-pin"
            >
              📍
            </p>
          </Marker>
          {parseFloat(selectedLocation.longitude) === parseFloat(result.address.longitude) ? (
            <Popup  
            closeOnClick={true} 
            onClose={() => setSelectedLocation({})}
            latitude={parseFloat(result.address.latitude)}
            longitude={parseFloat(result.address.longitude)}>
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default MapMultipleMarkers;
