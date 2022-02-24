import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ReservationHost from "../components/ReservationHost";
import AuthService from "../services/AuthService";
import ReservationService from "../services/ReservationService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "host-reservation",
        "Footer",
        "Header",
        "ReservationHost",
      ])),
    },
  };
}

function HostReservations() {
  const { t } = useTranslation();
  const hatarent = t("Footer:hatarent");
  const owner_name = t("Footer:owner_name");
  const account_information = t("Header:account_information");
  const become_host = t("Header:become_host");
  const calendar = t("Header:calendar");
  const hatarent_logo = t("Header:hatarent");
  const notifications = t("Header:notifications");
  const properties = t("Header:properties");
  const reservationsP = t("Header:reservations");
  const sign_in = t("Header:sign_in");
  const sign_out = t("Header:sign_out");
  const transactions = t("Header:transactions");
  const accept = t("ReservationHost:accept");
  const decline = t("ReservationHost:decline");
  const paid = t("ReservationHost:paid");
  const check_in_date = t("ReservationHost:check_in_date");
  const check_out_date = t("ReservationHost:check_out_date");
  const declined = t("ReservationHost:declined");
  const accepted = t("ReservationHost:accepted");
  const price = t("ReservationHost:price");
  const router = new useRouter();
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [pathname, setPathname] = useState(null);

  async function getData(userFound) {
    try {
      setLoading(true);
      let res = await ReservationService.getReservationsByHost(userFound.uuid);
      let dataResponse = await res.data;
      // const filteredProperties = dataResponse.filter((reservation) =>
      //   checkIfReservationIsOwners(reservation, userFound)
      // );
      setReservations(dataResponse);
    } catch (e) {
      console.log(e);
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
        let roles = [];
        for (let i = 0; i < userFound.data.roles.length; i++) {
          roles.push(userFound.data.roles[i].name);
        }
        if (roles.indexOf("ROLE_GUEST") > -1) {
          router.push("/guest-reservations");
        }
        setUser(userFound.data);
        getData(userFound.data);
      } catch (e) {
        router.push("/login");
      }
    }
  }, [isMounted]);
  useEffect(() => {
    if (!router?.isReady) return;
    setPathname(router.pathname);
  }, [router.isReady]);

  let loader = null;
  if (loading) {
    loader = (
      <div className="h-screen">
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
  let reservationsList = null;
  if (reservations.length > 0) {
    reservationsList = reservations?.map((reservation) => (
      <div
        onClick={() =>
          router.push({
            pathname: "/show-reservation",
            query: { id: reservation.reservationId },
          })
        }
        key={reservation.reservationId}
        className="flex flex-col space-y-2"
      >
        <ReservationHost
          pathname={pathname}
          reservation={reservation}
          accept={accept}
          decline={decline}
          paid={paid}
          check_in_date={check_in_date}
          check_out_date={check_out_date}
          declined={declined}
          accepted={accepted}
          price={price}
        />
      </div>
    ));
  }
  let noReservations = null;
  if (reservations.length == 0) {
    noReservations = (
      <div className="flex justify-center text-xl  text-gray-300 items-center">
        {t("host-reservations:no_reservations")}
      </div>
    );
  }

  return (
    <div className="h-screen">
      {loader}
      <Header
        user={user}
        account_information={account_information}
        become_host={become_host}
        calendar={calendar}
        notifications={notifications}
        hatarent={hatarent_logo}
        properties={properties}
        reservationsN={reservationsP}
        sign_in={sign_in}
        sign_out={sign_out}
        transactions={transactions}
      />

      <main>
        <div className="flex justify-center align-middle">
          <h1 className="text-3xl text-gray-300">
            {t("host-reservation:your_reservations")}
          </h1>
        </div>
        <div className=" flex">
          <section className="flex-grow pt-14 pl-6 pr-6">
            <button
              onClick={() => router.push("/")}
              className="text-gray-200 mb-4 btn btn-outline btn-sm"
            >
              {t("host-reservation:back_to_homepage")}
            </button>

            {reservationsList}
          </section>
        </div>
        {noReservations}
      </main>
      <Footer hatarent={hatarent} owner_name={owner_name} />
    </div>
  );
}

export default HostReservations;
