import React, { useEffect, useState } from "react";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import { RiErrorWarningFill } from "react-icons/Ri";
import { auth } from "../../firebase/clientApp";

export default function ProfileResendVerification() {
  const [sendEmailVerification, sending, error] = useSendEmailVerification(
    auth()
  );
  const [showVerificationSent, setShowVerificationSent] = useState(false);

  const resendVerification = async () => {
    await sendEmailVerification();

    if (!error && !sending) {
      setShowVerificationSent(true);
    }
  };

  return (
    <div className="text-sm flex flex-col justify-center items-center gap-1">
      <div className="flex gap-3 items-center">
        <div>
          <RiErrorWarningFill size={24} />
        </div>
        <div className="flex flex-col">
          <span>
            Your account has not been verified. Editing your profile will be
            disabled until you are verified.{" "}
            <span>
              <button
                type="button"
                className="font-semibold"
                onClick={() => resendVerification()}
              >
                Resend Verification
              </button>
            </span>
          </span>
        </div>
      </div>
      {showVerificationSent ? (
        <span className="text-green-500 self-center">
          Email verification has been sent!
        </span>
      ) : null}
    </div>
  );
}
