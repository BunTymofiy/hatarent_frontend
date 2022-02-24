import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MapMultipleMarkers from "../components/MapMultipleMarkers";
import Property from "../components/Property";
import AuthService from "../services/AuthService";
import PropertyService from "../services/PropertyService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["host-properties", "Header", "Footer", "Property"])),
    },
  };
}
function HostProperties() {
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
  const price = t("Property:price");
  const router = new useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  async function getData(userFound) {
    try {
      setLoading(true);
      setData(null);
      let res = await PropertyService.getPropertiesByHost(userFound.uuid);
      let dataResponse = res.data;
      setData(dataResponse);
      return;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setIsMounted(true);
    }
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
    mapComponent = <MapMultipleMarkers searchResults={data} />;
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
        properties={properties}
        reservationsN={reservations}
        sign_in={sign_in}
        sign_out={sign_out}
        transactions={transactions}
      />

      {loader}
      <main className="flex ">
        <section className="flex-grow overflow-auto pt-14 pl-6">
          <button
            onClick={() => router.push("/")}
            className="text-gray-200 mb-4 btn btn-outline btn-sm"
          >
            {t("host-properties:back_to_homepage")}
          </button>
          <div className="flex flex-col overflow-auto">
            {data?.map((propertyFound) => (
              <div
                className=""
                key={propertyFound.uuid}
                onClick={() => {
                  router.push({
                    pathname: "/info",
                    query: { uuid: propertyFound.uuid },
                  });
                }}
              >
                <Property key={propertyFound.uuid} price={price} property={propertyFound} />
              </div>
            ))}
          </div>
        </section>
        <section className="hidden pt-14 flex-col  pr-6 lg:inline-flex lg:min-w-[600px]">
          <button
            onClick={() => router.push("/add-property")}
            className="text-gray-200 mb-4 mx-auto btn btn-outline btn-sm"
          >
            {t("host-properties:add_a_property")}
          </button>
          {mapComponent}
        </section>
      </main>
      <Footer hatarent={hatarent} owner_name={owner_name} />
    </div>
  );
}

export default HostProperties;
