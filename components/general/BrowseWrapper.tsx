import React from 'react'

export default function BrowseWrapper({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-slate-50 overflow-auto h-[calc(100vh_-_7rem)] px-4 sm:px-14 py-7 flex flex-col">
      {children}
    </div>
  );
}
