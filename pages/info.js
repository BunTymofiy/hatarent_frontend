import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
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
  const [images, setImages] = useState([]);
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
      setImages(dataResponse.images);
    } catch (e) {
      console.log(e);
    }
  }
  const loggy = () => {
    console.log(images[0]);
  };
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

  if (!isMounted) return <></>;

  return (
    <div>
      <Header />
      <main className="h-screen">
        <div className="card card-body mx-auto">
          <h2 className="text-center text-gray-500 text-xl p-2 font-semibold bg-blue-">{title}</h2>
          <div className="bg-gray-200 bg-opacity-80">
            <div className="max-w-lg p-2 h-32 md:h-44 mx-auto  space-x-4 carousel carousel-center bg-neutral rounded-box ">
              {images?.map((image) => (
                <div key={image} className="carousel-item">
                  <img
                    src={image}
                    key={image}
                    className="rounded-2xl w-full h-full"
                  />
                </div>
              ))}
              {/* <Image
              src={images[0]}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            /> */}
            </div>
            <button
              className="p-2 bg-gray-400 hover:shadow-md rounded-md"
              onClick={loggy}
            >
              ClickMe
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
