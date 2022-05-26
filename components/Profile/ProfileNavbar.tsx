import React, { useState, useContext } from "react";
import { signOut } from "firebase/auth";
import { AiOutlineLogout, AiOutlineProfile } from "react-icons/ai";
import UserContext from "../../context/UserContext";
import { auth } from "../../firebase/clientApp";
import LinkTo from "../general/LinkTo";

export default function ProfileNavbar() {
  const [show, setShow] = useState(false);
  const user = useContext(UserContext);

  return (
    <div onClick={() => setShow(!show)} className="relative">
      {show ? (
        <div className="w-48 absolute right-0 top-11 bg-gray-100 rounded border z-40">
          <div className="bg-gradient-to-r from-[#DEECFC] via-[#E1F2FB] to-[#F1F9F9] w-full py-2 px-3">
            <span className="text-black">{user?.displayName || "A ghost"}</span>
            <span className="text-sm line-clamp-1">{user?.email}</span>
          </div>
          <div className="flex flex-col items-end p-3 text-black">
            <LinkTo href="/profile">
              <button type="button" className="flex items-center gap-2">
                Profile
                <AiOutlineProfile />
              </button>
            </LinkTo>
            <button
              type="button"
              className="flex items-center gap-2"
              onClick={() => signOut(auth())}
            >
              Logout
              <AiOutlineLogout />
            </button>
          </div>
        </div>
      ) : null}
      {user?.displayName || user?.email}
    </div>
  );
}
