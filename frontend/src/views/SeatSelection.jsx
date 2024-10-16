import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/header/Header';
import axios from 'axios';


const Modal = ({ message, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Reservation Status</h2>
        <p>{message}</p>
        <button
          className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-lg"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function SeatSelection() {
  const { seanceId } = useParams();
  const [selectedSeat, setSelectedSeat] = useState(null); 
  const [message, setMessage] = useState('');
  const [totalSeats, setTotalSeats] = useState(0); 
  const [salleName, setSalleName] = useState()
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const fetchSalleCapacity = async () => {
      try {
        const token = localStorage.getItem('token'); 

        const response = await axios.get(`http://localhost:3000/api/seances/${seanceId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        console.log(response.data.salle.name);
        const salleName =response.data.salle.name;
        const salleCapacity = response.data.salle.capacity;
        setTotalSeats(salleCapacity); 
        setSalleName(salleName)
      } catch (error) {
        console.error('Error fetching salle capacity:', error);
        setMessage('Failed to fetch salle capacity. Please try again.');
        setShowModal(true);
      }
    };

    fetchSalleCapacity();
  }, [seanceId]); 

  const handleSeatClick = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const handleReserveSeats = async () => {
    if (selectedSeat === null) {
      setMessage('Please select a seat.');
      setShowModal(true);
      return;
    }

    try {
      const token = localStorage.getItem('token'); 

      const response = await axios.post(
        'http://localhost:3000/api/reservations',
        {
          seanceId,
          placeNumber: selectedSeat, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      setMessage(response.data.message); 
      setShowModal(true); 
      setSelectedSeat(null); 
    } catch (error) {
      console.error('Error reserving seat:', error);
      setMessage(error.response ? error.response.data.message : 'An error occurred');
      setShowModal(true); 
    }
  };

  const closeModal = () => {
    setShowModal(false); 
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <h1 className="text-3xl font-bold mb-3 text-center pt-5">Select Your Seat</h1>
      <div className="container p-5 flex flex-col mx-auto py-8">
        <p className="text-gray-400 mb-4">Salle : {salleName}</p>
        <div className="w-4/5 grid grid-cols-10 gap-2 mb-8 self-center">
          {Array.from({ length: totalSeats }, (_, index) => {
            const seatNumber = index + 1;
            return (
              <button
                key={seatNumber}
                className={`p-2 border rounded-lg text-center cursor-pointer 
                ${selectedSeat === seatNumber ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                onClick={() => handleSeatClick(seatNumber)}
              >
                {seatNumber}
              </button>
            );
          })}
        </div>

        {/* 
        {selectedSeat && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Selected Seat:</h2>
            <p>{selectedSeat}</p>
          </div>
        )} */}

        <button
          className="bg-yellow-500 text-black max-w-32 px-4 py-2 rounded-lg flex-center"
          onClick={handleReserveSeats}
        >
          Reserve Seat
        </button>

        {showModal && <Modal message={message} closeModal={closeModal} />} 
      </div>
    </div>
  );
}
