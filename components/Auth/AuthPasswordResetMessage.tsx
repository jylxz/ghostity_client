import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function AuthPasswordResetMessage() {
  return (
    <div className="text-center bg-gray-500/50 text-white py-1 flex items-center justify-center gap-2">
      <AiOutlineCheckCircle />
      Password successfully reset!
    </div>
  );
}
