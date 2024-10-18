import React from 'react'
import SideBar from '../../Components/dashboard/SideBar/SideBar'
import TableUser from '../../Components/dashboard/admin-components/Table/TableUser'

export default function AdminUser() {
  return (
    <>
    <SideBar />
    <div className=' flex flex-col justify-start items-end'>
        <TableUser />
    </div>
    </>
  )
}
