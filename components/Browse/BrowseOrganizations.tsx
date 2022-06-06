import React from 'react'

import Ghostity from "../../public/images/Ghostity-svg.svg"
import InfoCard from '../general/InfoCard'

export default function BrowseOrganizations({organizations}: {organizations: Organization[]}) {
  return (
    <div className="bg-slate-50 overflow-auto h-[calc(100vh_-_7rem)] py-8">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-7 justify-items-center">
        <div className="col-span-full text-xl flex items-center gap-2">
          <h2>
            Organizations currently on{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
              ghostity
            </span>
          </h2>
          <div className='w-8 h-8 -scale-x-100'>
            <Ghostity />
          </div>
        </div>
        {organizations.map((org) => (
          <InfoCard
            key={org._id}
            title={org.name}
            image={org.logo}
            languages={org.languages}
          />
        ))}
      </div>
    </div>
  );
}