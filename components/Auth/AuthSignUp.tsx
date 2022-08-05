// Libraries
import React, { Dispatch, SetStateAction, useState } from "react";
import { TextField } from "@mui/material";
import { motion } from "framer-motion";

// Icons
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import Ghostity from "@logo/Ghostity.svg";

// Firebase
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../services/Firebase";
// import { auth } from "../../firebase/ghostityDevFirebase";

// Hooks
import useValidatePassword from "../../hooks/useValidatePassword/useValidatePassword";

// Components
import LoadingButton from "../General/LoadingButton";

export default function AuthSignUp({
  setShowAuth,
  setCurrentTab,
}: {
  setShowAuth: Dispatch<SetStateAction<boolean>>;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}) {
  const [updateProfile] = useUpdateProfile(auth);
  const [loading, setLoading] = useState(false);

  const [displayName, setDisplayName] = useState("");

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validatePassword, valid, validateError] = useValidatePassword(
    password,
    passwordConfirm
  );

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (
      email.length === 0 ||
      password.length === 0 ||
      passwordConfirm.length === 0
    )
      return setEmailError("All required fields have not been filled!");

    if (validatePassword()) {
      return createUserWithEmailAndPassword(auth, email, password)
        .then(async (user) => {
          setEmailError("");

          await sendEmailVerification(user.user)
          await updateProfile({
            displayName: displayName || "An Exploring Ghost",
            photoURL:
              "https://res.cloudinary.com/ghostity/image/upload/v1655922625/alt-profile-icons/ghostity-pfp-primary_jg3evf.png",
          });

          return setShowAuth(false);
        })
        .catch((err: FirebaseError) => {
          if (err?.code === "auth/invalid-email") {
            setEmailValid(false);
            return setEmailError("Invalid email!");
          }

          if (err?.code === "auth/email-already-in-use") {
            setEmailValid(false);
            return setEmailError("Account already created with email!");
          }

          setEmailValid(false);
          return setEmailError("Error creating account!");
        })
        .finally(() => setLoading(false));
    }
    return setLoading(false)
    // return setEmailError(validateError);
  };

  return (
    <motion.form
      key="signup"
      initial={{ translateX: 400, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: 400, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex-1 flex flex-col items-center gap-6 w-full "
      onSubmit={(e) => createUser(e)}
    >
      <button
        type="button"
        onClick={() => setCurrentTab("login")}
        className="dark:text-text-primary-dark self-start text-sm flex items-center underline decoration-1 underline-offset-2"
      >
        <BsArrowLeftShort className="text-lg" />
        Go Back
      </button>
      <div className="w-16 h-16 bg-primary rounded-full p-4">
        <Ghostity />
      </div>
      <h1 className="text-xl dark:text-text-primary-dark">Create an account</h1>
      <div className="flex flex-col gap-2 mx-8">
        <div className="flex items-center">
          <div className="mr-3 mt-2">
            <CgProfile className="w-4 h-4 dark:text-primary" />
          </div>
          <TextField
            type="text"
            label="Display name"
            size="small"
            variant="standard"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="flex items-center">
          <div className="mr-3 mt-3">
            <AiOutlineMail className="w-4 h-4 dark:text-primary" />
          </div>
          <TextField
            required
            type="email"
            label="Email"
            size="small"
            variant="standard"
            autoComplete="username email"
            value={email}
            error={!emailValid}
            helperText={emailError}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="flex">
          <div className="mt-5 mr-3">
            <RiLockPasswordLine className="w-4 h-4 dark:text-primary" />
          </div>
          <TextField
            required
            type="password"
            label="Password"
            size="small"
            variant="standard"
            autoComplete="new-password"
            error={!valid}
            value={password}
            helperText={validateError}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="flex items-center">
          <div className="mr-3 mt-2">
            <RiLockPasswordFill className="w-4 h-4 dark:text-primary" />
          </div>
          <TextField
            required
            type="password"
            label="Confirm Password"
            size="small"
            variant="standard"
            autoComplete="new-password"
            error={!valid}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>
      {loading ? (
        <LoadingButton />
      ) : (
        <button type="submit" className="dark:bg-secondary-dark-2 dark:text-primary bg-primary w-20 py-1 rounded">
          Register
        </button>
      )}
    </motion.form>
  );
}
