import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InputWarningHelper from "../services/InputWarningHelper";
import { url } from "../constants/urls";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["login","Footer", "Header"])),
    },
  };
}

function login() {
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
  const loginUrl = url + "login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangeEmail = (e) => {
    InputWarningHelper.onChange(e);
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    InputWarningHelper.onChange(e);
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("failedLogin").classList.add("hidden");
    const user = new URLSearchParams();
    user.append("email", email);
    user.append("password", password);
    try {
      let res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
        body: user.toString(),
      });
      if (res.status === 200) {
        router.back();
      }
      if (res.status === 403) {
        document.getElementById("failedLogin").classList.remove("hidden");
      }
    } catch (err) {
      document.getElementById("failedLogin").classList.remove("hidden");
      console.log(err);
    }
  };
  return (
    <div>
      <Header account_information={account_information} become_host={become_host} calendar={calendar} notifications={notifications} hatarent={hatarent_logo} properties={properties} reservationsN={reservations} sign_in={sign_in} sign_out={sign_out} transactions={transactions} />
      <main className="h-screen">
        <div className="p-6 rounded-xl shadow-xl bg-white max-w-sm mx-auto ">
          <form onSubmit={onSubmit}>
            <div className="mb-4 text-center">
              <span className="text-red-600 hidden" id="failedLogin">
                {" "}
                {t("login:login_failed")}
              </span>
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="InputEmail"
                className="form-label inline-block mb-2 text-gray-700"
              >
                {t("login:email_address")}
              </label>
              <input
                type="email"
                value={email}
                onChange={onChangeEmail}
                onBlur={(e) => InputWarningHelper.onBlur(e)}
                className="form-control input w-full border border-solid border-gray-300"
                id="InputEmail"
                placeholder={t("login:enter_email_placeholder")}
              />
              <small
                id="InputEmailWarning"
                className="hidden mt-1 text-xs text-red-600"
              >
                {t("login:enter_email_address")}
              </small>
              <small
                id="EmailHelp"
                className="block mt-1 text-xs text-gray-600"
              >
                {t("login:never_share_email")}
              </small>
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="InputPassword"
                className="form-label inline-block mb-2 text-gray-700"
              >
                {t("login:password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={onChangePassword}
                onBlur={(e) => InputWarningHelper.onBlur(e)}
                className="form-control input w-full border border-solid border-gray-300"
                id="InputPassword"
                placeholder={t("login:password")}
              />
              <small
                id="InputPasswordWarning"
                className="hidden mt-1 text-xs text-red-600"
              >
                {t("login:please_enter_password")}
              </small>
            </div>

            <button
              id="Login"
              type="submit"
              className=" btn btn-primary w-full"
            >
              {t("login:login")}
            </button>
          </form>
          <div className="text-center">
            <a
              className="link link-hover btn-link btn-md"
              onClick={() => {
                router.push({
                  pathname: "/register",
                  query: { role: "guest" },
                });
              }}
            >
              {t("login:create_new_account")}
            </a>
          </div>
        </div>
      </main>
      <Footer hatarent={hatarent} owner_name={owner_name}/>
    </div>
  );
}

export default login;
