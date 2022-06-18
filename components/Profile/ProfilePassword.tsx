// Libraries
import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useUpdatePassword } from "react-firebase-hooks/auth";

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

export default function ProfilePassword() {
  const user = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordMessage, setCurrentPasswordMessage] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordMessage, setNewPasswordMessage] = useState(
    "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
  );
  const [newPasswordError, setNewPasswordError] = useState(false);

  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [updatePassword] = useUpdatePassword(auth);

  const validateCurrentPassword = async () => {
    setCurrentPasswordError(false);
    setCurrentPasswordMessage("");

    const { currentUser } = auth;

    if (currentUser && currentUser.email) {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );

      return reauthenticateWithCredential(currentUser, credential)
        .then(() => true)
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setCurrentPasswordError(true);
            setCurrentPasswordMessage("Wrong password");
            return false;
          }

          return false;
        });
    }

    return false;
  };

  useEffect(() => {});

  const validatePassword = () => {
    setCurrentPasswordError(false);
    setCurrentPasswordMessage("");

    setNewPasswordError(false);
    setNewPasswordMessage("");

    if (currentPassword.length === 0) {
      setCurrentPasswordError(true);
      setCurrentPasswordMessage("Please enter your current password");
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      setNewPasswordMessage("Passwords do not match");
      setNewPasswordError(true);
      return false;
    }

    if (newPassword.length < 8) {
      setNewPasswordMessage("Password is not at least 8 or more characters");
      setNewPasswordError(true);
      return false;
    }

    if (newPassword.search(/[a-z]/) < 0) {
      setNewPasswordMessage("Password does not have a lowercase letter");
      setNewPasswordError(true);
      return false;
    }

    if (newPassword.search(/[A-Z]/) < 0) {
      setNewPasswordMessage("Password does not have a uppercase letter");
      setNewPasswordError(true);
      return false;
    }

    if (newPassword.search(/[0-9]/) < 0) {
      setNewPasswordMessage("Password does not have a number");
      setNewPasswordError(true);
      return false;
    }

    return true;
  };

  const handleCancel = () => {
    setEdit(false);

    setCurrentPassword("");
    setCurrentPasswordMessage("");
    setCurrentPasswordError(false);

    setNewPassword("");
    setNewPasswordMessage(
      "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    );
    setNewPasswordError(false);

    setConfirmNewPassword("");
  };

  const handleChange = async () => {
    setCurrentPasswordMessage("");

    if (validatePassword() && (await validateCurrentPassword())) {
      return updatePassword(newPassword)
        .then(() => {
          setEdit(false);
          handleCancel();
          return setCurrentPasswordMessage("Successfully changed password!");
        })
        .catch(() => {
          setCurrentPasswordError(true);
          return setCurrentPasswordMessage("Password change failed!");
        });
    }
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
            helperText={currentPasswordMessage}
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
            error={currentPasswordError}
            message={currentPasswordMessage}
            autoComplete="current-password"
          />
          <ProfileUpdateField
            label="New Password"
            type="password"
            value={newPassword}
            placeholder="Enter new password"
            setValue={setNewPassword}
            error={newPasswordError}
            message={newPasswordMessage}
            autoComplete="new-password"
          />
          <ProfileUpdateField
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            placeholder="Confirm new password"
            setValue={setConfirmNewPassword}
            error={newPasswordError}
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
