import React from "react";
import SideBar from "../../Components/dashboard/SideBar/SideBar";
import TableSalle from "../../Components/dashboard/admin-components/Table/TableSalle";
export default function AdminSalle() {
  return (
    <>
      <div className=" flex ">
        <SideBar />
        <TableSalle />
      </div>
    </>
  );
}
