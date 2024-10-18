import React from 'react'
import SideBar from '../SideBar/SideBar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Statistice from '../Statistice/Statistice'

export default function Layout() {
  return (
    <div>
        <div>
            <SideBar />
            <div className=''>
                <Header />
               <Statistice />
            </div>
        </div>
    </div>
  )
}
