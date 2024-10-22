import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import SideBar from '../../Components/dashboard/SideBar/SideBar';
import Statistice from '../../Components/dashboard/Statistice/Statistice';
import axiosInstance from '../../api/axios';

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [filmCount, setFilmCount] = useState(0);
  const [salleCount, setSalleCount] = useState(0);
  const [seanceCount, setSeanceCount] = useState(0);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('statistic/'); 

        const { userCount, filmCount, salleCount, seanceCount } = response.data;

        setUserCount(userCount);
        setFilmCount(filmCount);
        setSalleCount(salleCount);
        setSeanceCount(seanceCount);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className='flex'>
      <SideBar />
      <Statistice 
        userCount={userCount} 
        filmCount={filmCount} 
        salleCount={salleCount} 
        seanceCount={seanceCount} 
      />
    </div>
  );
}
