import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MapMultipleMarkers from "../components/MapMultipleMarkers";
import Property from "../components/Property";
import AuthService from "../services/AuthService";
import PropertyService from "../services/PropertyService";

function HostProperties() {
  const router = new useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  async function getData(userFound) {
    try {
      setLoading(true);
      setData(null);
      let res = await PropertyService.getProperties();
      let dataResponse = res.data;
      const filteredProperties = dataResponse.filter((property) =>
        checkIfPropertyIsOwners(property,userFound)
      );
      setData(filteredProperties);
      console.log(filteredProperties);
      return;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setIsMounted(true);
    }
  }
  function checkIfPropertyIsOwners(property,userFound) {
    if (property.hostUserUuid === userFound.uuid) {
      return property;
    }
    return null;
  }
  useEffect(async () => {
    setIsMounted(true);
  }, []);
  useEffect(async () => {
    if (isMounted == true) {
      try {
        let userFound = await AuthService.getUser();
        setUser(userFound.data);
        getData(userFound.data);
      } catch (e) {
        router.push("/login");
      }
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
        mapComponent =  <MapMultipleMarkers searchResults={data} />
    }


  return (
    <div className="h-screen">
      <Header user={user} />
      {loader}
      <main className="flex">
        <section className="flex-grow pt-14 pl-6">
          <button onClick={() => router.push("/")} className="text-gray-200 mb-4 btn btn-outline btn-sm">Back to homepage</button>
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
        <button onClick={() => router.push("/add-property")} className="text-gray-200 mb-4 mx-auto btn btn-outline btn-sm">Add a property</button>
          {mapComponent}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default HostProperties;
