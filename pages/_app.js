import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
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

export default appWithTranslation(MyApp);
