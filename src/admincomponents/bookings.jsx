import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AdminSideBar from './AdminSideBar';
import { format } from 'date-fns';

function Bookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/api/getbookings')
      .then(res => setBookings(res.data))
      .catch(err => {
        console.error(err);
        toast.error('Failed to fetch bookings');
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/fetchhotelnames')
      .then(res => {
        setHotels(res.data.hotelList); // ensure the backend sends hotelList
      })
      .catch(error => {
        console.error("Hotel fetch error:", error);
        toast.error("Error in Fetching Hotels");
      });
  }, []);

  const handleChange = (e) => {
    setSelectedHotel(e.target.value);
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd-MM-yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  const filteredBookings = bookings.filter(
    booking => selectedHotel === '' || booking.hotelName === selectedHotel
  );

  return (
    <div className='h-screen w-screen flex'>
      <div className="bg-white h-screen w-80 border-r border-gray-300">
        <AdminSideBar />
      </div>

      <div className="bg-gray-100 min-h-screen w-full overflow-y-auto px-4">
        <div className="border-b border-gray-300 p-5 flex items-center justify-between">
          <span
            onClick={() => navigate('/adminpage')}
            className="text-gray-500 text-sm font-semibold hover:cursor-pointer"
          >
            ← Back
          </span>
          <div className="flex items-center space-x-2">
            <label htmlFor="hotel-select" className="text-sm font-medium text-gray-700">
              Hotel:
            </label>
            <select
              id="hotel-select"
              className="text-sm text-gray-700 border border-gray-300 rounded-md px-2 py-1 w-52 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={selectedHotel}
              onChange={handleChange}
            >
              <option value="">All Hotels</option>
              {hotels.map(hotel => (
                <option key={hotel.hotelId} value={hotel.name}>
                  {hotel.name.length > 35 ? hotel.name.slice(0, 32) + '...' : hotel.name}
                </option>
              ))}
            </select>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Bookings</h2>
        </div>

        <div className="bg-white rounded-xl shadow-md my-4">
          <div className="grid grid-cols-8 gap-4 bg-gray-200 p-4 rounded-t-xl text-sm font-bold text-gray-700">
            <div>S.No</div>
            <div>User Email</div>
            <div>Hotel Name</div>
            <div>Check-In</div>
            <div>Check-Out</div>
            <div>Guests</div>
            <div>Total Price</div>
            <div>Room No.</div>
          </div>

          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <div
                key={index}
                className="grid grid-cols-8 gap-4 p-4 border-t text-sm items-center bg-white hover:bg-gray-50 transition"
              >
                <div>{index + 1}</div>
                <div className="truncate">{booking.userEmail}</div>
                <div className="truncate">{booking.hotelName}</div>
                <div>{formatDate(booking.checkInDate)}</div>
                <div>{formatDate(booking.checkOutDate)}</div>
                <div>{booking.guests}</div>
                <div>₹{booking.totalPrice}</div>
                <div>{booking.roomNumber}</div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-6">No bookings found.</div>
          )}
        </div>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}

export default Bookings;

{/* {bookings.map((booking, index) => (
            <div
              key={index}
              className="grid grid-cols-8 gap-4 p-4 border-t text-sm items-center bg-white hover:bg-gray-50 transition"
            >
              <div>{index + 1}</div>
              <div className="truncate">{booking.userEmail}</div>
              <div className="truncate">{booking.hotelName}</div>
              <div>{formatDate(booking.checkInDate)}</div>
              <div>{formatDate(booking.checkOutDate)}</div>
              <div>{booking.guests}</div>
              <div>${booking.totalPrice}</div>
              <div>{booking.roomNumber}</div>
            </div>
          ))}
        </div>
 
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}
 
export default Bookings; */}