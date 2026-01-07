import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCalendar, faPersonWalkingLuggage } from '@fortawesome/free-solid-svg-icons';

function HomeBase({ propsRef }) {
    const scrollToProperties = () => {
        if (propsRef.current) {
            propsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [location, setLocation] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState('');

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-t from-[#146380] via-[#1f8eb7] to-[#0284c7] mt-10 px-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
                    Find Your Perfect Stay
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 text-center">
                    Anywhere
                </h1>
                <p className="text-base sm:text-lg text-white mt-4 max-w-3xl text-center">
                    Discover amazing properties and book your next stay with confidence.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto px-4 sm:px-0">
                    <button
                        onClick={scrollToProperties}
                        className="bg-white font-bold py-2 px-6 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors w-full sm:w-auto"
                        style={{ color: '#0284c7' }}
                    >
                        Browse Properties
                    </button>
                    <button
                        className="bg-white font-bold py-2 px-6 rounded-lg hover:bg-white-600 transition-colors w-full sm:w-auto"
                        style={{ color: '#0284c7' }}
                    >
                        Learn More
                    </button>
                </div>

                <div className="mt-12 bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-4xl w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="location" className="text-sm font-bold">
                                <FontAwesomeIcon icon={faLocationDot} style={{ color: "#74C0FC" }} /> Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Where are you going?"
                                className="p-2 border border-gray-300 rounded-md h-9 w-full"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="checkInDate" className="text-sm font-bold">
                                <FontAwesomeIcon icon={faCalendar} style={{ color: "#74C0FC" }} /> Check-in
                            </label>
                            <input
                                type="date"
                                id="checkInDate"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md h-9 w-full"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="checkOutDate" className="text-sm font-bold">
                                <FontAwesomeIcon icon={faCalendar} style={{ color: "#74C0FC" }} /> Check-out
                            </label>
                            <input
                                type="date"
                                id="checkOutDate"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md h-9 w-full"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="guests" className="text-sm font-bold">
                                <FontAwesomeIcon icon={faPersonWalkingLuggage} style={{ color: "#74C0FC" }} /> Guests
                            </label>
                            <input
                                type="text"
                                id="guests"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                placeholder="2 Adults, 1 Child"
                                className="p-2 border border-gray-300 rounded-md h-9 w-full"
                            />
                        </div>
                    </div>

                    <div className="mt-6 w-full flex justify-center">
                        <button
                            onClick={() => console.log("Search clicked")}
                            className="bg-[#2596be] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#426876] hover:bg-opacity-80 transition-colors w-full sm:w-3/4 lg:w-[900px]"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl w-full border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between gap-6 text-center sm:text-left">
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold" style={{ color: '#0284c7' }}>1.2M+</h2>
                        <p className="text-lg text-gray-600 mt-1">Properties</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold" style={{ color: '#0284c7' }}>150+</h2>
                        <p className="text-lg text-gray-600 mt-1">Countries</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold" style={{ color: '#0284c7' }}>5M+</h2>
                        <p className="text-lg text-gray-600 mt-1">Happy Guests</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold" style={{ color: '#0284c7' }}>4.8/5</h2>
                        <p className="text-lg text-gray-600 mt-1">Average Rating</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeBase;
