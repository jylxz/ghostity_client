// Libraries
import React, { useContext, useState, useEffect } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";

// Icons
import { MdEdit } from "react-icons/md";
import { GoCheck } from "react-icons/go";

// Contexts
import UserContext from "../../context/UserContext";

// Components
import ProfileUpdateField from "./ProfileUpdateField";

// Firebase
import { auth } from "../../firebase/clientApp";

export default function ProfileFields() {
  const user = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [helperText, setHelperText] = useState("");

  const [updateProfile] = useUpdateProfile(auth());

  const handleUpdateDisplayName = async () => {
    setHelperText("");

    if (displayName?.length === 0) {
      return setHelperText("Display name cannot be empty!");
    }

    if (user && user.emailVerified) {
      return updateProfile({ displayName })
        .then(() => {
          setEdit(false);
          setHelperText("Display name successfully updated!");
        })
        .catch(() =>
          setHelperText("Display name cannot be updated at this moment.")
        );
    }

    return setHelperText("Account has not been verified");
  };

  const handleCancel = () => {
    setEdit(false);
    setDisplayName(user?.displayName);
    setHelperText("");
  };

  useEffect(() => {
    setDisable(
      user?.providerData[0].providerId === "google.com" || !user?.emailVerified
    );
  }, [edit, user]);

  return (
    <form className={`flex-1 flex ${!edit ? "flex-row" : "flex-col"} gap-2`}>
      <ProfileUpdateField
        label="Display Name"
        type="text"
        value={displayName}
        setValue={setDisplayName}
        message={helperText}
        disabled={!edit}
      />
      {!edit ? (
        <button
          type="button"
          className="px-2"
          disabled={disable}
          onClick={() => setEdit(true)}
        >
          <MdEdit size={20} color={disable ? "grey" : "black"} />
        </button>
      ) : (
        <div className="flex justify-end items-center gap-3">
          <button
            type="button"
            className="w-8"
            onClick={() => handleUpdateDisplayName()}
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
      )}
    </form>
  );
}
