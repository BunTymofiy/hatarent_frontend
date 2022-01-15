import Footer from "../components/Footer";
import Header from "../components/Header";

function register() {
  return (
    <div>
      <Header />
      <main className="h-screen">
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto">
          <form>
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group mb-6">
                <input
                  type="text"
                  class="form-control input w-full border border-solid border-gray-300"
                  id="exampleInput123"
                  placeholder="First name"
                />
              </div>
              <div class="form-group mb-6">
                <input
                  type="text"
                  class="form-control input w-full border border-solid border-gray-300"
                  id="exampleInput124"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div class="form-group mb-6">
              <input
                type="email"
                class="form-control block input w-full border border-solid border-gray-300"
                id="exampleInput125"
                placeholder="Email address"
              />
            </div>
            <div class="form-group mb-6">
              <input
                type="email"
                class="form-control block input w-full border border-solid border-gray-300"
                id="exampleInput125"
                placeholder="User name"
              />
            </div>
            <div class="form-group mb-6">
              <input
                class="form-control input
   "
                id="formFileSm"
                type="file"
              />
            </div>
            <div class="form-group mb-6">
              <input
                type="password"
                class="form-control block input w-full border border-solid border-gray-300"
                id="exampleInput126"
                placeholder="Password"
              />
            </div>
            <div class="form-group mb-6">
              <input
                type="password"
                class="form-control block input w-full border border-solid border-gray-300"
                id="exampleInput126"
                placeholder="Repeat Password"
              />
            </div>
            <button type="submit" class="btn btn-primary w-full">
              Sign up
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default register;
