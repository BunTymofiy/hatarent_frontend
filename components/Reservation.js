import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Stripe from "stripe";
import {loadStripe} from '@stripe/stripe-js';
import AddressHandler from "../helper/AddressHandler";

const stripePromise = loadStripe("pk_test_51KSnJYGzTAX7NDbOSi0s27DkSTtk8Rk3vUsnYAmFeTngRsq0To4hvBIy0ou9u2rDgsEKWxxc8r0he3flbFatwrw60020fMtAI4");

function Reservation(props) {
  const reservation = props.reservation;
  const property = reservation.property;
  const reservationId = reservation.reservationId;
  const reservationDisplay = reservationId.substring(reservationId.length - 8).toUpperCase();
  const router = new useRouter();
  const handlePayClick = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    const session = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservationId: reservation.reservationId,
      })
    }).then(resp => resp.json());
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });
  };

  const buttons = () => {
    if (reservation.status === "pending") {
      return (
        <button className="btn btn-disabled capitalize text-gray-300  shadow-xl">
          {reservation.status}
        </button>
      );
    } else if (reservation.status === "accepted") {
      return <button onClick={handlePayClick} className="btn btn-warning capitalize">Pay</button>;
    } else if (reservation.status === "declined") {
      return (
        <button className="btn btn-disabled btn-error capitalize">
          {reservation.status}
        </button>
      );
    }else if (reservation.status === "paid") {
      return (
        <button className="btn btn-accent btn-disabled  capitalize">
          {reservation.status}
        </button>
      );
    }
  };
  return (
    <div className=" flex  py-7 px-2 pr-4 border-b first:border-t bg-gradient-to-t from-purple-800 to-blue-900 p-3 ">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex flex-shrink-0">
        {property.images.map((image) => (
          <Image
            src={image}
            key={image}
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
        <p className="">
          Address {AddressHandler.getAddressString(property.address)}
        </p>
        <p className="">
          Reservation Number: {reservationDisplay}
        </p>
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
