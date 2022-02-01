import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InputWarningHelper from "../services/InputWarningHelper";
import { url } from "../constants/urls";
import { useRouter } from "next/router";

function login() {
  const router = new useRouter();
  const loginUrl = url + "login";
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = new URLSearchParams();
    user.append("email", email);
    user.append("password", password);
    try {
      let res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: "include",
        body: user.toString(),
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Header />
      <main className="h-screen">
        <div className="p-6 rounded-xl shadow-xl bg-white max-w-sm mx-auto ">
          <form onSubmit={onSubmit}>
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

            <button
              id="Login"
              type="submit"
              className=" btn btn-primary w-full"
            >
              Login
            </button>
          </form>
          <div className="text-center">
            <a
              className="link link-hover btn-link btn-md"
              onClick={() => {
                router.push({
                  pathname: "/register",
                  query: { role: "guest" },
                });
              }}
            >
              Create new account
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default login;
