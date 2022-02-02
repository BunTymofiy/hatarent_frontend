import React from 'react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PropertyForm from "../components/PropertyForm";
import AuthService from "../services/AuthService";

function AddProperty() {
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

  return <div className='h-screen'>
    <Header user={user}/>
    <PropertyForm pathname={pathname} user={user}/>
    <Footer />
  </div>;
}

export default AddProperty;