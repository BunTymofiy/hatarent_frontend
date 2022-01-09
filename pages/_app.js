import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-[url(../public/images/rodina.jpg)] bg-no-repeat bg-cover">
      
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
    
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
