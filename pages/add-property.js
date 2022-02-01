import React from 'react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PropertyForm from "../components/PropertyForm";

function AddProperty() {
  const router = new useRouter();
  const [pathname, setPathname] = useState(null);
  useEffect(() => {
    if (!router?.isReady) return;
    setPathname(router.pathname);
  }, [router.isReady]);

  return <div>
    <Header />
    <PropertyForm pathname={pathname} />
    <Footer />
  </div>;
}

export default AddProperty;