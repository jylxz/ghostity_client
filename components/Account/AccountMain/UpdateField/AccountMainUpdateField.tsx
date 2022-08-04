import { TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

export default function AccountUpdateField({
  label,
  type,
  value,
  setValue,
  message,
  placeholder,
  autoComplete,
  error,
  disabled,
}: {
  label: string;
  type: "text" | "password" | "email";
  value?: string | null;
  setValue: Dispatch<SetStateAction<string>>;
  message?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: boolean;
  disabled?: boolean;
}) {
  return (
    <TextField
      sx={{
        "& .MuiInputLabel-root": { fontSize: "14px" },
        "& .MuiInputLabel-shrink": { fontSize: "18px" },
        "& .MuiInputLabel-shrink:active": { fontSize: "1200px" },
      }}
      autoComplete={autoComplete}
      type={type}
      label={label}
      error={error}
      disabled={disabled}
      size="small"
      variant="standard"
      className="flex-1"
      value={value}
      helperText={message}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      onFocus={(e) => {
        e.currentTarget.addEventListener("keydown", (event: KeyboardEvent) => {
          if (event.currentTarget && event.key === "Enter") {
            (event.currentTarget as HTMLIFrameElement).blur();
          }
        });
      }}
      onBlur={(e) => {
        e.currentTarget.removeEventListener(
          "keydown",
          (event: KeyboardEvent) => {
            if (event.currentTarget && event.key === "Enter") {
              (event.currentTarget as HTMLIFrameElement).blur();
            }
          }
        );
      }}
    />
  );
}
