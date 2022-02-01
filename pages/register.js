import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Footer from "../components/Footer";
import Header from "../components/Header";
import InputWarningHelper from "../services/InputWarningHelper";
import { url } from "../constants/urls";
import Image from "next/image";

function Register() {
  const postUrl = url + "user/register/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [queryRole, setQueryRole] = useState("guest");
  const router = useRouter();
  const onChangeEmail = (e) => {
    InputWarningHelper.onChange(e);
    setEmail(e.target.value);
  };

  const onChangeFirstName = (e) => {
    InputWarningHelper.onChange(e);
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e) => {
    InputWarningHelper.onChange(e);
    setLastName(e.target.value);
  };
  const onChangeUserName = (e) => {
    InputWarningHelper.onChange(e);
    setUserName(e.target.value);
  };
  const onChangePassword = (e) => {
    InputWarningHelper.onChange(e);
    setPassword(e.target.value);
    if (confirmPassword !== "" && confirmPassword === e.target.value) {
      document
        .getElementById("InputPasswordConfirmWarning")
        .classList.add("hidden");
      setPasswordMatch(true);
    } else if (confirmPassword !== "" && confirmPassword !== e.target.value) {
      setPasswordMatch(false);
      if (confirmPassword !== "") {
        document
          .getElementById("InputPasswordConfirmWarning")
          .classList.remove("hidden");
      }
    } else {
      document
        .getElementById("InputPasswordConfirmWarning")
        .classList.add("hidden");
    }
  };
  const onChangeConfirmPassword = (e) => {
    if (password === e.target.value) {
      InputWarningHelper.onChange(e);
      setPasswordMatch(true);
    }
    setConfirmPassword(e.target.value);
  };
  const onBlurConfirmPassword = (e) => {
    let warning = document.getElementById(e.target.id + "Warning");
    if (password !== e.target.value) {
      InputWarningHelper.onBlur(e);
      if (document.getElementById(warning.id).classList.contains("hidden"))
        document.getElementById(warning.id).classList.remove("hidden");
      setPasswordMatch(false);
    }
  };
  const onChangeImage = (e) => {
    let file = e.target.files[0];
    let reader = {};
    if (file) {
      reader = readFiles(e.target.files[0]).then((result) => {
        setImage(result);
      });
    }
  };
  function setQuery() {
    if (router.query.role === "guest") {
      setQueryRole("guest");
    } else if (router.query.role === "host") {
      setQueryRole("host");
    }
  }

  useEffect(() => {
    if (!router?.isReady) return;
    setQuery();
  }, [router.isReady]);

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
  const onSubmit = async (e) => {
    e.preventDefault();
    postUrl += queryRole;
    let resp = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        username: username,
        image: image,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
    console.log(resp);
    router.push("/login");
  };
  const formOnChange = (e) => {};
  return (
    <div>
      <Header />
      <main className="h-screen">
        <div>
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto">
            <form onSubmit={onSubmit} onChange={formOnChange}>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group mb-6">
                  <input
                    type="text"
                    className="form-control input w-full border border-solid border-gray-300"
                    id="InputFirstName"
                    placeholder="First name"
                    value={firstName}
                    onBlur={(e) => InputWarningHelper.onBlur(e)}
                    onChange={onChangeFirstName}
                  />
                  <small
                    id="InputFirstNameWarning"
                    className="hidden mt-1 text-xs text-red-600"
                  >
                    Please enter your first name
                  </small>
                </div>
                <div className="form-group mb-6">
                  <input
                    type="text"
                    className="form-control input w-full border border-solid border-gray-300"
                    id="InputLastName"
                    placeholder="Last name"
                    value={lastName}
                    onBlur={(e) => InputWarningHelper.onBlur(e)}
                    onChange={onChangeLastName}
                  />
                  <small
                    id="InputLastNameWarning"
                    className="hidden mt-1 text-xs text-red-600"
                  >
                    Please enter your last name
                  </small>
                </div>
              </div>
              <div className="form-group mb-6">
                <input
                  type="email"
                  className="form-control block input w-full border border-solid border-gray-300"
                  id="InputEmail"
                  placeholder="Email address"
                  value={email}
                  onChange={onChangeEmail}
                  onBlur={(e) => InputWarningHelper.onBlur(e)}
                />
                <small
                  id="InputEmailWarning"
                  className="hidden mt-1 text-xs text-red-600"
                >
                  Please enter your email address
                </small>
              </div>
              <div className="form-group mb-6">
                <input
                  type="text"
                  className="form-control block input w-full border border-solid border-gray-300"
                  id="InputUsername"
                  placeholder="User name"
                  value={username}
                  onChange={onChangeUserName}
                  onBlur={(e) => InputWarningHelper.onBlur(e)}
                />
                <small
                  id="InputUsernameWarning"
                  className="hidden mt-1 text-xs text-red-600"
                >
                  Please enter your username
                </small>
              </div>
              <div className="flex  mb-5">
                <div className="form-group mb-6">
                  <input
                    className="form-control input"
                    id="formFileSm"
                    type="file"
                    accept="image/*"
                    onChange={onChangeImage}
                  />
                </div>
                <div className="relative h-20 w-20 rounded-2xl">
                {image && (<Image src={image} layout="fill" className="rounded-2xl shadow-xl"/> )}
                </div>
              </div>
              <div className="form-group mb-6">
                <input
                  type="password"
                  className="form-control block input w-full border border-solid border-gray-300"
                  id="InputPassword"
                  placeholder="Password"
                  value={password}
                  onChange={onChangePassword}
                  onBlur={(e) => InputWarningHelper.onBlur(e)}
                />
                <small
                  id="InputPasswordWarning"
                  className="hidden mt-1 text-xs text-red-600"
                >
                  Please enter a password
                </small>
              </div>
              <div className="form-group mb-6">
                <input
                  type="password"
                  className="form-control block input w-full border border-solid border-gray-300"
                  id="InputPasswordConfirm"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  onBlur={onBlurConfirmPassword}
                  placeholder="Repeat Password"
                />
                <small
                  id="InputPasswordConfirmWarning"
                  className="hidden mt-1 text-xs text-red-600"
                >
                  Passwords must match
                </small>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Sign up
              </button>
            </form>
            <div className="text-center">
              <a
                className="link link-hover btn-link btn-md"
                onClick={() => router.push("/login")}
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Register;
