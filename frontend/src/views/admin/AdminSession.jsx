import React from 'react'
import SideBar from '../../Components/dashboard/SideBar/SideBar'
import TableSession from '../../Components/dashboard/admin-components/Table/TableSession'

export default function AdminSession() {
  return (
    <>
    <div className='flex'>
    <SideBar />
    <TableSession />
    </div>
    </>
  )
}
