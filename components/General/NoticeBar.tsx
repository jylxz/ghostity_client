import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import useLocalStorage from "../../hooks/useLocalStorage";
import LinkTo from "./LinkTo";

export default function NoticeBar() {
  const [notice, setNotice] = useLocalStorage("search-notice", {
    firstTime: true,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Remove previous notice key
    localStorage.removeItem("notice")
    
    if (notice && notice.firstTime) {
      setShow(true);
    }

    if (notice && !notice.firstTime) {
      setShow(false)
    }
  }, [notice, setNotice]);

  if (!show) return null;

  return (
    <div className="flex items-center justify-center dark:bg-secondary-dark bg-slate-100 px-4">
      <span className="dark:text-text-primary-dark text-sm py-2 flex-1 text-center">
        New Dark Mode and Search feature has been implemented! Check the search feature out {" "}
        <LinkTo href="/search" className="underline">
          here
        </LinkTo>
        !
      </span>
      <button
        type="button"
        className="justify-self-end"
        onClick={() => setNotice({ firstTime: false })}
      >
        <MdCancel className="dark:text-text-primary-dark" />
      </button>
    </div>
  );
}
