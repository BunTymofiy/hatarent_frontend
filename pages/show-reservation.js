import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthService from "../services/AuthService";
import ReservationService from "../services/ReservationService";

function ShowReservation() {
  const router = new useRouter();
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState(null);
  const [guest, setGuest] = useState(null);

  async function getData() {
    try {
      setData(null);

      let res = await ReservationService.getByUuidReservation(
        router.query.id
      ).then((res) => res.data);
      setData(res);
      let guest = await AuthService.getUserByUuid(res.user).then(
        (res) => res.data
      );
      setGuest(guest);
      console.log(guest);
    } catch (e) {
      console.log(e);
    } finally {
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
      } catch (e) {
        router.push("/login");
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (!router?.isReady) return;
    getData();
  }, [router.isReady]);
  const acceptReservation = async () => {
    try {
      const acceptedReservation = await ReservationService.acceptReservation(
        reservation.reservationId
      );
      router.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const declineReservation = async () => {
    try {
      let declineReservation = await ReservationService.declineReservation(
        reservation.reservationId
      );
      router.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const buttons = () => {
    if (data.status === "pending") {
      return (
        <div>
          <button
            onClick={acceptReservation}
            className="btn btn-accent capitalize text-gray-300  shadow-xl"
          >
            Accept
          </button>
          <button
            onClick={declineReservation}
            className="btn btn-secondary capitalize ml-3 text-gray-300  shadow-xl"
          >
            Decline
          </button>
        </div>
      );
    } else if (data.status === "accepted") {
      return (
        <button className="btn btn-accent btn-disabled capitalize">
          {data.status}
        </button>
      );
    } else if (data.status === "declined") {
      return (
        <button className="btn btn-secondary btn-disabled btn-error capitalize">
          {data.status}
        </button>
      );
    } else if (data.status === "paid") {
      return (
        <button className="btn btn-accent btn-disabled  capitalize">
          {data.status}
        </button>
      );
    }
  };
  return (
    <div className="h-screen">
      <Header user={user} />
      <main>
        <div className="card w-96 card-compact mx-auto shadow-xl">
          {data && (
            <div>
              <figure>
                <img src={data.property.images[0]} />
              </figure>
              <div className="card-body glass mx-auto w-96 text-gray-200">
                <h5 className="card-title">Reservation</h5>

                <p className="card-text mb-2">
                  <span className="font-bold">Check In Date:</span>{" "}
                  {format(new Date(data.checkInDate), "dd MMMM yyyy")}
                </p>
                <p className="card-text mb-2">
                  <span className="font-bold">Check Out Date:</span>{" "}
                  {format(new Date(data.checkOutDate), "dd MMMM yyyy")}
                </p>

                <p className="card-text mb-2">
                  <span className="font-bold">Number of Guests:</span>{" "}
                  {data.property.guestLimit}
                </p>
                {guest && (
                  <p className="mb-2">
                    <span className="font-bold">Reserved by:</span>{" "}
                    {guest.firstName} {guest.lastName} <br />
                    <span className="font-bold">Email:</span> {guest.email}
                  </p>
                )}

                <p
                  className="card-text cursor-pointer hover:text-gray-400 hover:underline"
                  onClick={() => {
                    router.push({
                      pathname: "/info",
                      query: {
                        uuid: data.property.uuid,
                      },
                    });
                  }}
                >
                  <span className="font-bold">Property:</span>{" "}
                  {data.property.title}
                </p>
                <div className="card-text">
                  <p className="text-xl mt-3">
                    <span className="font-bold ">Total price:</span>{" "}
                    {data.totalPrice}$
                  </p>
                </div>
                <div className="flex justify-end">{buttons()}</div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ShowReservation;
