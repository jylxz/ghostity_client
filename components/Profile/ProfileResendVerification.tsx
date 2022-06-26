import React, { useState } from "react";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import { RiErrorWarningFill } from "react-icons/ri";
import { auth } from "../../firebase/ghostityFirebase";
// import { auth } from "../../firebase/ghostityDevFirebase";

export default function ProfileResendVerification() {
  const [sendEmailVerification] = useSendEmailVerification(auth);
  const [showVerificationSent, setShowVerificationSent] = useState(false);

  const resendVerification = async () =>
    sendEmailVerification()
      .then(() => setShowVerificationSent(true))
      .catch(() =>
        // console.log(error)
        // console.log(err)
        setShowVerificationSent(false)
      );

  return (
    <div className="text-sm flex flex-col justify-center items-center gap-3">
      <div className="flex gap-3 items-center">
        <div>
          <RiErrorWarningFill size={24} />
        </div>
        <p className="max-w-[75ch]">
          Your account has not been verified. Editing your profile and account
          will be disabled until you are verified.{" "}
          <span>
            <button
              type="button"
              className="font-semibold"
              onClick={() => resendVerification()}
            >
              Resend Verification
            </button>
          </span>
        </p>
      </div>
      {showVerificationSent ? (
        <span className="text-green-500 self-center">
          Email verification has been sent!
        </span>
      ) : null}
    </div>
  );
}
