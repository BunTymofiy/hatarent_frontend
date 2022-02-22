import { format, isWithinInterval } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import NightsService from "../services/NightsService";
import ReservationService from "../services/ReservationService";

function Reservation(props) {
  const reservation = props.reservation;
  const property = reservation.property;
  const router = new useRouter();
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
    if (reservation.status === "pending") {
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
    } else if (reservation.status === "accepted") {
      return (
        <button className="btn btn-accent btn-disabled capitalize">
          {reservation.status}
        </button>
      );
    } else if (reservation.status === "declined") {
      return (
        <button className="btn btn-secondary btn-disabled btn-error capitalize">
          {reservation.status}
        </button>
      );
    }
    else if (reservation.status === "paid") {
      return (
        <button className="btn btn-accent btn-disabled  capitalize">
          {reservation.status}
        </button>
      );
    }
  };
  return (
    <div className=" flex  py-7 px-2 pr-4 border-b first:border-t hover:opacity-80 hover:shadow-lg transition duration-200 ease-out  bg-gradient-to-t from-purple-800 to-blue-900 p-3 ">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex flex-shrink-0">
        {property.images.map((image) => (
          <Image
            src={image}
            key={Math.random()}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
            priority={true}
          />
        ))}
      </div>
      <div className="flex flex-col flex-grow pl-5 text-gray-200">
        <h4 className="text-xl capitalize" id="title">
          {property.title}
        </h4>
        <div className="flex justify-between">
          <p>
            Check In date:{" "}
            {format(new Date(reservation.checkInDate), "dd MMMM yyyy")}
          </p>
        </div>
        <div className="flex justify-between">
          <p>
            Check Out date:{" "}
            {format(new Date(reservation.checkOutDate), "dd MMMM yyyy")}
          </p>
        </div>
        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-sm text-gray-500 flex-grow">
          {property.description}
        </p>

        <div className="flex justify-between items-end pt-5">
          <div>
            <p className="text-lg font-semibold pb-2 lg:text-2xl">
              Price: {reservation.totalPrice}$
            </p>
            {/* <p className=" font-extralight">Total</p> */}
          </div>
        </div>
        <div className="flex justify-end">{buttons()}</div>
      </div>
    </div>
  );
}

export default Reservation;
