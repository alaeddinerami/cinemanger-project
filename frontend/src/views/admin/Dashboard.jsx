import React from 'react'
import SideBar from '../../Components/dashboard/SideBar/SideBar'
import Layout from '../../Components/dashboard/Layouts/Layout'
import Statistice from '../../Components/dashboard/Statistice/Statistice'

export default function Dashboard() {
  const userCount = 120;
  const filmCount = 45;
  return (
    <>
      <div className='flex '>
        <SideBar />
        <Statistice userCount = {userCount} filmCount ={filmCount} />
      </div>
    </>
  )
}
