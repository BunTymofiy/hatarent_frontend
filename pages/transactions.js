import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Transaction from "../components/Transaction";
import AuthService from "../services/AuthService";
import TransactionService from "../services/TransactionService";

function Transactions() {
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
        let un = {}
        for (let i = 0; i < transactions.length; i++) {
          un = await AuthService.getUserByUuid(transactions[i].senderId).then((res) => res.data);
          transactions[i]["user"] =  un;
          transWithUserName.push(transactions[i]);
          console.log( transactions[i]);
        }
        setTransactions(transWithUserName);
        setUserType("guest");

      } else if (role === "guest") {
        let transactions = await TransactionService.getTransactionsByUser(
          user.uuid
        ).then((res) => res.data);
        let transWithUserName = [];
        let un = {}
        for (let i = 0; i < transactions.length; i++) {
          un = await AuthService.getUserByUuid(transactions[i].senderId).then((res) => res.data);
          transactions[i]["user"] =  un;
          transWithUserName.push(transactions[i]);
          console.log( transactions[i]);
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
      <Header user={user} />
      <main className="mt-10 mr-6 ml-6 ">
        {transactions?.map((transaction) => (
          <Transaction transaction={transaction} userType={userType} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default Transactions;
