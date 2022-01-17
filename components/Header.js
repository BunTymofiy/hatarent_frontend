import { HomeIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  return (
    <header className="top-0 z-50 grid grid-cols-2 shadow-md p-3 md:px-3
    navbar mb-2 text-neutral-content rounded-box">
      {/* Left */}
      <div
        onClick={() => router.push("/")}
        className="relative items-center h-10 cursor-pointer content-center my-auto text-gray-100
        flex-none px-2 mx-2"
      >
        <HomeIcon className="h-9 flex-none justify-left"/>
        <p className="text-3xl font-bold select-none justify-left ml-2 mr-4">Hatarent</p>
      
    <div class="items-stretch lg:flex justify-between">
      <a class="btn btn-ghost rounded-btn hover:bg-blue-800 w-1/3">
              Calendar
            </a> 
      <a class="btn btn-ghost rounded-btn hover:bg-blue-900 w-1/3">
              Properties
            </a> 
      <a class="btn btn-ghost rounded-btn hover:bg-blue-900 w-1/3">
              Notifications
            </a>
    </div>

  </div>

  <div class="flex-none justify-end">
    <button class="btn transition-colors duration-150 border border-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-00 bg-blue-500 hover:text-blue-500 text-blue-100">
      <a>SIGN OUT</a>
    </button>
    <div class="avatar">
      <div class="rounded-full w-10 h-10 m-1 mx-4">
        <img src="https://media.discordapp.net/attachments/783168555591794708/930486752316129371/Yohho.jpg?width=885&height=590"></img>
      </div>
    </div>
  </div>
    </header>
  );
}

export default Header;
