import React from "react";
import SideBar from "../../Components/dashboard/SideBar/SideBar";
import TableFilm from "../../Components/dashboard/admin-components/Table/TableFilm";
export default function AdminFilm() {
  return (
    <>
    <div className=' flex '>
      <SideBar />
        <TableFilm />
    </div>
    </>
  );
}
