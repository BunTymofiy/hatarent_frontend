import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PropertyForm from "../components/PropertyForm";
import AuthService from "../services/AuthService";
import PropertyService from "../services/PropertyService";

function UpdateProperty() {
  const router = new useRouter();
  const [data, setData] = useState(null);
  const [pathname, setPathname] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);


  async function getData() {
    try {
      setLoading(true);
      setData(null);

      let res = await PropertyService.getByUuidProperty(router.query.uuid);
      let dataResponse = await res.data;
      setData(dataResponse);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(async () => {
    setIsMounted(true);
  }, []);
  useEffect(async () => {
    if (isMounted == true) {
      try {
        let userFound = await AuthService.getUser();
        setUser(userFound.data);
      } catch (e) {}
    }
  }, [isMounted]);


  useEffect(() => {
    if (!router?.isReady) return;
    getData();
    setPathname(router.pathname);
  }, [router.isReady]);
  let loader = null;

  if (loading) {
    loader = (
      <div className="h-screen ">
        <div className="flex justify-center items-center h-screen">
          <div className="flex items-center justify-center space-x-2 animate-bounce">
            <div className="w-20 h-20 bg-blue-400 rounded-full"></div>
            <div className="w-20 h-20 bg-green-400 rounded-full"></div>
            <div className="w-20 h-20 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  let content = null;

  if (data != null) {
    content = <PropertyForm data={data} pathname={pathname} />;
  }
  return (
    <>
      <Header user={user}/>
      {loader}
      {content}
      <Footer />
    </>
  );
}

export default UpdateProperty;
