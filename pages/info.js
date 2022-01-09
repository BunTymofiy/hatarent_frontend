import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import PropertyService from "../services/PropertyService";

export default function info(props) {
  const [data, setData] = useState(null);

  const [isMounted, setIsMounted] = useState(false);
  const [uuid, setUuid] = useState(null);
  const [title, setTitle] = useState([""]);
  const [guestLimit, setGuestLimit] = useState([""]);
  const [description, setDescription] = useState([""]);
  const [contact_person, setContact_person] = useState([""]);
  const [hostUserUuid, setHostUserUuid] = useState([""]);
  const [email, setEmail] = useState([""]);
  const router = new useRouter();
 
  async function getData() {
    try {
        let res = await PropertyService.getByUuidProperty(router.query.uuid);
        console.log(res);

        let dataResponse = await res.data;
        setUuid(dataResponse.uuid);
        setData(dataResponse);
        setTitle(dataResponse.title);
        setGuestLimit(dataResponse.guestLimit);
        setDescription(dataResponse.description);
        setContact_person(dataResponse.contact_person);
        setEmail(dataResponse.email);
        setHostUserUuid(dataResponse.hostUserUuid);

    } catch (e) {
      console.log(e);
    }
  }
  const loggy = () => { 
    console.log(title);
  };
  useEffect(async () => {
    if (router.isReady) {
        console.log("router.isReady");
      console.log(router.query.uuid);
      setUuid(router.query.uuid);
    }
    setIsMounted(true);
  }, []);
  useEffect(async () => {
    await getData();

  }, [isMounted]);
  return (
    <div>
        <Header/>
      <main>
          <button onClick={loggy}>ClickMe</button>
          Lol kekw
      </main>
    </div>
  );
}
