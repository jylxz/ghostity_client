/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import Image from "next/image";
import { Box, TextField } from "@mui/material";
import { RiLockPasswordLine } from "react-icons/Ri";
import { AiOutlineMail } from "react-icons/ai";
import {auth} from "../../firebase/clientApp";
import GhostityIcon from "../../public/images/Ghostity-svg.svg";
import googleG from "../../public/images/googleG.png";
import SignUp from "./AuthSignUp";
import AuthForgotPassword from "./AuthForgotPassword";

export default function AuthMain({
  showAuth,
  setShowAuth,
}: {
  showAuth: boolean;
  setShowAuth: Dispatch<SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth());
  const [signInWithGoogle, userGoogle, loadingGoogle] = useSignInWithGoogle(
    auth()
  );

  const handleKeyDown = (key: string) => {
    if (key === "Escape") return setShowAuth(false);

    if (key === "Enter") return null;
  };

  useEffect(() => {
    if (user || userGoogle) setShowAuth(false);
  }, [setShowAuth, user, userGoogle]);

  return (
    <div
      role="menu"
      tabIndex={0}
      className="fixed bg-gray-600/[.6] top-0 w-full h-full flex justify-center items-center z-50 "
      onClick={() => setShowAuth(false)}
      // onKeyDown={(e) => handleKeyDown(e.key)}
    >
      <Box
        component="form"
        className="min-w-[24rem] w-1/4 max-w-[26rem] max-h-[40rem] h-4/5 bg-slate-50 rounded flex flex-col items-center gap-4 py-4 px-6 overflow-auto"
        onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
      >
        <button
          type="button"
          className="self-end px-1.5"
          onClick={() => setShowAuth(false)}
        >
          X
        </button>
        <SignUp setShowAuth={setShowAuth} />
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-16 bg-primary rounded-full p-4">
            <GhostityIcon />
          </div>
          <h1 className="text-xl">Sign in to ghostity</h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <AiOutlineMail className="w-4 h-4 mr-3 mt-3" />
              <TextField
                required
                type="email"
                label="Email"
                size="small"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <RiLockPasswordLine className="w-4 h-4 mr-3 mt-3" />
              <TextField
                required
                type="password"
                label="Password"
                size="small"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error ? (
              <span className="text-sm text-red-400 text-center">
                Invalid email/password!
              </span>
            ) : null}
          </div>
          <div className="my-3">
            {loading || loadingGoogle ? (
              <button type="button" className="bg-primary py-1 rounded w-20">
                <svg
                  role="status"
                  className="w-6 h-6 mx-auto text-white animate-spin dark:text-gray-600 fill-primary"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                className="bg-primary w-20 py-1 rounded"
                onClick={() => signInWithEmailAndPassword(email, password)}
              >
                Login
              </button>
            )}
          </div>
          <span className="text-sm text-gray-600">Forgot your password?</span>
        </div>
        <div className="relative w-full border">
          <div className="absolute -top-2.5 w-full px-2 text-sm mx-auto text-center">
            <span className="bg-slate-50 px-2">or</span>
          </div>
        </div>
        <div className="h-24 flex flex-col justify-center items-center gap-5">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border px-4 py-1 rounded-lg"
            onClick={() => signInWithGoogle()}
          >
            <div className="max-w-[1.5rem] flex items-center justify-center">
              <Image src={googleG} alt="Google G icon" />
            </div>
            <span className="text-gray-600">Sign in with Google</span>
          </button>
          <div className="text-sm text-gray-600">
            New user?{" "}
            <span className="font-semibold text-black">Create an account</span>.
          </div>
        </div>
        <AuthForgotPassword />
      </Box>
    </div>
  );
}
