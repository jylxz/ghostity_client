import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function NoticeBar() {
  const [notice, setNotice] = useLocalStorage("notice", {
    firstTime: true,
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
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
        Regarding YouTube channels not showing up! Please check the{" "}
        <a href="https://ghostity.statuspage.io/" target="_blank" rel="noopener noreferrer" className="underline">
          status page
        </a>{" "}
        for more info!{" "}
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
