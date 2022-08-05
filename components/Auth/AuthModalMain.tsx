// Libraries
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import Image from "next/image";
import { TextField } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

// Icons
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

// Firebase
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "services/Firebase";

// Components
import googleG from "@icons/Google.png";
import Ghostity from "@logo/Ghostity.svg";
import Modal from "../General/Modal";
import AuthForgotPassword from "./AuthForgotPassword";
import AuthSignUp from "./AuthSignUp";

export default function AuthModalMain({
  showAuth,
  setShowAuth,
}: {
  showAuth: boolean;
  setShowAuth: Dispatch<SetStateAction<boolean>>;
}) {
  const [currentTab, setCurrentTab] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, userGoogle, loadingGoogle] =
    useSignInWithGoogle(auth);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (user || userGoogle) setShowAuth(false);
  }, [setShowAuth, user, userGoogle]);

  return (
    <AnimatePresence>
      {showAuth ? (
        <Modal
          initial={{ translateY: "-200%" }}
          animate={{ translateY: 0 }}
          exit={{ translateY: "-200%" }}
          transition={{ duration: 0.5 }}
          className="min-w-[20rem] w-1/5 max-w-[26rem] h-[38rem] dark:bg-secondary-dark bg-slate-50 rounded flex flex-col items-center gap-4 py-8 px-6 overflow-x-hidden overflow-y-auto z-50 font-medium"
          onClick={() => setShowAuth(false)}
        >
          <button
            type="button"
            className="self-end px-1.5 dark:text-text-primary-dark"
            onClick={() => setShowAuth(false)}
          >
            X
          </button>
          <AnimatePresence exitBeforeEnter>
            {currentTab === "signup" ? (
              <AuthSignUp
                setShowAuth={setShowAuth}
                setCurrentTab={setCurrentTab}
              />
            ) : null}
            {currentTab === "forgot" ? (
              <AuthForgotPassword setCurrentTab={setCurrentTab} />
            ) : null}
            {currentTab === "login" ? (
              <motion.div
                key="login"
                initial={{ translateX: -400, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                exit={{ translateX: -400, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                  <div className="w-16 h-16 bg-primary rounded-full p-4">
                    <Ghostity />
                  </div>
                  <h1 className="text-xl dark:text-text-primary-dark">Sign in to vGhostity</h1>
                  <form
                    onSubmit={(e) => handleSignIn(e)}
                    className="flex flex-col gap-2 items-center"
                  >
                    <div className="flex items-center">
                      <AiOutlineMail className="w-4 h-4 mr-3 mt-3 dark:text-primary" />
                      <TextField
                        type="email"
                        label="Email"
                        size="small"
                        variant="standard"
                        autoComplete="username email"
                        value={email}
                        error={!!error}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center">
                      <RiLockPasswordLine className="w-4 h-4 mr-3 mt-3 dark:text-primary" />
                      <TextField
                        type="password"
                        label="Password"
                        size="small"
                        variant="standard"
                        autoComplete="current-password"
                        value={password}
                        error={!!error}
                        helperText={error ? "Invalid email/password" : null}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      {loading || loadingGoogle ? (
                        <button
                          disabled
                          type="button"
                          className="bg-primary py-1 rounded w-20"
                        >
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
                          type="submit"
                          className="dark:bg-secondary-dark-2 dark:text-primary bg-primary w-20 py-1 rounded"
                        >
                          Login
                        </button>
                      )}
                    </div>
                  </form>
                  <button
                    type="button"
                    onClick={() => setCurrentTab("forgot")}
                    className="text-sm text-gray-600 dark:text-text-secondary-dark"
                  >
                    Forgot your password?
                  </button>
                </div>
                <div className="relative w-full border mt-5 mb-4">
                  <div className="absolute -top-2.5 w-full px-2 text-sm mx-auto text-center">
                    <span className="bg-slate-50 dark:bg-secondary-dark dark:text-text-primary-dark px-2">or</span>
                  </div>
                </div>
                <div className="h-24 flex flex-col justify-center items-center gap-5">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 border px-4 py-1 rounded-lg"
                    onClick={async () => signInWithGoogle(["email", "profile"])}
                  >
                    <div className="max-w-[1.5rem] flex items-center justify-center">
                      <Image src={googleG} alt="Google G icon" />
                    </div>
                    <span className="text-gray-600 dark:text-text-primary-dark">Sign in with Google</span>
                  </button>
                  <div className="text-sm dark:text-text-secondary-dark text-gray-600">
                    New user?{" "}
                    <button
                      type="button"
                      className="font-semibold dark:text-text-primary-dark text-black"
                      onClick={() => setCurrentTab("signup")}
                    >
                      Create an account
                    </button>
                    .
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Modal>
      ) : null}
    </AnimatePresence>
  );
}
