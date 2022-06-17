// Libraries
import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useUpdatePassword } from "react-firebase-hooks/auth";

// Icons
import { MdEdit } from "react-icons/md";
import { GoCheck } from "react-icons/go";

// Firebase
import { auth } from "../../firebase/clientApp";

// Context
import UserContext from "../../context/UserContext";

// Components
import ProfileUpdateField from "./ProfileUpdateField";

export default function ProfilePassword() {
  const user = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmMessage, setConfirmMessage] = useState(
    "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
  );
  const [confirmError, setConfirmError] = useState(false);

  const [updatePassword] = useUpdatePassword(auth());

  const validateCurrentPassword = async () => {
    setPasswordError(false);
    setPasswordMessage("");

    const { currentUser } = auth();

    if (currentUser && currentUser.email) {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );

      return reauthenticateWithCredential(currentUser, credential)
        .then(() => true)
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setPasswordError(true);
            setPasswordMessage("Wrong password");
            return false;
          }

          return false;
        });
    }

    return false;
  };

  const validatePassword = () => {
    setConfirmMessage("");
    setConfirmError(false);

    if (newPassword !== confirmNewPassword) {
      setConfirmMessage("Passwords do not match");
      setConfirmError(true);
      return false;
    }

    if (newPassword.length < 8) {
      setConfirmMessage("Password is not at least 8 or more characters");
      setConfirmError(true);
      return false;
    }

    if (newPassword.search(/[a-z]/) < 0) {
      setConfirmMessage("Password does not have a lowercase letter");
      setConfirmError(true);
      return false;
    }

    if (newPassword.search(/[A-Z]/) < 0) {
      setConfirmMessage("Password does not have a uppercase letter");
      setConfirmError(true);
      return false;
    }

    if (newPassword.search(/[0-9]/) < 0) {
      setConfirmMessage("Password does not have a number");
      setConfirmError(true);
      return false;
    }

    return true;
  };

  const handleCancel = () => {
    setEdit(false);
    setCurrentPassword("");
    setPasswordMessage("");
    setPasswordError(false);
    setNewPassword("");
    setConfirmNewPassword("");
    setConfirmMessage(
      "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    );
    setConfirmError(false);
  };

  const handleChange = async () => {
    setSuccessMessage("");

    if ((await validateCurrentPassword()) && validatePassword()) {
      return updatePassword(newPassword)
        .then(() => {
          setEdit(false);
          handleCancel();
          return setSuccessMessage("Successfully changed password!");
        })
        .catch(() => {
          setPasswordError(true);
          setPasswordMessage("Password change failed!");
        });
    }

    return setSuccessMessage("Password change failed!");
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
          <TextField
            type="password"
            value="password"
            label="Password"
            helperText={successMessage}
            size="small"
            variant="standard"
            className="flex-1"
            autoComplete="off"
            disabled
          />
          <button
            type="button"
            className="px-2"
            disabled={
              user?.providerData[0].providerId === "google.com" ||
              !user?.emailVerified
            }
            onClick={() => setEdit(true)}
          >
            <MdEdit size={20} color={disable ? "grey" : "black"} />
          </button>
        </>
      ) : (
        <>
          <input
            type="hidden"
            autoComplete="username email"
            defaultValue={user && user.email ? user?.email : undefined}
            hidden
          />
          <ProfileUpdateField
            label="Current Password"
            type="password"
            value={currentPassword}
            placeholder="Enter current password"
            setValue={setCurrentPassword}
            error={passwordError}
            message={passwordMessage}
            autoComplete="current-password"
          />
          <ProfileUpdateField
            label="New Password"
            type="password"
            value={newPassword}
            placeholder="Enter new password"
            setValue={setNewPassword}
            error={confirmError}
            message={confirmMessage}
            autoComplete="new-password"
          />
          <ProfileUpdateField
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            placeholder="Confirm new password"
            setValue={setConfirmNewPassword}
            error={confirmError}
            message=""
            autoComplete="new-password"
          />
          <div className="flex justify-end items-center gap-3">
            <button
              type="button"
              className="w-8"
              onClick={() => handleChange()}
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
