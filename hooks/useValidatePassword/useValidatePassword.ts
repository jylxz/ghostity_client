import { useState } from "react";

export default function useValidatePassword(
  password: string,
  confirmPassword: string
) {
  const [valid, setValid] = useState<boolean>(true);
  const [validateError, setValidateError] = useState(
    "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
  );

  const validatePassword = () => {
    setValidateError("");

    if (password !== confirmPassword) {
      setValidateError("Passwords do not match");
      setValid(false);
      return false;
    }
    if (password.length < 8) {
      setValidateError("Password is not at least 8 or more characters");
      setValid(false);
      return false;
    }
    if (password.search(/[a-z]/) < 0) {
      setValidateError("Password does not have a lowercase letter");
      setValid(false);
      return false;
    }
    if (password.search(/[A-Z]/) < 0) {
      setValidateError("Password does not have a uppercase letter");
      setValid(false);
      return false;
    }
    if (password.search(/[0-9]/) < 0) {
      setValidateError("Password does not have a number");
      setValid(false);
      return false;
    }
    setValid(true);
    return true;
  };

  return [validatePassword, valid, validateError] as const;
}
