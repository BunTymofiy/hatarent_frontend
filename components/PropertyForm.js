import MapWithSearch from "../components/MapWithSearch";
import Image from "next/image";
import { useEffect, useState } from "react";
import PropertyService from "../services/PropertyService";
import AddressHandler from "../helper/AddressHandler";
import { useRouter } from "next/router";

function PropertyForm(props) {
  const data = props.data;
  const user = props.user;
  const [images, setImages] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const [uuid, setUuid] = useState(null);
  const [title, setTitle] = useState([""]);
  const [guestLimit, setGuestLimit] = useState([""]);
  const [description, setDescription] = useState([""]);
  const [contact_person, setContact_person] = useState([""]);
  const [email, setEmail] = useState([""]);
  const [address, setAddress] = useState(null);
  const [hostUserUuid, setHostUserUuid] = useState(null);
  const [addressRow, setAddressRow] = useState(null);
  const [price, setPrice] = useState(null);

  function readFiles(file) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(file);
    });
  }
  function handleOnChange(changeEvent) {
    let files = changeEvent.target.files;
    let readers = [];
    if (!files.length) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      readers.push(readFiles(files[i]));
    }
    Promise.all(readers).then((values) => {
      setImages(values);
    });
  }
  async function setData() {
    try {
      setUuid(data.uuid);
      setTitle(data.title);
      setGuestLimit(data.guestLimit);
      setDescription(data.description);
      setContact_person(data.contact_person);
      setEmail(data.email);
      setHostUserUuid(data.hostUserUuid);
      setImages(data.images);
      setAddress(data.address);
      setPrice(data.price);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(async () => {
    if (data === null || data === undefined) return;
    await setData();
  }, [isMounted]);
  const buttons = () => {
    if(props.pathname === "/update-property"){
      return (
        <button
        className="btn rounded-md p-1"
        type="submit"
        id="submit"
      >
        Update Property
      </button>)}
    else if (props.pathname === "/add-property")
    {
      return(
        <button
        className="btn rounded-md p-1"
        type="submit"
        id="submit"
      >
        Add Property
      </button>
      )
    }
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    let property = {
      hostUserUuid: user.uuid,
      title: title,
      guestLimit: guestLimit,
      description: description,
      contact_person: contact_person,
      email: email,
      images: images,
      address: AddressHandler.getAddress(addressRow),
      price: price,
    };
    if (props.pathname === "/update-property") {
      await PropertyService.updateProperty(uuid, property);
    }
    if (props.pathname === "/add-property") {
      await PropertyService.createProperty(property);
    }
    router.push("/host-properties");
  };
  const handleCallback = async (data) => {
    setAddressRow(data);
  };
  return (
    <div>
      <main>
        <div className="p-6  text-gray-200 shadow-lg card glass max-w-4xl mx-auto">
          <h3></h3>
          <form method="PUT" className="relative " onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="form-label inline-block mb-2">
                Title
              </label>
              <input
                placeholder="Enter Title"
                className="form-control input bg-transparent w-full border-gray-500"
                name="title"
                id="title"
                type="text"
                autoComplete="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="guestLimit">Max Guest</label>
              <input
                placeholder="Enter Guest Number"
                className="form-control input bg-transparent w-full border-gray-500"
                name="guestLimit"
                id="guestLimit"
                type="number"
                autoComplete="guestLimit"
                value={guestLimit}
                onChange={(e) => setGuestLimit(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                placeholder="Enter price per night"
                className="form-control input bg-transparent w-full border-gray-500"
                name="price"
                id="price"
                type="number"
                autoComplete="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact_person">Contact Person</label>
              <input
                placeholder="Enter Contact Person"
                className="form-control input bg-transparent w-full border-gray-500"
                name="contact_person"
                id="contact_person"
                type="text"
                autoComplete="contact_person"
                value={contact_person}
                onChange={(e) => setContact_person(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                placeholder="Enter Email"
                className="form-control input bg-transparent w-full border-gray-500"
                name="email"
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                placeholder="Enter Description"
                className="form-control inputs mb-1 bg-transparent text-gray-200 border-gray-500 focus:border-white focus:bg-transparent border-r-2"
                name="description"
                id="description"
                type="text"
                autoComplete="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className=" ">
              <input
                className="relative cursor-pointer bg-transparent"
                type="file"
                name="file"
                onChange={handleOnChange}
                multiple
                accept="image/*"
              />
            </div>
            <div className="relative w-30 flex">
              <div className="grid grid-flow-col">
                {images?.map((my_image) => (
                  <div key={my_image} className="m-2 overflow-x-auto">
                    <Image
                      key={my_image}
                      src={my_image}
                      alt="someImage"
                      width={130}
                      height={100}
                      className="pl-5 ml-2 rounded-xl z-40"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between pb-8 pt-5">
              <div className="h-80 w-96 bg-gray-500 rounded-3xl">
                <MapWithSearch
                  mapValue={address}
                  parentCallback={handleCallback}
                />
              </div>
             {buttons()}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default PropertyForm;
