import React from "react";

function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="bg-slate-200 h-14 px-7 flex justify-end items-center">
      <input
        type="text"
        placeholder={placeholder}
        className="rounded-full px-3"
      />
    </div>
  );
}

export default SearchBar;
