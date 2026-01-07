// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

// const HotelList = () => {
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const response = await axios.get('https://backend-book-my-stay-production.up.railway.app/api/getallhotels');
//         setHotels(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching hotels:', error);
//         setLoading(false);
//       }
//     };
//     fetchHotels();
//   }, []);

//   if (loading) return <p className="text-center mt-10 text-lg">Loading hotels...</p>;

//   return (
//     <div className=" h-90 w-300 flex">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {hotels.map((hotel) => (
//           <div
//             key={hotel._id}
//             className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
//           >
//             <img
//               src={hotel.imageURL}
//               alt={hotel.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold text-gray-800">{hotel.name}</h2>

//               <p className="text-sm text-gray-500"><FontAwesomeIcon icon={faLocationDot} style={{ color: "#74C0FC" }} />
//                   {hotel.address}</p>
//               <p className="text-md font-semibold text-gray-700 mt-2">₹120{hotel.pricePerNight} / night</p>
//               <p className="text-yellow-500 mt-1">⭐ {hotel.starRating}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HotelList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
 
const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
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
    fetchHotels();
  }, []);
 
  if (loading) return <p className="text-center mt-10 text-lg">Loading hotels...</p>;
 
  return (
    <div className="w-260 max-w-7xl mx-auto px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <img
              src={hotel.imageURL}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {hotel.name}
              </h2>
 
              <p className="text-sm text-gray-500 mt-1">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ color: "#74C0FC", marginRight: "4px" }}
                />
                {hotel.address}
              </p>
 
              <p className="text-md font-semibold text-gray-700 mt-2">
                ₹{hotel.pricePerNight} 120$/ night
              </p>
 
              <p className="text-yellow-500 mt-1">
                ⭐ {hotel.starRating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}  
 
export default HotelList;
 
 
