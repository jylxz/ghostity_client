import React, { ReactNode } from 'react'
import SideBarMain from '../components/SideBar/SideBarMain'

export default function BrowseLayout({children}: {children: ReactNode}) {
  return (
    <div className='flex'>
      <SideBarMain/>
      {children}
    </div>
  )
}
