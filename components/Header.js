import { GlobeAltIcon, HomeIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import AuthService from "../services/AuthService";
import { UserCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";

function Header(props) {
  let headerSpan = 2;
  const router = useRouter();
  let user = props?.user;
  const logoutHandler = async () => {
    try {
      await AuthService.logout();
      router.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const userImage = () => {
    if (user?.image === null) {
      return (
      <div className="dropdown relative h-12 w-12 mr-5 rounded-2xl dropdown-end">
          <UserCircleIcon
            className="h-12 btn-ghost text-gray-300 cursor-pointer hover:scale-105"
            tabindex="0"
          />
          
          <ul
            tabindex="0"
            class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Account Information</a>
            </li>

            <li>
              <a onClick={logoutHandler}>Sign Out</a>
            </li>
          </ul>
        </div>)
    } else {
      return (
        <div className="dropdown relative h-12 w-12 mr-5 rounded-2xl dropdown-end">
          <Image
            src={user?.image}
            layout="fill"
            alt="user"
            className="rounded-full btn mb-1 hover:scale-105"
            tabindex="0"
          />
          ;
          <ul
            tabindex="0"
            class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Account Information</a>
            </li>

            <li>
              <a onClick={logoutHandler}>Sign Out</a>
            </li>
          </ul>
        </div>
      );
    }
  };
  if (user !== undefined && user !== null) {
    let roles = [];
    document.getElementById("hd").classList.remove("grid-cols-3");
    document.getElementById("hd").classList.add("grid-cols-2");
    for (let i = 0; i < user.roles.length; i++) {
      roles.push(user.roles[i].name);
    }
    if (roles.indexOf("ROLE_HOST") > -1) {
      console.log("woohoo you are a host");
      // return (
      //   <div id="" className="items-stretch lg:flex justify-between hidden">
      //     <a className="btn btn-ghost rounded-btn hover:bg-blue-800 w-1/3">
      //       Calendar
      //     </a>
      //     <a className="btn btn-ghost rounded-btn hover:bg-blue-900 w-1/3">
      //       Properties
      //     </a>
      //     <a className="btn btn-ghost rounded-btn hover:bg-blue-900 w-1/3">
      //       Notifications
      //     </a>
      //   </div>
      // );
    }
    if (roles.indexOf("ROLE_GUEST") > -1) {
      console.log("woohoo you are a guest");
    }
  }
  return (
    <header
      id="hd"
      className="top-0 z-50 grid grid-cols-2 shadow-md p-3 md:px-3 navbar mb-2 text-neutral-content rounded-box"
    >
      {/* Left */}
      <div
        className="relative items-center h-10  content-center my-auto text-gray-100
        flex-none px-2 mx-2 "
      >
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer flex hover:scale-105"
        >
          <HomeIcon className="h-9 flex-none justify-start  " />
          <p className="text-3xl font-bold select-none justify-left ml-2 mr-4">
            Hatarent
          </p>
        </div>
      </div>
      {/* Middle */}

      {/* Right */}
      <div className="flex items-center space-x-4 justify-end text-gray-800">
        {!user && (
          <div className="relative flex  items-center align-middle">
            <div
              onClick={() => {
                router.push({
                  pathname: "/register",
                  query: { role: "host" },
                });
              }}
              className="flex mr-5 cursor-pointer hover:scale-105"
            >
              <p className="hidden md:inline  text-white">Become a host</p>
              <GlobeAltIcon className="h-6  text-white" />
            </div>
            <button
              className="btn btn-ghost text-white hover:scale-105 active:bg-blue-800"
              onClick={() => router.push("/login")}
            >
              Sign In
            </button>
          </div>
        )}
        {user && userImage()}
      </div>
    </header>
  );
}

export default Header;
