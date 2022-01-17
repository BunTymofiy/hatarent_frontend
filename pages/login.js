import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import InputWarningHelper from "../services/InputWarningHelper";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangeEmail = (e) => {
    InputWarningHelper.onChange(e);
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    InputWarningHelper.onChange(e);
    setPassword(e.target.value);
  };
  
  return (
    <div>
      <Header />
      <main className="h-screen">
        <div className="p-6 rounded-xl shadow-xl bg-white max-w-sm mx-auto ">
          <form>
            <div className="form-group mb-6">
              <label
                htmlFor="InputEmail"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={onChangeEmail}
                onBlur={(e) => InputWarningHelper.onBlur(e)}
                className="form-control input w-full border border-solid border-gray-300"
                id="InputEmail"
                placeholder="Enter email"
              />
              <small
                id="InputEmailWarning"
                className="hidden mt-1 text-xs text-red-600"
              >
                Please enter your email address
              </small>
              <small
                id="EmailHelp"
                className="block mt-1 text-xs text-gray-600"
              >
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="InputPassword"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={onChangePassword}
                onBlur={(e) => InputWarningHelper.onBlur(e)}
                className="form-control input w-full border border-solid border-gray-300"
                id="InputPassword"
                placeholder="Password"
              />
              <small
                id="InputPasswordWarning"
                className="hidden mt-1 text-xs text-red-600"
              >
                Please enter your password
              </small>
            </div>

            <button type="submit" className=" btn btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default login;
