import React from 'react'
import Ghostity from "@logo/Ghostity.svg";

export default function AccountNoUser() {
  return (
    <div className="w-full top-1/3 absolute flex flex-col justify-center items-center text-center gap-4">
      <div className="h-20 w-20">
        <Ghostity />
      </div>
      Please Login or Create an Account to view your profile
    </div>
  );
}
