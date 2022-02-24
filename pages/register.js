import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Footer from "../components/Footer";
import Header from "../components/Header";
import InputWarningHelper from "../services/InputWarningHelper";
import { url } from "../constants/urls";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "register",
        "Footer",
        "Header",
      ])),
    },
  };
}

function Register() {
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
  const postUrl = url + "user/register/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [queryRole, setQueryRole] = useState("guest");
  const router = useRouter();
  const onChangeEmail = (e) => {
    InputWarningHelper.onChange(e);
    setEmail(e.target.value);
  };

  const onChangeFirstName = (e) => {
    InputWarningHelper.onChange(e);
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e) => {
    InputWarningHelper.onChange(e);
    setLastName(e.target.value);
  };
  const onChangeUserName = (e) => {
    InputWarningHelper.onChange(e);
    setUserName(e.target.value);
  };
  const onChangePassword = (e) => {
    InputWarningHelper.onChange(e);
    setPassword(e.target.value);
    if (confirmPassword !== "" && confirmPassword === e.target.value) {
      document
        .getElementById("InputPasswordConfirmWarning")
        .classList.add("hidden");
      setPasswordMatch(true);
    } else if (confirmPassword !== "" && confirmPassword !== e.target.value) {
      setPasswordMatch(false);
      if (confirmPassword !== "") {
        document
          .getElementById("InputPasswordConfirmWarning")
          .classList.remove("hidden");
      }
    } else {
      document
        .getElementById("InputPasswordConfirmWarning")
        .classList.add("hidden");
    }
  };
  const onChangeConfirmPassword = (e) => {
    if (password === e.target.value) {
      InputWarningHelper.onChange(e);
      setPasswordMatch(true);
    }
    setConfirmPassword(e.target.value);
  };
  const onBlurConfirmPassword = (e) => {
    let warning = document.getElementById(e.target.id + "Warning");
    if (password !== e.target.value) {
      InputWarningHelper.onBlur(e);
      if (document.getElementById(warning.id).classList.contains("hidden"))
        document.getElementById(warning.id).classList.remove("hidden");
      setPasswordMatch(false);
    }
  };
  const onChangeImage = (e) => {
    let file = e.target.files[0];
    let reader = {};
    if (file) {
      reader = readFiles(e.target.files[0]).then((result) => {
        setImage(result);
      });
    }
  };
  function setQuery() {
    if (router.query.role === "guest") {
      setQueryRole("guest");
    } else if (router.query.role === "host") {
      setQueryRole("host");
    }
  }

  useEffect(() => {
    if (!router?.isReady) return;
    setQuery();
  }, [router.isReady]);

  function readFiles(file) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(file);
    });
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    postUrl += queryRole;
    let resp = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        username: username,
        image: image,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    console.log(resp);
    router.push("/login");
  };
  const formOnChange = (e) => {};
  return (
    <div>
      <Header
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

      <main className="h-screen">
        <div>
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto">
            <form onSubmit={onSubmit} onChange={formOnChange}>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-6">
                  <input
                    type="text"
                    className="form-control input w-full border border-solid border-gray-300"
                    id="InputFirstName"
                    placeholder={t("register:first_name")}
                    value={firstName}
                    onBlur={(e) => InputWarningHelper.onBlur(e)}
                    onChange={onChangeFirstName}
                  />
                  <small
                    id="InputFirstNameWarning"
                    className="hidden mt-1 text-xs text-red-600"
                  >
                    {t("register:please_enter_first_name")}
                  </small>
                </div>
                <div className="form-group mb-6">
                  <input
                    type="text"
                    className="form-control input w-full border border-solid border-gray-300"
                    id="InputLastName"
                    placeholder={t("register:last_name")}
                    value={lastName}
                    onBlur={(e) => InputWarningHelper.onBlur(e)}
                    onChange={onChangeLastName}
                  />
                  <small
                    id="InputLastNameWarning"
                    className="hidden mt-1 text-xs text-red-600"
                  >
                    {t("register:please_enter_last_name")}
                  </small>
                </div>
              </div>
              <div className="form-group mb-6">
                <input
                  type="email"
                  className="form-control block input w-full border border-solid border-gray-300"
                  id="InputEmail"
                  placeholder={t("register:email_address")}
                  value={email}
                  onChange={onChangeEmail}
                  onBlur={(e) => InputWarningHelper.onBlur(e)}
                />
                <small
                  id="InputEmailWarning"
                  className="hidden mt-1 text-xs text-red-600"
                >
                  {t("register:please_enter_email_address")}
                </small>
              </div>
              <div className="form-group mb-6">
                <input
                  type="text"
                  className="form-control block input w-full border border-solid border-gray-300"
                  id="InputUsername"
                  placeholder={t("register:user_name")}
                  value={username}
                  onChange={onChangeUserName}
                  onBlur={(e) => InputWarningHelper.onBlur(e)}
                />
                <small
                  id="InputUsernameWarning"
                  className="hidden mt-1 text-xs text-red-600"
                >
                  {t("register:please_enter_username")}
                </small>
              </div>
              <div className="flex  mb-5">
                <div className="form-group mb-6">
                  <input
                    className="form-control input"
                    id="formFileSm"
                    type="file"
                    accept="image/*"
                    onChange={onChangeImage}
                  />
                </div>
                <div className="relative h-20 w-20 rounded-2xl">
                  {image && (
                    <Image
                      src={image}
                      layout="fill"
                      className="rounded-2xl shadow-xl"
                    />
                  )}
                </div>
              </div>
              <div className="form-group mb-6">
                <input
                  type="password"
                  className="form-control block input w-full border border-solid border-gray-300"
                  id="InputPassword"
                  placeholder={t("register:password")}
                  value={password}
                  onChange={onChangePassword}
                  onBlur={(e) => InputWarningHelper.onBlur(e)}
                />
                <small
                  id="InputPasswordWarning"
                  className="hidden mt-1 text-xs text-red-600"
                >
                  {t("register:please_enter_password")}
                </small>
              </div>
              <div className="form-group mb-6">
                <input
                  type="password"
                  className="form-control block input w-full border border-solid border-gray-300"
                  id="InputPasswordConfirm"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  onBlur={onBlurConfirmPassword}
                  placeholder={t("register:repeat_password")}
                />
                <small
                  id="InputPasswordConfirmWarning"
                  className="hidden mt-1 text-xs text-red-600"
                >
                  {t("register:passwords_must_match")}
                </small>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                {t("register:sign_up")}
              </button>
            </form>
            <div className="text-center">
              <a
                className="link link-hover btn-link btn-md"
                onClick={() => router.push("/login")}
              >
                {t("register:login")}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer hatarent={hatarent} owner_name={owner_name} />
    </div>
  );
}

export default Register;
