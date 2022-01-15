import Footer from "../components/Footer";
import Header from "../components/Header";

function login() {
  return (
    <div>
      <Header />
      <main className="h-screen">
        <div className="p-6 rounded-xl shadow-xl bg-white max-w-sm mx-auto ">
          <form>
            <div className="form-group mb-6">
              <label
                for="exampleInputEmail1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control input w-full border border-solid border-gray-300"
                id="exampleInputEmail1"
                placeholder="Enter email"
              />
              <small
                id="emailHelp"
                className="block mt-1 text-xs text-gray-600"
              >
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group mb-6">
              <label
                for="exampleInputPassword1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control input w-full border border-solid border-gray-300"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className=" btn btn-primary w-full"
            >
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
