import { HomeIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 shadow-md p-5 md:px-10">
      {/* Left */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 cursor-pointer my-auto text-gray-300"
      >
        <HomeIcon className="h-10"/>
        <p className="text-4xl font-bold select-none">Hatarent</p>
      </div>
      <div></div>
      <div></div>
    </header>
  );
}

export default Header;
