// Libraries
import React, { useContext, useState, useEffect } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";

// Services
import { auth } from "services/Firebase";

// Icons
import { MdEdit } from "react-icons/md";
import { GoCheck } from "react-icons/go";
import { CgProfile } from "react-icons/cg";

// Contexts
import UserContext from "contexts/UserContext";

// Components
import AccountMainUpdateField from "../UpdateField/AccountMainUpdateField";


export default function AccountMainDisplayName() {
  const user = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [disable, setDisable] = useState(true);

  const [displayName, setDisplayName] = useState(user?.displayName);
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  const [updateProfile] = useUpdateProfile(auth);

  const handleUpdateDisplayName = async () => {
    setError(false);
    setHelperText("");

    if (displayName?.length === 0) {
      setError(true);
      return setHelperText("Display name cannot be empty!");
    }

    if (
      user &&
      (user.emailVerified || user.providerData[0].providerId === "google.com")
    ) {
      return updateProfile({ displayName })
        .then(() => {
          setEdit(false);
          setHelperText("Display name successfully updated!");
        })
        .catch(() => {
          setError(true);
          setHelperText("Display name cannot be updated at this moment.");
        });
    }

    setError(true);
    return setHelperText("Account has not been verified");
  };

  const handleCancel = () => {
    setEdit(false);
    setDisplayName(user?.displayName);
    setHelperText("");
  };

  useEffect(() => {
    setDisable(
      !user?.emailVerified && user?.providerData[0].providerId !== "google.com"
    );
  }, [user]);

  return (
    <form className={`flex-1 flex ${!edit ? "flex-row" : "flex-col"} gap-2`}>
      <div className="flex-1 flex">
        <div className="mr-3 mt-5">
          <CgProfile className="w-4 h-4 dark:text-primary" />
        </div>
        <AccountMainUpdateField
          label="Display Name"
          type="text"
          value={displayName}
          setValue={setDisplayName}
          error={error}
          message={helperText}
          disabled={!edit}
        />
      </div>
      {!edit ? (
        <button
          type="button"
          className="px-2"
          disabled={disable}
          onClick={() => {
            setEdit(true);
            setHelperText("");
          }}
        >
          <MdEdit
            size={20}
            className={`${
              disable
                ? "text-text-secondary-dark"
                : "text-black dark:text-primary"
            }`}
          />
        </button>
      ) : (
        <div className="dark:text-primary flex justify-end items-center gap-3 mt-2">
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
