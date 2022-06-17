// Libraries
import React, { useContext, useEffect, useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

// Icons
import { MdEdit } from "react-icons/md";
import { GoCheck } from "react-icons/go";

// Firebase
import { auth } from "../../firebase/ghostityFirebase";
// import { auth } from "../../firebase/ghostityDevFirebase";

// Context
import UserContext from "../../context/UserContext";

// Components
import ProfileUpdateField from "./ProfileUpdateField";

export default function ProfileEmail() {
  const user = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);

  const [email, setEmail] = useState<string | null | undefined>(user?.email || user?.providerData[0].email || "");
  const [emailError, setEmailError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const handleUpdateUserEmail = async () => {
    setHelperText("");
    setPasswordHelperText("");
    setEmailError(false);
    setPasswordError(false);

    if (email?.length === 0) {
      setEmailError(true)
      return setHelperText("Email cannot be empty!");
    }

    if (password.length === 0) {
      setPasswordError(true)
      return setPasswordHelperText("Please enter your password")
    }

    if (user && user.emailVerified) {
      const { currentUser } = auth;

      if (currentUser && email && currentUser.email) {
        const hideEmail = () => {
          const splitEmail = email.split("@");
          const cryptEmail = email[0] + "*".repeat(splitEmail[0].length - 1);
          return `${cryptEmail}@${String(splitEmail[1])}`;
        };

        const credentials = EmailAuthProvider.credential(
          currentUser.email,
          password
        );

        return reauthenticateWithCredential(currentUser, credentials)
          .then(() =>
            verifyBeforeUpdateEmail(currentUser, email)
              .then(() => {
                setEdit(false);
                setEmail(user?.email);
                setPassword("");
                setHelperText(
                  `Email update verification sent to ${hideEmail()}!`
                );
              })
              .catch((err: FirebaseError) => {
                // console.log(err)

                setEmailError(true);
                if (err.code === "auth/email-already-in-use") {
                  return setHelperText("Email already in use!");
                }
                return setHelperText(
                  "Email cannot not be updated at this moment."
                );
              })
          )
          .catch((error: FirebaseError) => {
            // console.log(error)
            if (error.code === "auth/wrong-password") {
              setPasswordError(true);
              return setPasswordHelperText("Wrong password!");
            }

            return setHelperText("Email cannot not be updated at this moment.");
          });
      }
    }

    return setHelperText("Account has not been verified!");
  };

  const handleCancel = () => {
    setEdit(false);
    setEmail(user?.email);
    setHelperText("");
    setEmailError(false);
    setPassword("");
    setPasswordError(false);
  };

  useEffect(() => {
    setDisable(
      user?.providerData[0].providerId === "google.com" || !user?.emailVerified
    );
  }, [edit, user]);

  return (
    <form className={`flex-1 flex ${!edit ? "flex-row" : "flex-col"} gap-2`}>
      {!edit ? (
        <>
        <input
          type="hidden"
          autoComplete="username email"
          defaultValue={user && user.email ? user?.email : undefined}
          hidden
        />
          <ProfileUpdateField
            label="Email"
            type="email"
            autoComplete="username email"
            value={email}
            setValue={setEmail}
            message={helperText}
            disabled={!edit}
          />
          <button
            type="button"
            className="px-2"
            disabled={disable}
            onClick={() => {
              setEdit(true);
              setHelperText("");
            }}
          >
            <MdEdit size={20} color={disable ? "grey" : "black"} />
          </button>
        </>
      ) : (
        <>
          <ProfileUpdateField
            label="Email"
            type="email"
            autoComplete="username email"
            value={email}
            setValue={setEmail}
            message={helperText}
            error={emailError}
            disabled={!edit}
          />
          <ProfileUpdateField
            label="Current Password"
            type="password"
            autoComplete="current-password"
            value={password}
            setValue={setPassword}
            message={passwordHelperText}
            error={passwordError}
            disabled={!edit}
          />
          <div className="flex justify-end items-center gap-3">
            <button
              type="button"
              className="w-8"
              onClick={() => handleUpdateUserEmail()}
            >
              <GoCheck size={20} className="mx-auto" />
            </button>
            <button
              type="button"
              onClick={() => handleCancel()}
              className="font-bold w-8"
            >
              X
            </button>
          </div>
        </>
      )}
    </form>
  );
}
