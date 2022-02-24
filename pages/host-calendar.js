import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { takeMonth } from "../helper/CalendarUtils";
import {
  addMonths,
  differenceInBusinessDays,
  format,
  formatRelative,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  subMonths,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import AuthService from "../services/AuthService";
import { useRouter } from "next/router";
import PropertyService from "../services/PropertyService";
import ReservationService from "../services/ReservationService";
import { fr, ru, uk } from "date-fns/locale";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "host-calendar",
        "Footer",
        "Header",
      ])),
      locale,
    },
  };
}
function WeekNames({ dayNames }) {
  function cornerClassName(i) {
    if (i === 0) return "rounded-tl-lg";
    if (i === 6) return "rounded-tr-lg";
  }

  return (
    <div className="grid grid-cols-7">
      {dayNames.map((dayName, i) => (
        <div
          key={dayName}
          className={` flex items-center text-xs md:text-lg justify-center border text-gray-200 border-blue-200 ${cornerClassName(
            i
          )}`}
        >
          {dayName}
        </div>
      ))}
    </div>
  );
}

function Calendar({ reservations, locale, dayNames }) {
  const router = useRouter();

  function dayColor(day) {
    if (!isSameMonth(day, selectedDate)) return "text-gray-200";
    if (isSameDay(day, selectedDate)) return "bg-gray-300 bg-opacity-30";
  }
  function cornerClassName(weekIndex, dayIndex) {
    if (weekIndex !== data.length - 1) return;
    if (dayIndex === 0) return "rounded-bl-lg";
    if (dayIndex === 6) return "rounded-br-lg";
  }
  const [selectedDate, setSelectedDate] = useState(new Date());
  const data = takeMonth(selectedDate)();

  const addAMonth = async () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };
  const subAMonth = async () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };
  function loadBlockedDays(day) {
    if (reservations != null) {
      for (let i = 0; i < reservations.length; i++) {
        let reservedDaysNum = differenceInBusinessDays(
          new Date(reservations[i].checkOutDate),
          new Date(reservations[i].checkInDate)
        );
        for (let j = 0; j < reservedDaysNum; j++) {
          if (
            (isAfter(day, new Date(reservations[i].checkInDate)) &&
              isBefore(day, new Date(reservations[i].checkOutDate))) ||
            isSameDay(day, new Date(reservations[i].checkInDate)) ||
            isSameDay(day, new Date(reservations[i].checkOutDate))
          ) {
            if (reservations[i].status === "pending") {
              return "bg-red-700 bg-opacity-30";
            } else if (reservations[i].status === "accepted") {
              return "bg-yellow-700 bg-opacity-50";
            } else if (reservations[i].status === "paid") {
              return "bg-green-700 bg-opacity-30";
            }
          }
        }
      }
    }
  }
  function showReservation(day) {
    let theReservation = null;
    if (reservations != null) {
      for (let i = 0; i < reservations.length; i++) {
        if (
          (isAfter(day, new Date(reservations[i].checkInDate)) &&
            isBefore(day, new Date(reservations[i].checkOutDate))) ||
          isSameDay(day, new Date(reservations[i].checkInDate)) ||
          isSameDay(day, new Date(reservations[i].checkOutDate))
        ) {
          theReservation = reservations[i];
          router.push({
            pathname: "/show-reservation",
            query: { id: theReservation.reservationId },
          });
        }
      }
    }
  }
  let dateLocale = null;
  if (locale === "en") {
    dateLocale = format(selectedDate, "MMMM, yyyy");
  } else if (locale === "fr") {
    dateLocale = format(selectedDate, "MMMM, yyyy", { locale: fr });
  } else if (locale === "ru") {
    dateLocale = format(selectedDate, "MMMM, yyyy", { locale: ru });
  } else if (locale === "uk") {
    dateLocale = format(selectedDate, "MMMM, yyyy", { locale: uk });
  }

  return (
    <div className="card  h-full">
      <div className="glass box-border m-8  h-[60vh] xl:h-[70vh] 2xl:h-[70vh] 4xl card flex justify-center rounded-2xl">
        <div className="text-gray-100 justify-between  flex">
          <div className="">
            <button onClick={subAMonth} className="">
              <ChevronLeftIcon className="h-16 hover:shadow-xl hover:scale-105" />
            </button>
          </div>{" "}
          <div className="text-4xl capitalize">{dateLocale}</div>{" "}
          <div className="">
            <button onClick={addAMonth} className=" ">
              <ChevronRightIcon className="h-16 hover:shadow-xl hover:scale-105" />
            </button>
          </div>
        </div>
        <div className="border rounded-md">
          {" "}
          <WeekNames dayNames={dayNames} />
          {data.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((day, di) => (
                <div
                  onClick={() => setSelectedDate(day)}
                  onDoubleClick={() => showReservation(day)}
                  // onDoubleClick={}
                  key={day}
                  className={`p-4 border sm:h-20 md:h-20 2xl:h-24 hover:scale-105 hover:bg-slate-600 border-blue-200 ${dayColor(
                    day
                  )} ${cornerClassName(wi, di)}, ${loadBlockedDays(day)}`}
                >
                  {format(day, "dd")}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HostCalendar({ locale }) {
  const { t } = useTranslation();
  const dayNames = [
    t("host-calendar:sunday"),
    t("host-calendar:monday"),
    t("host-calendar:tuesday"),
    t("host-calendar:wednesday"),
    t("host-calendar:thursday"),
    t("host-calendar:friday"),
    t("host-calendar:saturday"),
  ];
  const hatarent = t("Footer:hatarent");
  const owner_name = t("Footer:owner_name");
  const account_information = t("Header:account_information");
  const become_host = t("Header:become_host");
  const calendar = t("Header:calendar");
  const hatarent_logo = t("Header:hatarent");
  const notifications = t("Header:notifications");
  const propertiesP = t("Header:properties");
  const reservationsP = t("Header:reservations");
  const sign_in = t("Header:sign_in");
  const sign_out = t("Header:sign_out");
  const transactions = t("Header:transactions");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [properties, setProperties] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [reservations, setReservations] = useState(null);

  async function getData(userFound) {
    try {
      setProperties(null);
      let res = await PropertyService.getPropertiesByHost(userFound.uuid);
      let dataResponse = res.data;
      setProperties(dataResponse);
      return;
    } catch (err) {
      console.log(err);
    } finally {
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

  async function handleSelectProperty(propertyId) {
    const reservations = await ReservationService.getReservationsByProperty(
      propertyId
    ).then((res) => res.data);
    setReservations(reservations);
  }

  let options = null;
  if (properties != null) {
    options = properties.map((property) => {
      return (
        <option key={property.uuid} value={property.uuid}>
          {property.title}
        </option>
      );
    });
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
        properties={propertiesP}
        reservationsN={reservationsP}
        sign_in={sign_in}
        sign_out={sign_out}
        transactions={transactions}
      />
      <main>
        <div className="flex justify-center">
          <select
            onChange={(e) => handleSelectProperty(e.target.value)}
            className="ju select w-full max-w-xs select-primary"
          >
            <option disabled selected>
              {t("host-calendar:select_property")}
            </option>
            {options}
          </select>
        </div>
        <Calendar
          reservations={reservations}
          dayNames={dayNames}
          locale={locale}
        />
      </main>
      <Footer hatarent={hatarent} owner_name={owner_name} />
    </div>
  );
}

export default HostCalendar;
