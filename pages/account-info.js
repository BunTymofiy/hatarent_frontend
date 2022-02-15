import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AuthService from "../services/AuthService";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/outline";

function AccountInfo() {
  const router = new useRouter();
  const [pathname, setPathname] = useState(null);
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  let avatar = null;

  useEffect(async () => {
    setIsMounted(true);
  }, []);
  useEffect(async () => {
    if (isMounted == true) {
      try {
        let userFound = await AuthService.getUser();
        setUser(userFound.data);
      } catch (e) {
        router.push("/login");
      }
    }
  }, [isMounted]);

  const userData = () => {
    if (user != null) {
      <div>
        {user.firstName} {user.lastName}
      </div>;
    }
  };

  if (user !== null) {
    if (user.image != null) {
      avatar = (
        <div className="relative h-44 w-52  ">
          <Image
            src={user.image}
            objectFit="cover"
            layout="fill"
            alt="user"
            className="rounded-full"
          />
        </div>
      );
    } else {
      avatar = (
        <div className="relative">
          <UserCircleIcon size="large" className="rounded-full" />
        </div>
      );
    }
  }
  return (
    <div className="h-screen">
      <Header user={user} />
      <main>
        <div className="card ">
          <div className="flex items-center px-4 py-10 bg-cover card">
            <div className="card glass lg:card-side text-neutral-content">
              <div className="h-80 w-64">
                <figure className="px-10 relative pt-10  h-52 w-72">
                  {avatar}
                  <div className="justify-center card-actions">
                    {/* <button className="btn btn-outline btn-accent">
                      Update Info
                    </button> */}
                  </div>
                </figure>
              </div>
              <div className="card-body flex flex-col">
                <div className="flex flex-col flex-grow justify-center">
                  <h2 className="card-title">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <h2 className="">{user?.email}</h2>
                  <h2 className="">{user?.username}</h2>
                </div>
                <div className="flex flex-col flex-grow"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AccountInfo;
