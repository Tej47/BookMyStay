import React, { useState, useEffect } from 'react';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function DeleteHotel() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHotelId, setSelectedHotelId] = useState(null);
 
    useEffect(() => {
        fetchHotels();
    }, []);
 
    const fetchHotels = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getallhotels');
            setHotels(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching hotels:', error);
            setLoading(false);
        }
    };
 
 
    // const handleHotelSelect = (id) => {
    //     setSelectedHotelId(id);
    // };
 
   
    const handleDelete = async () => {
        if (!selectedHotelId) {
            toast.warning("Please select a hotel to delete.");
            return;
        }
 
        try {
            await axios.delete(`http://localhost:5000/api/deletehotel/${selectedHotelId}`);
            toast.success("Hotel deleted successfully!");
 
            setHotels((prev) => prev.filter(hotel => hotel._id !== selectedHotelId));
            setSelectedHotelId(null);
 
        } catch (error) {
            console.error("Error deleting hotel:", error);
            toast.error("Failed to delete hotel.");
        }
    };
 
    if (loading) return <p className="text-center mt-10 text-lg">Loading hotels...</p>;
 
    return (
        <div className='h-screen w-screen flex'>
            <div className="bg-white h-screen w-80 border-r border-gray-300">
                <AdminSideBar />
            </div>
 
            <div className="bg-gray-100 w-full overflow-y-auto">
                <div className="flex justify-between items-center border-b border-gray-300 p-5">
                    <h2 className="text-2xl font-bold">Select Hotel</h2>
                    <button
                        className="bg-red-600 rounded text-white font-semibold h-10 w-40 hover:bg-red-700 transition"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
 
                <div className="w-260 max-w-7xl mx-auto px-6 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {hotels.map((hotel) => (
                            <div
                                key={hotel._id}
                                onClick={() =>  setSelectedHotelId(hotel._id)}
                                className={`bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden border-2 ${
                                    selectedHotelId === hotel._id ? 'border-red-500' : 'border-transparent'
                                }`}
                            >
                                <img
                                    src={hotel.imageURL}
                                    alt={hotel.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {hotel.name.length > 40 ? hotel.name.slice(0, 37) + '...' : hotel.name}
                                    </h2>
 
                                    <p className="text-sm text-gray-500 mt-1">
                                        <FontAwesomeIcon
                                            icon={faLocationDot}
                                            style={{ color: "#74C0FC", marginRight: "4px" }}
                                        />
                                        {hotel.address}
                                    </p>
 
                                    <p className="text-md font-semibold text-gray-700 mt-2">
                                        ₹{hotel.pricePerNight}120/night
                                    </p>
                                    <p className="text-yellow-500 mt-1">
                                        ⭐ {hotel.starRating}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <ToastContainer position="top-right" />
            </div>
        </div>
    );
}
 
export default DeleteHotel;
 
 