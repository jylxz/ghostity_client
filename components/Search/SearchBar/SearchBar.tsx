import TextField from "@mui/material/TextField";
import React, { useContext, useEffect, useMemo, useRef } from "react";
import { InputAdornment } from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import { motion } from "framer-motion";
import ThemeContext from "contexts/ThemeContext";
import GradientCircularProgress from "components/General/GradientCircularProgress";
import Ghostity from "../../../public/assets/logo/Ghostity.svg";
import GhostityWhite from "../../../public/assets/logo/GhostityWhite.svg";

export default function SearchBar({
  input,
  setInput,
  compact,
  loading,
  width,
}: {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  compact: boolean;
  loading: boolean;
  width: number | undefined;
}) {
  const theme = useContext(ThemeContext);
  const ref = useRef<HTMLInputElement>(null);

  const fontSize = useMemo(() => {
    if (width) {
      if (width < 640) return "1.5rem";

      if (width > 640 && width < 1024) return "2rem";

      if (width > 1024) return "3.5rem";
    }

    return "2rem";
  }, [width]);

  const compactFontSize = useMemo(() => {
    if (width) {
      if (width < 640) return "1.25rem";

      if (width > 640 && width < 1024) return "1.75rem";

      if (width > 1024) return "2rem";
    }

    return "2rem";
  }, [width]);

  useEffect(() => {
    if (loading) {
      ref.current?.blur();
    }
  }, [loading]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <motion.div
      layout="size"
      className={`${compact ? "flex gap-5" : ""}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1.2,
        },
      }}
    >
      <motion.div
        layout="position"
        className="flex flex-col gap-2 items-center justify-center"
      >
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.8,
            },
          }}
          className={`${
            !compact ? "w-28 h-28 p-6" : "w-12 h-12 p-3"
          }  rounded-full bg-primary dark:bg-secondary-dark`}
        >
          {theme === "light" ? <Ghostity /> : <GhostityWhite />}
        </motion.div>
        {!compact ? (
          <h2 className="dark:text-text-primary-dark text-xl">
            Search vGhostity
          </h2>
        ) : null}
      </motion.div>
      <motion.div
        layout
        className={`${
          compact ? "flex-1" : "mt-6"
        } flex justify-center items-center `}
      >
        <TextField
          sx={{
            width: "100%",
            "& .MuiInput-input": {
              fontSize: !compact ? fontSize : compactFontSize,
              textAlign: !compact ? "center" : "start",
              padding: compact ? "0 0 0 8px" : "",
            },
          }}
          className="lg:text-xl"
          size="small"
          variant="standard"
          autoComplete="off"
          value={input}
          placeholder="Enter 3 or more characters"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              ref.current?.blur();
            }
          }}
          InputProps={
            compact
              ? {
                  startAdornment: (
                    <InputAdornment position="end">
                      <BiSearchAlt size={!compact ? 30 : 20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      {loading ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <GradientCircularProgress size="1.5rem" />
                        </motion.div>
                      ) : (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => {
                            setInput("");

                            if (ref.current) {
                              ref.current.focus();
                            }
                          }}
                        >
                          <MdClear size={20} />
                        </motion.button>
                      )}
                    </InputAdornment>
                  ),
                  inputRef: ref,
                }
              : {
                  inputRef: ref,
                }
          }
          onChange={(e) => setInput(e.target.value)}
        />
      </motion.div>
    </motion.div>
  );
}
