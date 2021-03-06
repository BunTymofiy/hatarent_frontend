import { SearchIcon, UsersIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthService from "../services/AuthService";
import MapGL, { Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import AddressHandler from "../helper/AddressHandler";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home","Footer", "Header"])),
    },
  };
}

export default function Home({ locale }) {
  const { t } = useTranslation();
  const hatarent = t("Footer:hatarent");
  const owner_name = t("Footer:owner_name");
  const account_information = t("Header:account_information");
  const become_host = t("Header:become_host");
  const calendar = t("Header:calendar");
  const hatarent_logo = t("Header:hatarent");
  const notifications = t("Header:notifications");
  const properties = t("Header:properties");
  const reservations = t("Header:reservations");
  const sign_in = t("Header:sign_in");
  const sign_out = t("Header:sign_out");
  const transactions = t("Header:transactions");
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

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

  const getSelectedResult = useCallback(
    (event) =>
      setSearchInput(
        AddressHandler.getSearchAddressString(
          AddressHandler.getSearchAddress(event.result)
        )
      ),
    []
  );
  const getSearchInp = useCallback((event) => setSearchInput(event.query), []);

  useEffect(async () => {
    setIsMounted(true);
  }, []);
  useEffect(async () => {
    if (isMounted == true) {
      try {
        let userFound = await AuthService.getUser();
        setUser(userFound.data);
      } catch (e) {}
    }
  }, [isMounted]);

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const resetInput = () => {
    setSearchInput("");
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests: numberOfGuests,
      },
    });
  };

  return (
    <div>
      <Header user={user} account_information={account_information} become_host={become_host} calendar={calendar} notifications={notifications} hatarent={hatarent_logo} properties={properties} reservationsN={reservations} sign_in={sign_in} sign_out={sign_out} transactions={transactions} />
      <main className="h-screen card">
        <div className="flex flex-col items-center  ">
          <div>
            <div className="">
              <h1 className="text-6xl text-gray-300 mb-3 font-serif">
                {t("home:welcome")}{" "}
                <span className="font-sans font-semibold">{t("home:hatarent")}</span>
              </h1>
            </div>
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm ">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-5 bg-transparent outline-none flex-grow text-sm text-white"
                type="text"
                placeholder={t("home:startYourSearch")}
              />
              <SearchIcon className="h-8 hidden md:inline-flex bg-gray-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
            </div>
            {searchInput && (
              <div>
                <div className=" col-span-4 mx-auto rounded-t-md bg-white p-5 ">
                  <section>
                    <div className="relative border-gray-300 border-2 shadow-sm">
                      <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#686FB7"]}
                        onChange={handleSelect}
                        className=""
                      />
                    </div>

                    <div className="flex items-center border-b mb-4">
                      <h2 className="text-2xl flex-grow font-semibold">
                      {t("home:numberOfGuests")}
                      </h2>
                      <UsersIcon className="h-5" />
                      <input
                        min={1}
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(e.target.value)}
                        type="number"
                        className="w-12 pl-2 text-lg outline-none text-blue-600"
                      />
                    </div>

                    <div className="flex m-2">
                      <button
                        onClick={resetInput}
                        className="flex-grow p-2 btn mr-1 bg-sky-600 text-gray-500"
                      >
                         {t("home:cancel")}
                      </button>
                      <button
                        onClick={search}
                        className="flex-grow p-2 btn text-blue-600"
                      >
                         {t("home:search")}
                      </button>
                    </div>
                  </section>
                  <section className="mb-3">
                    <div style={{ height: "100vh" }} className="rounded-t-xl ">
                      <MapGL
                        ref={mapRef}
                        {...viewport}
                        width="100%"
                        height="33.33%"
                        mapStyle={
                          "mapbox://styles/timaboon/ckxlj75b63bcq15rj973a4ac3"
                        }
                        mapboxApiAccessToken={process.env.mapbox_key}
                        onViewportChange={handleViewportChange}
                        className="rounded-b-3xl"
                      >
                        <Geocoder
                          mapRef={mapRef}
                          containerRef={geocoderContainerRef}
                          onViewportChange={handleGeocoderViewportChange}
                          onResult={getSelectedResult}
                          mapboxApiAccessToken={process.env.mapbox_key}
                          position="top-left"
                          inputValue={searchInput}
                          onLoading={getSearchInp}
                          className="input"
                        />
                      </MapGL>
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer hatarent={hatarent} owner_name={owner_name}/>
    </div>
  );
}
