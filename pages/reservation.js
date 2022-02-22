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

function Reservation() {
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
      <Header user={user} />
      <main>
        <div className="card">
          <div className="card-body card glass mx-auto w-96 text-gray-300">
            <h5 className="card-title">Reservation</h5>
            <p className="card-text">
              <span className="font-bold">Start Date:</span> {startDate}
            </p>
            <p className="card-text">
              <span className="font-bold">End Date:</span> {endDate}
            </p>
            <p className="card-text">
              <span className="font-bold">Total amount of days:</span>{" "}
              {numOfDays}
            </p>
            <p className="card-text">
              <span className="font-bold">Number of Guests:</span> {numOfGuests}
            </p>
            <p className="card-text">
              <span className="font-bold">Property:</span> {title}
            </p>
            <p className="card-text">
              <span className="font-bold">Price:</span> {price}
            </p>
            <p className="card-text">
              <span className="font-bold">Contact Person:</span>{" "}
              {contact_person}
            </p>
            <p className="card-text">
              <span className="font-bold">Email:</span> {email}
            </p>
            <div className="card-text">
              <p className="text-xl">
                <span className="font-bold">Total price:</span>{" "}
                {Math.round(price * numOfDays)}$
              </p>
            </div>
            <button className="btn mt-5" onClick={createReservationHandler}>
              Make Reservation
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Reservation;
