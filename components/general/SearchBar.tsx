import React, { Dispatch, SetStateAction } from "react";

function SearchBar({
  placeholder = "Search",
  showBrowseBar,
  setShowBrowseBar,
}: {
  placeholder?: string;
  showBrowseBar: { user: boolean; show: boolean };
  setShowBrowseBar: Dispatch<
    SetStateAction<{
      user: boolean;
      show: boolean;
    }>
  >;
}) {
  return (
    <div className="bg-slate-100 w-full h-14 px-7 flex justify-end items-center">
      {!showBrowseBar.show ? (
        <div className="flex-1">
          <button
            type="button"
            onClick={() => setShowBrowseBar({user: !showBrowseBar.user, show: !showBrowseBar.show})}
          >
            Show
          </button>
        </div>
      ) : null}
      <input
        type="text"
        placeholder={placeholder}
        className="rounded-full px-3"
      />
    </div>
  );
}

export default SearchBar;
