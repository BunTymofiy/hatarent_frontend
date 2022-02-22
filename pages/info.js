import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AddressHandler from "../helper/AddressHandler";
import PropertyService from "../services/PropertyService";
import Map from "../components/Map";
import AuthService from "../services/AuthService";
import { differenceInCalendarDays, format } from "date-fns";

export default function info(props) {
  const router = new useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState(null);
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
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numOfGuests, setNumOfGuests] = useState(null);
  const [price, setPrice] = useState(null);
  const [numOfDays, setNumOfDays] = useState(null);
  
  async function getData() {
    try {
      setLoading(true);
      let res = await PropertyService.getByUuidProperty(router.query.uuid);
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
      setPrice(dataResponse.price);

    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setIsMounted(true);
    }
  }

  useEffect(() => {
    if (router.isReady) {
      setUuid(router.query.uuid);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!router?.isReady) return;
    getData();
    const { location, startDate, endDate, numberOfGuests } = router.query;
    setStartDate(startDate);
    setEndDate(endDate);
    setNumOfGuests(numberOfGuests);
    if(startDate && endDate && numberOfGuests) {
    const formattedStartDate = format(new Date(startDate), "dd MMMM yyyy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yyyy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;
    setNumOfDays(differenceInCalendarDays(new Date(endDate), new Date(startDate)));
    router.query;
    }
  }, [router.isReady]);

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

  const ownerButtons = () => {
    if (user != null) {
      let roles = [];
      for (let i = 0; i < user.roles.length; i++) {
        roles.push(user.roles[i].name);
      }
      if (roles.indexOf("ROLE_HOST") > -1) {
        if (hostUserUuid === user.uuid)
          return (
            <div>
              <button
                className="btn btn-primary mr-2"
                id="update"
                onClick={() => {
                  router.push({
                    pathname: "/update-property",
                    query: { uuid: uuid },
                  });
                }}
              >
                Update Information
              </button>
              {/* <button className="btn" onClick={handleDelete}>
                Delete Property
              </button> */}
            </div>
          );
      }
    }
  };
  const reservationButton = () => {
    let roles = [];
    if (user != null) {
      for (let i = 0; i < user.roles.length; i++) {
        roles.push(user.roles[i].name);
      }
    }
    if (user == null || roles.indexOf("ROLE_GUEST") > -1) {
      return (
        <div>
          <button
            className="btn btn-primary mt-3 mr-2"
            id="reservation"
            onClick={() => {
              router.push({
                pathname: "/reservation",
                query: {
                  uuid: uuid,
                  startDate: startDate,
                  endDate: endDate,
                  numberOfGuests: numOfGuests,
                },
              });
            }}
          >
            Reserve
          </button>
        </div>
      );
    }
  };
  const handleDelete = async () => {
    try {
      let res = await PropertyService.deleteProperty(uuid);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };
  const imageCarousel = () => {
    let imageCarousel = [];
    for (let i = 0; i < images.length; i++) {
      imageCarousel.push(
        <div
          id={"item" + i}
          key={"carouselImage" + i}
          className="w-full carousel-item relative"
        >
          <Image
            src={images[i]}
            layout="fill"
            objectFit="cover"
            className="rounded-3xl "
          />
          {/* <img src={images[i]} className=" h"/> */}
        </div>
      );
    }
    return imageCarousel;
  };
  const imageCarouselButtons = () => {
    let imageCarouselButtons = [];
    for (let i = 0; i < images.length; i++) {
      imageCarouselButtons.push(
        <a
          href={"#item" + i}
          key={"carouselButton" + i}
          className="btn btn-xs btn-circle"
        >
          {i + 1}
        </a>
      );
    }
    return imageCarouselButtons;
  };
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
  return (
    <div>
      <Header user={user} />
      <main className="h-screen">
        {loader}
        <div className="container mx-auto px-4 font-serif">
          <div className="card glass text-gray-200 card-normal mx-auto w-auto">
            <h2 className="text-center card-title text-neutral-content capitalize text-xl p-2 font-semibold">
              {title}
            </h2>
            <div className="flex flex-col items-center mt-10">
              <div className="rounded-3xl p-4 bg-opacity-80 mb-5">
                <div className="relative w-min mx-auto">
                  <div className="w-full max-w mx-auto">
                    <div className=" h-96 min-w-[500px] carousel">
                      {imageCarousel()}
                    </div>
                    <div className="flex justify-center w-full py-4 space-x-2">
                      {imageCarouselButtons()}
                    </div>
                  </div>
                </div>
                <h2 className="font-semibold ">Description</h2>
                <div className="w-[500px]">
                  <p className="text-xs">{description}</p>
                </div>
                <div className="border-t border-slate-200 mt-2 mb-2" />
                <div className="grid grid-cols-2  mt-2">
                  <div>
                    <h2 className="font-semibold ">Details</h2>
                    <div className="text-xs">
                      <p>Max Guests: {guestLimit}</p>
                      {address && (
                        <div>
                          Address: {AddressHandler.getAddressString(address)}
                        </div>
                      )}
                      <p>Contact Person: {contact_person}</p>
                      <p>Email: {email}</p>
                      <p className="text-xl">Price: {price}$</p>
                      <p className="text-2xl">Your total price: {price * numOfDays}$</p>
                    </div>
                    
                    {ownerButtons()}
                    {reservationButton()}
                  </div>
                  <div>
                    <div className="relative h-56 w-96 mb-5">
                      {address && (
                        <div>
                          <Map
                            longitude={address.longitude}
                            latitude={address.latitude}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
