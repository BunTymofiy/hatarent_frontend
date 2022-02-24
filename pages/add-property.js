import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PropertyForm from "../components/PropertyForm";
import AuthService from "../services/AuthService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "property-form",
        "Footer",
        "Header",
      ])),
    },
  };
}

function AddProperty() {
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
  const add_property = t("property-form:add_property");
  const contact_person = t("property-form:contact_person");
  const description = t("property-form:description");
  const email = t("property-form:email");
  const max_guest = t("property-form:max_guest");
  const price = t("property-form:price");
  const title = t("property-form:title");
  const update_property = t("property-form:update_property");
  const router = new useRouter();
  const [pathname, setPathname] = useState(null);
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

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
    setPathname(router.pathname);
  }, [router.isReady]);

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

      <PropertyForm
        pathname={pathname}
        user={user}
        add_property={add_property}
        contact_personP={contact_person}
        descriptionP={description}
        emailP={email}
        max_guest={max_guest}
        priceP={price}
        titleP={title}
        update_property={update_property}
      />
      <Footer hatarent={hatarent} owner_name={owner_name} />
    </div>
  );
}

export default AddProperty;
