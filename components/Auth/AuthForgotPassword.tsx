// Libraries
import React, { useState, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { TextField } from "@mui/material";

// Icons
import { AiOutlineMail } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";

// Firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../services/Firebase";
// import { auth } from "../../firebase/ghostityDevFirebase";

// Components
import LoadingButton from "../General/LoadingButton";
import VGhostityIcon from "../../public/images/Ghostity-svg.svg";

export default function AuthForgotPassword({
  setCurrentTab,
}: {
  setCurrentTab: Dispatch<SetStateAction<string>>;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true)
    setError(false)
    setErrorMessage("");

    return sendPasswordResetEmail(auth, email)
      .then(() => setErrorMessage("Email sent! Check your inbox!"))
      .catch((err: FirebaseError) => {
        setError(true)

        if (err.code === "auth/user-not-found") {
          return setErrorMessage("No account associated with email!");
        }
        if (err.code === "auth/too-many-requests") {
          return setErrorMessage("Too many requests! Try again later!");
        }

        return setErrorMessage("Error");
      }).finally(() => setLoading(false));
  };

  return (
    <motion.form
      key="forgot"
      initial={{ translateX: 400, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: 400, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex-1 flex flex-col items-center gap-6 w-full"
      onSubmit={(e) => resetPassword(e)}
    >
      <button
        type="button"
        onClick={() => setCurrentTab("login")}
        className="dark:text-text-primary-dark self-start text-sm flex items-center underline decoration-1 underline-offset-2"
      >
        <BsArrowLeftShort className="text-lg" /> Go back
      </button>
      <div className="w-16 h-16 bg-primary rounded-full p-4">
        <VGhostityIcon />
      </div>
      <h1 className="text-xl dark:text-text-primary-dark">
        Forgot your password?
      </h1>
      <p className="text-sm text-center dark:text-text-secondary-dark text-gray-600">
        No biggie! Just enter your email associated with vGhostity!
      </p>
      <div className="flex items-center">
        <div className="mr-3 mt-2">
          <AiOutlineMail className="w-4 h-4 dark:text-primary" />
        </div>
        <TextField
          required
          type="email"
          label="Email"
          size="small"
          variant="standard"
          value={email}
          error={error}
          helperText={errorMessage}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {loading ? (
        <LoadingButton />
      ) : (
        <button type="submit" className="dark:bg-secondary-dark-2 dark:text-primary bg-primary px-4 py-1 rounded">
          Reset password
        </button>
      )}
    </motion.form>
  );
}
