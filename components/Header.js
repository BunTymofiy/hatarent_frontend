import { GlobeAltIcon, HomeIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import AuthService from "../services/AuthService";
import { UserCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import ReservationService from "../services/ReservationService";
import { useEffect, useState } from "react";

function Header({
  user,
  account_information,
  become_host,
  calendar,
  hatarent,
  notifications,
  properties,
  reservationsN,
  sign_in,
  sign_out,
  transactions,
}) {
  const [reservations, setReservations] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [locale, setLocale] = useState();
  let headerSpan = 2;
  const router = useRouter();
  const { pathname, asPath, query } = router
  const logoutHandler = async () => {
    try {
      await AuthService.logout();
      router.reload();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(async () => {
    if (user === null || user === undefined) return;
    await getReservations();
  }, [isMounted]);

  useEffect(() => {
    if (!router?.isReady) return;
    setLocale(router.locale)
  }, [router.isReady]);
  const getReservations = async () => {
    try {
      let res = await ReservationService.getReservationsByUser(user.uuid);
      let dataResponse = await res.data;
      setReservations(dataResponse);
    } catch (e) {
      console.log(e);
    }
  };

  const userImage = () => {
    if (user?.image === null) {
      return (
        <div className="dropdown relative h-12 w-12 mr-5 rounded-2xl dropdown-end">
          <UserCircleIcon
            className="h-12 btn-ghost mb-3 text-gray-300 cursor-pointer hover:scale-105"
            tabIndex="0"
          />

          <ul
            tabIndex="0"
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={() => router.push("/account-info")}>
                {account_information}
              </a>
            </li>
            <li>
              <a onClick={() => router.push("/transactions")}>{transactions}</a>
            </li>
            <li>
              <a onClick={logoutHandler}>{sign_out}</a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="dropdown relative h-12 w-12 mr-5 rounded-2xl dropdown-end">
          <div className="mb-3 relative h-12 w-12">
            <Image
              src={user?.image}
              layout="fill"
              objectFit="cover"
              alt="user"
              priority={true}
              className="rounded-full btn mb-6 hover:scale-105"
              tabIndex="0"
            />
          </div>

          <ul
            tabIndex="0"
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={() => router.push("/account-info")}>
                {account_information}
              </a>
            </li>
            <li>
              <a onClick={() => router.push("/transactions")}>{transactions}</a>
            </li>

            <li>
              <a onClick={logoutHandler}>{sign_out}</a>
            </li>
          </ul>
        </div>
      );
    }
  };
  const ownerButtons = () => {
    if (user != null) {
      let roles = [];
      for (let i = 0; i < user.roles.length; i++) {
        roles.push(user.roles[i].name);
      }
      if (roles.indexOf("ROLE_HOST") > -1) {
        let roles = [];
        document.getElementById("hd").classList.remove("grid-cols-2");
        document.getElementById("hd").classList.add("grid-cols-3");
        for (let i = 0; i < user.roles.length; i++) {
          roles.push(user.roles[i].name);
        }
        if (roles.indexOf("ROLE_HOST") > -1) {
          return (
            <div id="" className="items-stretch lg:flex justify-between hidden">
              <a
                onClick={() => router.push("/host-calendar")}
                className="btn btn-ghost rounded-btn hover:bg-blue-800 "
              >
                {calendar}
              </a>
              <a
                onClick={() => router.push("/host-properties")}
                className="btn btn-ghost rounded-btn hover:bg-blue-900 "
              >
                {properties}
              </a>
              <a
                onClick={() => router.push("/host-reservations")}
                className="btn btn-ghost rounded-btn hover:bg-blue-900 "
              >
                {notifications}
              </a>
            </div>
          );
        }
      }
    }
  };
  
  const guestButtons = () => {
    if (user != null) {
      let roles = [];
      for (let i = 0; i < user.roles.length; i++) {
        roles.push(user.roles[i].name);
      }
      if (roles.indexOf("ROLE_GUEST") > -1) {
        let roles = [];
        document.getElementById("hd").classList.remove("grid-cols-2");
        document.getElementById("hd").classList.add("grid-cols-3");
        for (let i = 0; i < user.roles.length; i++) {
          roles.push(user.roles[i].name);
        }
        if (roles.indexOf("ROLE_GUEST") > -1) {
          if (reservations != null) {
            return (
              <div id="" className="flex justify-center ">
                <div className="indicator">
                  <div className="indicator-item badge">
                    {reservations.length}
                  </div>
                  <a
                    onClick={() => router.push("/guest-reservations")}
                    className="btn btn-ghost  hover:bg-blue-800 "
                  >
                    {reservationsN}
                  </a>
                </div>
              </div>
            );
          } else {
            return (
              <div id="" className="flex justify-center ">
                <a
                  onClick={() => router.push("/guest-reservations")}
                  className="btn btn-ghost  hover:bg-blue-800 "
                >
                  {reservationsN}
                </a>
              </div>
            );
          }
        }
      }
    }
  };
  const selectLocale = (e) => {
    let localeGot = e.target.value;
    router.push({ pathname, query }, asPath, { locale: localeGot })
  };
  return (
    <header
      id="hd"
      className="top-0 z-50 grid grid-cols-2 shadow-md p-3 md:px-3 navbar mb-2 text-neutral-content rounded-box"
    >
      {/* Left */}
      <div
        className="relative items-center h-10  content-center my-auto text-gray-100
        flex-none px-2 mx-2 "
      >
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer flex hover:scale-105"
        >
          <HomeIcon className="h-9 flex-none justify-start  " />
          <p className="text-3xl font-bold select-none justify-left ml-2 mr-4">
            {hatarent}
          </p>
        </div>
      </div>
      {/* Middle */}
      {ownerButtons()}
      {guestButtons()}
      {/* Right */}
      <div className="flex items-center space-x-4 justify-end text-gray-800">
        {locale && <select
          onChange={(e) => selectLocale(e)}
          className="select max-w-xs select-info"
          defaultValue={locale}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="uk">Український</option>
          <option value="ru">Русский</option>
        </select>}
        {!user && (
          <div className="relative flex  items-center align-middle">
            <div
              onClick={() => {
                router.push({
                  pathname: "/register",
                  query: { role: "host" },
                });
              }}
              className="flex mr-5 cursor-pointer hover:scale-105"
            >
              <p className="hidden md:inline  text-white">{become_host}</p>
              <GlobeAltIcon className="h-6  text-white" />
            </div>
            <button
              className="btn btn-ghost text-white hover:scale-105 active:bg-blue-800"
              onClick={() => router.push("/login")}
            >
              {sign_in}
            </button>
          </div>
        )}

        {user && userImage()}
      </div>
    </header>
  );
}

export default Header;
