import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AddressHandler from "../helper/AddressHandler";
import PropertyService from "../services/PropertyService";

export default function info(props) {
  const router = new useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const [data, setData] = useState(null);
  const [uuid, setUuid] = useState(null);
  const [title, setTitle] = useState([""]);
  const [guestLimit, setGuestLimit] = useState([""]);
  const [description, setDescription] = useState([""]);
  const [contact_person, setContact_person] = useState([""]);
  const [hostUserUuid, setHostUserUuid] = useState([""]);
  const [email, setEmail] = useState([""]);
  const [address, setAddress] = useState(null);
  const [images, setImages] = useState([]);

  async function getData() {
    try {
      let res = await PropertyService.getByUuidProperty(router.query.uuid);
      console.log(res);

      let dataResponse = await res.data;
      setUuid(dataResponse.uuid);
      setTitle(dataResponse.title);
      setGuestLimit(dataResponse.guestLimit);
      setDescription(dataResponse.description);
      setContact_person(dataResponse.contact_person);
      setEmail(dataResponse.email);
      setHostUserUuid(dataResponse.hostUserUuid);
      setImages(dataResponse.images);
      setAddress(dataResponse.address);
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
  const handleDelete = async () => {
    try {
      let res = await PropertyService.deleteProperty(uuid);
      console.log(res);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Header />
      <main className="h-screen">
        <div className="container mx-auto px-4 font-serif">
          <div className="card card-normal mx-auto  bg-slate-300">
            <h2 className="text-center text-gray-500 text-xl p-2 font-semibold bg-blue-">
              {title}
            </h2>
            <div className="bg-gray-200 p-4 bg-opacity-80">
              <div className="max-w-lg p-2 h-32 md:h-44 mx-auto  space-x-4 carousel carousel-center bg-neutral rounded-box ">
                {images?.map((image) => (
                  <div key={image} className="carousel-item">
                    <img
                      src={image}
                      key={image}
                      className="rounded-2xl w-full h-full "
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
              <h2 className="font-semibold ">Description</h2>
              <p className="text-xs">{description}</p>
              <div className="border-t border-slate-500 mt-2 mb-2" />
              <h2 className="font-semibold ">Details</h2>
              <div className="text-xs">
                <p>Max Guests: {guestLimit}</p>
                {address && (
                  <div>Address: {AddressHandler.getAddressString(address)}</div>
                )}
                <p>Contact Person: {contact_person}</p>
                <p>Email: {email}</p>
              </div>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  router.push({
                    pathname: "/update-property",
                    query: { uuid: uuid },
                  });
                }}
              >
                Update Information
              </button>
              <button className="btn" onClick={handleDelete}>
                Delete Property
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
