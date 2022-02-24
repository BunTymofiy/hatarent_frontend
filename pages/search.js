import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Property from "../components/Property";
import PropertyService from "../services/PropertyService";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import AddressHandler from "../helper/AddressHandler";
import MapMultipleMarkers from "../components/MapMultipleMarkers";
import AuthService from "../services/AuthService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["search", "Footer", "Header", "Property"])),
    },
  };
}

function Search() {
  const { t } = useTranslation();
  const hatarent = t("Footer:hatarent");
  const owner_name = t("Footer:owner_name");
  const account_information = t("Header:account_information");
  const become_host = t("Header:become_host");
  const calendar = t("Header:calendar");
  const hatarent_logo = t("Header:hatarent");
  const notifications = t("Header:notifications");
  const propertiesP = t("Header:properties");
  const reservations = t("Header:reservations");
  const sign_in = t("Header:sign_in");
  const sign_out = t("Header:sign_out");
  const transactions = t("Header:transactions");
  const price = t("Property:price");
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numOfGuests, setNumOfGuests] = useState(null);

  async function getData(location, startDate, endDate, numberOfGuests) {
    try {
      const searchAddress = AddressHandler.getSearchAddressQuery(location);
      setLoading(true);
      setData(null);
      // let res = await PropertyService.getProperties();
      let res = await PropertyService.getPropertiesByCityDateAndGuest(
        searchAddress.city,
        startDate,
        endDate,
        numberOfGuests
      ).then((res) => res.data);
      console.log(res);
      // let dataResponse = res.data;
      // const filteredProperties = dataResponse.filter((property) =>
      //   checkIfLocationMach(property, searchAddress, numberOfGuests)
      // );
      // setData(filteredProperties);
      setData(res);
      return;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setIsMounted(true);
    }
  }

  function checkIfLocationMach(property, location, numberOfGuests) {
    if (property.address.city == location.city) {
      if (property.guestLimit >= numberOfGuests) {
        return property;
      }
    }
    return null;
  }
  useEffect(() => {
    if (!router?.isReady) return;
    const { location, startDate, endDate, numberOfGuests } = router.query;
    setStartDate(startDate);
    setEndDate(endDate);
    setNumOfGuests(numberOfGuests);
    const formattedStartDate = format(new Date(startDate), "dd MMMM yyyy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yyyy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;
    router.query;
    getData(location, new Date(startDate), new Date(endDate), numberOfGuests);
  }, [router.isReady]);

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

  let loader = null;
  if (loading) {
    loader = (
      <div className="h-screen ">
        <div className="flex justify-center items-center h-screen">
          <div className="flex items-center justify-center space-x-2 animate-bounce">
            <div className="w-20 h-20 bg-blue-400 rounded-full"></div>
            <div className="w-20 h-20 bg-green-400 rounded-full"></div>
            <div className="w-20 h-20 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }
  let mapComponent = null;
  if (data != null && data.length > 0) {
    mapComponent = <MapMultipleMarkers searchResults={data} />;
  }
  let properties = null;
  if (data != null && data.length > 0) {
    properties = data?.map((propertyFound) => (
      <div
        key={propertyFound.uuid}
        onClick={() => {
          router.push({
            pathname: "/info",
            query: {
              uuid: propertyFound.uuid,
              startDate: startDate,
              endDate: endDate,
              numberOfGuests: numOfGuests,
            },
          });
        }}
      >
        <Property
          key={propertyFound.uuid}
          property={propertyFound}
          price={price}
        />
      </div>
    ));
  }
  let noProperties = null;
  if (data != null && data.length == 0) {
    noProperties = (
      <div className="flex lg:justify-end md:justify-center sm:justify-center text-lg text-gray-300 items-center">
        {t("search:no_properties_found")}
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Header
        user={user}
        account_information={account_information}
        become_host={become_host}
        calendar={calendar}
        notifications={notifications}
        hatarent={hatarent_logo}
        properties={propertiesP}
        reservationsN={reservations}
        sign_in={sign_in}
        sign_out={sign_out}
        transactions={transactions}
      />

      {loader}
      <main className="flex">
        <section className="flex-grow pt-14 pl-6">
          <button
            onClick={() => router.push("/")}
            className="text-gray-200 mb-4 btn btn-outline btn-sm"
          >
            {t("search:back_to_homepage")}
          </button>
          <div className="flex flex-col">
            {noProperties}

            {properties}
          </div>
        </section>
        <section className="hidden pt-14 flex-col  pr-6 lg:inline-flex lg:min-w-[600px]">
          <div className="text-transparent text-lg mb-5">lol</div>
          {mapComponent}
        </section>
      </main>
      <Footer hatarent={hatarent} owner_name={owner_name} />
    </div>
  );
}

export default Search;
