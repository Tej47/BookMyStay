import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelList from './getallhotels';
import { toast, ToastContainer } from 'react-toastify';
import AdminSideBar from './AdminSideBar';

function Dashboard() {
    const navigate = useNavigate();
    const handleClick = () => {

        navigate('/addnewhotel');

    };


    return (
        <div className="flex ">
            <AdminSideBar/>
            <div class="bg-gray-100 h-screen w-screen">

                <div class="flex justify-between items-center border-b border-gray-300 p-5">
                    <h2 class="text-2xl font-bold">Dashboard</h2>
                    <button onClick={handleClick} class="bg-blue-500 rounded text-white font-semibold h-10 w-40 hover:cursor-pointer">
                        Add New Hotel
                    </button>
                </div>
                <div className='h-50 w-60 mt-20 ml-30'>
                    <HotelList />
                </div>
                
            </div>
            <ToastContainer position="top-right" autoClose={3000} />


        </div>
    )
}
export default Dashboard;