import MapWithSearch from "../components/MapWithSearch";
import Image from "next/image";
import { useEffect, useState } from "react";
import PropertyService from "../services/PropertyService";
import AddressHandler from "../helper/AddressHandler";
import { useRouter } from "next/router";
import { TrashIcon } from "@heroicons/react/outline";

function PropertyForm(props) {
  const data = props.data;
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

  const [hostUserUuid, setHostUserUuid] = useState("acc647e9-b9f4-4014-8b6c-f2ef8fcd257c");
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
  const [addressRow, setAddressRow] = useState(null);
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
      // console.log(data);
      setUuid(data.uuid);
      setTitle(data.title);
      setGuestLimit(data.guestLimit);
      setDescription(data.description);
      setContact_person(data.contact_person);
      setEmail(data.email);
      setHostUserUuid(data.hostUserUuid);
      setImages(data.images);
      setAddress(data.address);
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

  

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    let property = {
      hostUserUuid: "acc647e9-b9f4-4014-8b6c-f2ef8fcd257c",
      title: title,
      guestLimit: guestLimit,
      description: description,
      contact_person: contact_person,
      email: email,
      images: images,
      address: AddressHandler.getAddress(addressRow),
    };
    if (props.pathname === "/update-property") {
      await PropertyService.updateProperty(uuid, property);
    }
    if (props.pathname === "/add-property") {
      await PropertyService.createProperty(property);
    }
    router.push("/search");
  };
  const handleCallback = async (data) => {
    setAddressRow(data);
  };
  return (
    <div>
      <main>
        <div className="p-6 rounded-lg shadow-lg bg-white max-w-4xl mx-auto">
          <h3></h3>
          <form method="PUT" className="relative" onSubmit={handleOnSubmit}>
            <div className="form-group">
              <label
                htmlFor="title"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Title
              </label>
              <input
                placeholder="Enter Title"
                className="form-control inputs"
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
                className="form-control inputs"
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
              <label htmlFor="contact_person">Contact Person</label>
              <input
                placeholder="Enter Contact Person"
                className="form-control inputs"
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
                className="form-control inputs"
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
                className="form-control inputs mb-1"
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
                className="relative cursor-pointer"
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
                    <TrashIcon className="h-7 text-red-600 z-50 " />
                    <Image
                      key={my_image}
                      src={my_image}
                      alt="someImage"
                      width={230}
                      height={200}
                      className="pl-5 ml-2 rounded-xl z-40"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="h-80 w-96 bg-gray-500 p-3 rounded-3xl">
              <MapWithSearch
                mapValue={address}
                parentCallback={handleCallback}
              />
            </div>
            <button
              className="cursor-pointer bg-gray-400 rounded-md p-1 hover:bg-gray-600 hover:shadow-xl"
              type="submit"
              id="submit"
            >
              Add Property
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default PropertyForm;
