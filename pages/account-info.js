import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthService from "../services/AuthService";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/outline";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["Footer", "Header"])),
    },
  };
}

function AccountInfo() {
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
  const [pathname, setPathname] = useState(null);
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  let avatar = null;

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

  const userData = () => {
    if (user != null) {
      <div>
        {user.firstName} {user.lastName}
      </div>;
    }
  };

  if (user !== null) {
    if (user.image != null) {
      avatar = (
        <div className="relative h-44 w-52  ">
          <Image
            src={user.image}
            objectFit="cover"
            layout="fill"
            alt="user"
            className="rounded-full"
          />
        </div>
      );
    } else {
      avatar = (
        <div className="relative">
          <UserCircleIcon size="large" className="rounded-full" />
        </div>
      );
    }
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

      <main>
        <div className="card ">
          <div className="flex items-center px-4 py-10 bg-cover card">
            <div className="card glass lg:card-side text-neutral-content">
              <div className="h-80 w-64">
                <figure className="px-10 relative pt-10  h-52 w-72">
                  {avatar}
                  <div className="justify-center card-actions">
                    {/* <button className="btn btn-outline btn-accent">
                      Update Info
                    </button> */}
                  </div>
                </figure>
              </div>
              <div className="card-body flex flex-col">
                <div className="flex flex-col flex-grow justify-center">
                  <h2 className="card-title">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <h2 className="">{user?.email}</h2>
                  <h2 className="">{user?.username}</h2>
                </div>
                <div className="flex flex-col flex-grow"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer hatarent={hatarent} owner_name={owner_name} />
    </div>
  );
}

export default AccountInfo;
