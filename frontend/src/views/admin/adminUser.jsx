import React from 'react'
import SideBar from '../../Components/dashboard/SideBar/SideBar'
import Table from '../../Components/dashboard/admin-components/Table/Table'

export default function AdminUser() {
  return (
    <>
    <SideBar />
    <div className=' flex flex-col justify-start items-end'>
        <Table />
    </div>
    </>
  )
}
