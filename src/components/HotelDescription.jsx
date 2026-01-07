import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWifi, faSquareParking, faToilet, faMugSaucer,
  faUtensils, faFan, faTv, faLocationDot, faStar
} from '@fortawesome/free-solid-svg-icons';

function Newpage({ hotelData }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="bg-white w-full py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 
        <div className="space-y-2">
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
            {hotelData?.starRating} • 128 reviews
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-black">
            {hotelData?.name}
          </h2>

          <p className="text-gray-600 flex items-center gap-1">
            <FontAwesomeIcon icon={faLocationDot} className="text-blue-400" />
            {hotelData?.city}
          </p>
        </div>

        {/* Overview Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Bedroom', value: 1 },
            { label: 'Beds', value: 2 },
            { label: 'Washroom', value: 1 },
            { label: 'Guests', value: 3 },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 text-center rounded-lg border border-gray-300"
            >
              <h2 className="font-bold text-xl">{item.value}</h2>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex mt-10 border-b border-gray-200 overflow-x-auto">
          {['description', 'amenities', 'policies'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 capitalize font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6 text-gray-700">
          {activeTab === 'description' && (
            <p>
              Experience ultimate luxury in this spacious oceanfront suite featuring floor-to-ceiling windows
              with panoramic views of the Atlantic Ocean. This tastefully decorated accommodation offers a
              king-sized bed, a separate living area with a sofa bed, and a private balcony where you can enjoy
              the sea breeze and stunning sunrises.
            </p>
          )}

          {activeTab === 'amenities' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: faWifi, label: 'Free WiFi' },
                  { icon: faSquareParking, label: 'Parking' },
                  { icon: faToilet, label: 'Private Bathroom' },
                  { icon: faMugSaucer, label: 'Breakfast Included' },
                  { icon: faUtensils, label: 'Restaurant' },
                  { icon: faFan, label: 'Air Conditioning' },
                  { icon: faTv, label: 'TV' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <FontAwesomeIcon icon={item.icon} className="text-blue-400" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Policies</h3>

              <div className="mb-4">
                <h4 className="font-semibold">Check-in / Check-out</h4>
                <p className="mt-2">Check-in: <strong>3:00 PM</strong></p>
                <p>Check-out: <strong>11:00 AM</strong></p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold">Cancellation Policy</h4>
                <p className="mt-2">
                  Free cancellation up to 48 hours before check-in. After that, the first night is non-refundable.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">House Rules</h4>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>No smoking</li>
                  <li>No parties or events</li>
                  <li>Pets not allowed</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Newpage;
