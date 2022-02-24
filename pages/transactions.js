import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Transaction from "../components/Transaction";
import AuthService from "../services/AuthService";
import TransactionService from "../services/TransactionService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "Transaction",
        "Footer",
        "Header",
      ])),
    },
  };
}

function Transactions() {
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
  const transactionsP = t("Header:transactions");
  const check_in_date = t("Transaction:check_in_date");
  const check_out_date = t("Transaction:check_out_date");
  const email = t("Transaction:email");
  const name = t("Transaction:name");
  const total_paid = t("Transaction:total_paid");
  const transaction_date = t("Transaction:transaction_date");
  const host = t("Transaction:host");
  const guest = t("Transaction:guest");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [userType, setUserType] = useState("");

  const getData = async (role, user) => {
    try {
      if (role === "host") {
        let transactions = await TransactionService.getTransactionsByHost(
          user.uuid
        ).then((res) => res.data);
        let transWithUserName = [];
        let un = {};
        for (let i = 0; i < transactions.length; i++) {
          un = await AuthService.getUserByUuid(transactions[i].senderId).then(
            (res) => res.data
          );
          transactions[i]["user"] = un;
          transWithUserName.push(transactions[i]);
          console.log(transactions[i]);
        }
        setTransactions(transWithUserName);
        setUserType("guest");
      } else if (role === "guest") {
        let transactions = await TransactionService.getTransactionsByUser(
          user.uuid
        ).then((res) => res.data);
        let transWithUserName = [];
        let un = {};
        for (let i = 0; i < transactions.length; i++) {
          un = await AuthService.getUserByUuid(transactions[i].senderId).then(
            (res) => res.data
          );
          transactions[i]["user"] = un;
          transWithUserName.push(transactions[i]);
          console.log(transactions[i]);
        }
        setTransactions(transWithUserName);
        setUserType("host");
      }
      (res) => res.data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    setIsMounted(true);
  }, []);
  useEffect(async () => {
    if (isMounted == true) {
      try {
        let userFound = await AuthService.getUser().then((res) => res.data);
        setUser(userFound);
        if (userFound != null) {
          let roles = [];
          for (let i = 0; i < userFound.roles.length; i++) {
            roles.push(userFound.roles[i].name);
          }
          if (roles.indexOf("ROLE_HOST") > -1) {
            getData("host", userFound);
          }
          if (roles.indexOf("ROLE_GUEST") > -1) {
            getData("guest", userFound);
          }
        }
      } catch (e) {
        router.push("/login");
      }
    }
  }, [isMounted]);

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
        transactions={transactionsP}
      />

      <main className="mt-10 mr-6 ml-6 ">
        {transactions?.map((transaction) => (
          <Transaction
            transaction={transaction}
            userType={userType}
            check_in_date={check_in_date}
            check_out_date={check_out_date}
            email={email}
            name={name}
            total_paid={total_paid}
            transaction_date={transaction_date}
            host={host}
            guest={guest}
          />
        ))}
      </main>
      <Footer hatarent={hatarent} owner_name={owner_name} />
    </div>
  );
}

export default Transactions;
