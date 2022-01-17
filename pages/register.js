import axios from "axios";
import { useState,SyntheticEvent } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InputWarningHelper from "../services/InputWarningHelper";
import { url } from '../constants/urls'


function Register() {
  const postGuestUrl = url + "user/register/guest"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    axios.post(postGuestUrl)
    if (
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      passwordMatch
    ) {
      console.log("Form submitted");
    } else {
      console.log("Form not submitted");
    }
  };
  return (
    <div>
      <Header />
      <main className="h-screen">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto">
          <form onSubmit={onSubmit}>
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
            <div className="form-group mb-6">
              <input
                className="form-control input"
                id="formFileSm"
                type="file"
              />
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
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Register;
