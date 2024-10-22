import React, { useEffect, useState } from "react";
import SideBar from "../../Components/dashboard/SideBar/SideBar";
import TableFilm from "../../Components/dashboard/admin-components/Table/TableFilm";
export default function AdminFilm() {

  const [userCount, setUserCount] = useState(0);
  const [filmCount,setFilmCount] = useState(0);
  const [salleCount, setSalleCount] = useState(0);
  const [seanceCount, setSeanceCount] = useState(0);

  useEffect(()=>{
    const fetchData = async()=>{
      
    }
    fetchData();
  },[])
    return (
    <>
    <div className=' flex '>
      <SideBar />
        <TableFilm />
    </div>
    </>
  );
}
