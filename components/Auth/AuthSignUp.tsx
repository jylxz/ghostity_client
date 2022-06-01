import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Box, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/Ri";
import { AiOutlineMail } from "react-icons/ai";
import LoadingButton from "../general/LoadingButton";
import { auth } from "../../firebase/clientApp";
import GhostityIcon from "../../public/images/Ghostity-svg.svg";
import { motion } from "framer-motion";
import { BsArrowLeftShort } from "react-icons/bs";

export default function SignUp({
  setShowAuth,
  setCurrentTab,
}: {
  setShowAuth: Dispatch<SetStateAction<boolean>>;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth(), { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth());

  const createUser = async () => {
    if (
      email.length === 0 ||
      password.length === 0 ||
      passwordConfirm.length === 0
    )
      return setSignUpError("All required fields have not been filled!");

    if (password.length < 8)
      return setSignUpError("Password not at least 8 characters!");

    if (password !== passwordConfirm)
      return setSignUpError("Passwords does not match!");

    setSignUpError("");

    await createUserWithEmailAndPassword(email, password);

    if (error?.code === "auth/invalid-email")
      return setSignUpError("Invalid email!");

    if (error?.code === "auth/email-already-in-use")
      return setSignUpError("Account already created with email!");

    if (error) return setSignUpError("Error creating account!");

    setSignUpError("");
    await updateProfile({ displayName });

    return setShowAuth(false);
  };

  return (
    <motion.div
      key="signup"
      initial={{ translateX: 400, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: 400, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex-1 flex flex-col items-center gap-6 w-full"
    >
      <button
        type="button"
        onClick={() => setCurrentTab("login")}
        className="self-start text-sm flex items-center underline decoration-1 underline-offset-2"
      >
        <BsArrowLeftShort className="text-lg" />
        Go Back
      </button>
      <div className="w-16 h-16 bg-primary rounded-full p-4">
        <GhostityIcon />
      </div>
      <h1 className="text-xl">Create an account</h1>
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <CgProfile className="w-4 h-4 mr-3 mt-2" />
          <TextField
            type="text"
            label="Display name"
            size="small"
            variant="standard"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
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
          <RiLockPasswordLine className="w-4 h-4 mr-3 -mt-3" />
          <TextField
            required
            type="password"
            label="Password"
            size="small"
            variant="standard"
            value={password}
            helperText="Minimum 8 characters"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <RiLockPasswordFill className="w-4 h-4 mr-3 mt-2" />
          <TextField
            required
            type="password"
            label="Confirm Password"
            size="small"
            variant="standard"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
      </div>
      {signUpError}
      {loading ? (
        <LoadingButton />
      ) : (
        <button
          type="button"
          className="bg-primary w-20 py-1 rounded"
          onClick={() => createUser()}
        >
          Register
        </button>
      )}
    </motion.div>
  );
}
