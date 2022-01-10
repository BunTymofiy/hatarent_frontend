import Footer from "../components/Footer";
import Header from "../components/Header";
import MapWithSearch from "../components/MapWithSearch";
import Image from "next/image";
// import myText from "../constants/imgtext.json";
import { useState } from "react";
import { useRouter } from "next/router";
import PropertyService from "../services/PropertyService";
import AddressHandler from "../helper/AddressHandler";
export default function Home() {
  const [imageSrc, setImageSrc] = useState([]);
  const router = useRouter();
  // const myimgs = [];

  const [title, setTitle] = useState([""]);
  const [guestLimit, setGuestLimit] = useState([""]);
  const [description, setDescription] = useState([""]);
  const [contact_person, setContact_person] = useState([""]);
  const [email, setEmail] = useState([""]);

  const [hostUserUuid, setHostUserUuid] = useState([
    "acc647e9-b9f4-4014-8b6c-f2ef8fcd257c",
  ]);
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
      setImageSrc(values);
      // for (let i = 0; i < values.length; i++) {
      //   myimgs.push(values[i]);
      // }
    });

    imageSrc.map((img) => {
      console.log(img);
      // setImageSrc(img);
    });
  }
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

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const imgs = [];
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find((e) => e.name === "file");
    // console.log(fileInput.files);
    const formData = new FormData();
    formData.append("upload_preset", "hatarent_images");

    for (let i = 0; i < fileInput.files.length; i++) {
      // console.log(i);
      await formData.delete("file");
      await formData.append("file", fileInput.files[i]);
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/hatarent/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((res) => res.json());
      imgs.push(data.secure_url);
    }
    let property = {
      hostUserUuid: "acc647e9-b9f4-4014-8b6c-f2ef8fcd257c",
      title: title,
      guestLimit: guestLimit,
      description: description,
      contact_person: contact_person,
      email: email,
      images: imgs,
      address: AddressHandler.getAddress(addressRow),
    };

    console.log("property => " + JSON.stringify(property));
    await PropertyService.createProperty(property);
    router.push("/search");
  };
  const handleCallback = async (data) => {
    // console.log(data);
    setAddressRow(data);
    // console.log(AddressHandler.getAddress(addressRow));
  };
  return (
    <div>
      <Header />
      <main>
        <div className="p-6 rounded-lg shadow-lg bg-white max-w-4xl mx-auto">
        <form method="POST" className="relative" onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label inline-block mb-2 text-gray-700">Title</label>
            <input
              placeholder="Enter Title"
              className="form-control inputs"
              name="title"
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
            <div className="">
              {imageSrc?.map((my_image) => (
                <Image
                  key={my_image}
                  src={my_image}
                  alt="someimage"
                  width={230}
                  height={200}
                  className="pl-5 ml-2 rounded-lg"
                />
              ))}
            </div>
          </div>
          <div className="h-80 w-96 bg-gray-500 p-3 rounded-3xl">
            <MapWithSearch parentCallback={handleCallback} />
          </div>
          <button
            className="cursor-pointer bg-gray-400 rounded-md p-1 hover:bg-gray-600 hover:shadow-xl"
            type="submit"
          >
            Add Property
          </button>
        </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
