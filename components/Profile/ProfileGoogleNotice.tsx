import React from 'react'
import { RiErrorWarningFill } from 'react-icons/Ri';

export default function ProfileGoogleNotice() {
  return (
    <div className="text-sm flex flex-col justify-center items-center gap-1 my-2">
      <div className="flex gap-3 items-center">
        <div>
          <RiErrorWarningFill size={24} />
        </div>
        <p className='max-w-[75ch]'>Your account is signed in through Google. Changing emails is not possible at the moment. To change passwords, change through Google. </p>
      </div>
    </div>
  );
}
