import { addDays, differenceInCalendarDays, format, isBefore, isEqual } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AddressHandler from "../helper/AddressHandler";
import AuthService from "../services/AuthService";
import NightsService from "../services/NightsService";
import PropertyService from "../services/PropertyService";
import ReservationService from "../services/ReservationService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home","Footer", "Header", "reservationP"])),
    },
  };
}
function Reservation() {
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
  const router = new useRouter();
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numOfGuests, setNumOfGuests] = useState(null);
  const [uuid, setUuid] = useState(null);
  const [title, setTitle] = useState([""]);
  const [guestLimit, setGuestLimit] = useState([""]);
  const [description, setDescription] = useState([""]);
  const [contact_person, setContact_person] = useState([""]);
  const [hostUserUuid, setHostUserUuid] = useState([""]);
  const [email, setEmail] = useState([""]);
  const [address, setAddress] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(null);
  const [numOfDays, setNumOfDays] = useState(null);
  const [clicked, setClicked] = useState(false);

  async function getData() {
    try {
      setLoading(true);
      let res = await PropertyService.getByUuidProperty(router.query.uuid);
      let dataResponse = await res.data;
      setUuid(dataResponse.uuid);
      setTitle(dataResponse.title);
      setGuestLimit(dataResponse.guestLimit);
      setDescription(dataResponse.description);
      setContact_person(dataResponse.contact_person);
      setEmail(dataResponse.email);
      setHostUserUuid(dataResponse.hostUserUuid);
      setImages(dataResponse.images);
      setAddress(dataResponse.address);
      setPrice(dataResponse.price);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setIsMounted(true);
    }
  }
  const createReservationHandler = async () => {
    if(clicked === true) return;
    setClicked(true);
    document.getElementById("reserveButton").classList.add("disabled");
    try {
      let reservation = {
        property: {
          uuid: uuid,
          hostUserUuid: hostUserUuid,
          title: title,
          address:address,
          guestLimit: guestLimit,
          description: description,
          contact_person: contact_person,
          email: email,
          images: images,
          price: price,
        },
        user: user.uuid,
        checkInDate: new Date(startDate),
        checkOutDate: new Date(endDate),
        numberGuests: numOfGuests,
        totalPrice: Math.round(price * numOfDays),
        status: "pending",
      };
      await ReservationService.createReservation(reservation);
        router.push('/guest-reservations');
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(async () => {
    setIsMounted(true);
  }, []);
  useEffect(async () => {
    if (isMounted == true) {
      try {
        let userFound = await AuthService.getUser();
        setUser(userFound.data);
        if (userFound.data != null) {
          let roles = [];
          for (let i = 0; i < userFound.data.roles.length; i++) {
            roles.push(userFound.data.roles[i].name);
          }

          if (roles.indexOf("ROLE_HOST") > -1) {
            router.back();
          }
        }
      } catch (e) {
        router.push("/login");
      }
    }
  }, [isMounted]);
  useEffect(() => {
    if (!router?.isReady) return;
    getData();
    const { startDate, endDate, numberOfGuests } = router.query;
    setStartDate(format(new Date(startDate), "dd MMMM yyyy"));
    setEndDate(format(new Date(endDate), "dd MMMM yyyy"));
    setNumOfGuests(numberOfGuests);
    const formattedStartDate = format(new Date(startDate), "dd MMMM yyyy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yyyy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;
    setNumOfDays(
      differenceInCalendarDays(new Date(endDate), new Date(startDate))
    );
    router.query;
  }, [router.isReady]);
  return (
    <div className="h-screen">
            <Header user={user} account_information={account_information} become_host={become_host} calendar={calendar} notifications={notifications} hatarent={hatarent_logo} properties={properties} reservationsN={reservations} sign_in={sign_in} sign_out={sign_out} transactions={transactions} />

      <main>
        <div className="card">
          <div className="card-body card glass mx-auto w-96 text-gray-300">
            <h5 className="card-title">{t('reservationP:reservation')}</h5>
            <p className="card-text">
              <span className="font-bold">{t('reservationP:start_date')}:</span> {startDate}
            </p>
            <p className="card-text">
              <span className="font-bold">{t('reservationP:end_date')}:</span> {endDate}
            </p>
            <p className="card-text">
              <span className="font-bold">{t('reservationP:total_amount_of_days')}:</span>{" "}
              {numOfDays}
            </p>
            <p className="card-text">
              <span className="font-bold">{t('reservationP:number_of_guests')}:</span> {numOfGuests}
            </p>
            <p className="card-text">
              <span className="font-bold">{t('reservationP:property')}:</span> {title}
            </p>
            <p className="card-text">
              <span className="font-bold">{t('reservationP:price')}:</span> {price}
            </p>
            <p className="card-text">
              <span className="font-bold">{t('reservationP:contact_person')}:</span>{" "}
              {contact_person}
            </p>
            <p className="card-text">
              <span className="font-bold">{t('reservationP:email')}:</span> {email}
            </p>
            <div className="card-text">
              <p className="text-xl">
                <span className="font-bold">{t('reservationP:total_price')}:</span>{" "}
                {Math.round(price * numOfDays)}$
              </p>
            </div>
            <button id="reserveButton" className="btn mt-5" onClick={createReservationHandler}>
            {t('reservationP:make_reservation')}
            </button>
          </div>
        </div>
      </main>
      <Footer hatarent={hatarent} owner_name={owner_name}/>

    </div>
  );
}

export default Reservation;
