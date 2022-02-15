import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Reservation from "../components/Reservation";
import AuthService from "../services/AuthService";
import ReservationService from "../services/ReservationService";

function GuestReservations() {
  const router = new useRouter();
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);

  async function getData(userFound) {
    try {
      setLoading(true);
      let res = await ReservationService.getReservationsByUser(userFound.uuid);
      let dataResponse = await res.data;
   
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

  return (
    <div className="h-screen">
      <Header user={user} />
      {loader}
      <main>
        <div className="flex justify-center align-middle">
          <h1 className="text-3xl text-gray-300">Your Reservations</h1>
        </div>
        <div className=" flex">
          <section className="flex-grow pt-14 pl-6 pr-6">
          <button onClick={() => router.push("/")} className="text-gray-200 mb-4 btn btn-outline btn-sm">Back to homepage</button>
            {reservations?.map((reservation) => (
              <div key={reservation.reservationId} className="flex flex-col space-y-2">
                <Reservation reservation={reservation} />
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default GuestReservations;
