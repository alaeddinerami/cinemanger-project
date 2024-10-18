import React from 'react'
import SideBar from '../../Components/dashboard/SideBar/SideBar'
import Layout from '../../Components/dashboard/Layouts/Layout'
import Statistice from '../../Components/dashboard/Statistice/Statistice'

export default function Dashboard() {
  return (
    <>
      <div>
        <SideBar />
        <Statistice />
      </div>
    </>
  )
}
