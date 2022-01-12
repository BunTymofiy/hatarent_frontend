import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PropertyForm from "../components/PropertyForm";
import PropertyService from "../services/PropertyService";

function UpdateProperty() {
  const router = new useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [uuid, setUuid] = useState(null);
  const [data, setData] = useState(null);

  async function getData() {
    try {
      let res = await PropertyService.getByUuidProperty(router.query.uuid);
      let dataResponse = await res.data;
      setData(dataResponse);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (router.isReady) {
      console.log(router.query.uuid);
      setUuid(router.query.uuid);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!router?.isReady) return;
    getData();
  }, [router.isReady]);

  if (!isMounted)
  return (
    <>
      <div className="flex items-center justify-center space-x-2 animate-bounce">
        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
        <div className="w-8 h-8 bg-green-400 rounded-full"></div>
        <div className="w-8 h-8 bg-black rounded-full"></div>
      </div>
    </>
  );
  return (
    <div>
      <Header />
      {data && (<PropertyForm data={data}/>)}
      
      <Footer />
    </div>
  );
}

export default UpdateProperty;
