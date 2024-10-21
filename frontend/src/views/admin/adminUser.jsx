import React from 'react'
import SideBar from '../../Components/dashboard/SideBar/SideBar'
import TableUser from '../../Components/dashboard/admin-components/Table/TableUser'

export default function AdminUser() {
  return (
    <>
    <div className=' flex '>
    <SideBar />
        <TableUser />
    </div>
    </>
  )
}
