import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { AiOutlineMail } from "react-icons/ai";

import LoadingButton from "../general/LoadingButton";
import {auth} from "../../firebase/clientApp";
import GhostityIcon from "../../public/images/Ghostity-svg.svg";

export default function AuthForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
    auth()
  );

  const resetPassword = async () => {
    await sendPasswordResetEmail(email)

    if (error) return setMessage("Something went wrong...");
    
    return setMessage("Email sent! Check your inbox!");
  }


  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 bg-primary rounded-full p-4">
        <GhostityIcon />
      </div>
      <h1 className="text-xl">Forgot your password?</h1>
      <p className="text-sm text-center text-gray-600">
        No biggie! Just enter your email associated with ghostity!
      </p>
      <div className="flex items-center">
        <AiOutlineMail className="mt-3 mr-3" />
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
      {sending ? (
        <LoadingButton />
      ) : (
        <button
          type="button"
          className="bg-primary px-4 py-1 rounded"
          onClick={() => resetPassword()}
        >
          Reset password
        </button>
      )}
      <span className="text-sm">{message}</span>
    </div>
  );
}
