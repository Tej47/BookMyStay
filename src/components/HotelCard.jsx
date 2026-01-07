import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function HotelCard({ hotel }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/hotel/${hotel._id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="w-full sm:w-[300px] md:w-[320px] lg:w-[360px] cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl"
        >
            <img
                className="w-full h-48 object-cover"
                src={hotel.imageURL[0]}
                alt={hotel.name}
            />
            <div className="p-4">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">{hotel.name}</h3>
                <h4 className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                    <FontAwesomeIcon icon={faLocationDot} className="text-blue-400" />
                    {hotel.city}, {hotel.country}
                </h4>
                <div className="flex items-center mb-1">
                    <p className="text-yellow-500 font-medium text-sm md:text-base flex items-center gap-1">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                        {hotel.starRating} Star
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HotelCard;
