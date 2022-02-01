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

function Search() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  async function getData(location, numberOfGuests) {
    try {
      const searchAddress = AddressHandler.getSearchAddressQuery(location);
      setLoading(true);
      setData(null);
      let res = await PropertyService.getProperties();
      let dataResponse = res.data;
      const filteredProperties = dataResponse.filter((property) =>
        checkIfLocationMach(property, searchAddress, numberOfGuests)
      );
      setData(filteredProperties);
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
    const formattedStartDate = format(new Date(startDate), "dd MMMM yyyy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yyyy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;
    router.query;
    getData(location, numberOfGuests);
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

  return (
    <div className="h-screen">
      <Header user={user} />
      {loader}
      <main className="flex">
        <section className="flex-grow pt-14 pl-6">
          <button onClick={() => router.push("/")} className="text-gray-300">Back to homepage</button>
          <div className="flex flex-col">
            {data?.map((propertyFound) => (
              <div
                key={propertyFound.uuid}
                onClick={() => {
                  router.push({
                    pathname: "/info",
                    query: { uuid: propertyFound.uuid },
                  });
                }}
              >
                <Property key={propertyFound.uuid} property={propertyFound} />
              </div>
            ))}
          </div>
        </section>
        <section className="hidden pt-14 flex-col  pr-6 lg:inline-flex lg:min-w-[600px]">
          <div className="text-transparent">lol</div>
          {data && <MapMultipleMarkers searchResults={data} />}
        </section>
      </main>
      <Footer className="" />
    </div>
  );
}

export default Search;
