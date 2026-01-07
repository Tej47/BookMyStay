import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StripeCheckout from './Payment';

function PriceDetails({ roomdetail }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGuests, setSelectedGuests] = useState(1);
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [dateError, setDateError] = useState("");
    const [nights, setNights] = useState(0);

    const guestOptions = [1, 2, 3, 4, 5, 6];

    const handleSelect = (num) => {
        setSelectedGuests(num);
        setIsOpen(false);
    };

    const handleDateChange = (type, value) => {
        if (type === "checkIn") setCheckInDate(value);
        if (type === "checkOut") setCheckOutDate(value);

        const checkin = new Date(type === "checkIn" ? value : checkInDate);
        const checkout = new Date(type === "checkOut" ? value : checkOutDate);

        if (checkin && checkout && checkout > checkin) {
            setDateError("");
            const days = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
            setNights(days);
        } else if (checkin && checkout && checkout <= checkin) {
            setDateError("Check-out date must be after check-in date.");
            setNights(0);
        }
    };

    const calculateTotalPrice = () => {
        const roomCost = roomdetail.price * nights * selectedGuests;
        return roomCost + roomdetail.serviceFee + roomdetail.cleaningFee;
    };

    const showSummary = checkInDate && checkOutDate && nights > 0;

    return (
        <div className="flex justify-center w-full px-4">
            <div className="w-120 max-w-5xl bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200">
                <div className="flex justify-between items-center">
                    <div className="flex items-baseline space-x-1">
                        <h2 className="text-3xl font-bold text-gray-800">${roomdetail.price}</h2>
                        <span className="text-base text-gray-500">/night</span>
                    </div>
                    <h3 className="text-lg text-gray-700">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                        {roomdetail.rating}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Check-in</label>
                        <input
                            type="date"
                            value={checkInDate}
                            onChange={(e) => handleDateChange("checkIn", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Check-out</label>
                        <input
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => handleDateChange("checkOut", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {dateError && <p className="text-red-600 text-sm text-center">{dateError}</p>}

                <div className="relative">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Guests</label>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full px-4 py-2 bg-white border rounded-lg text-left hover:bg-gray-50"
                    >
                        {selectedGuests} Guest{selectedGuests > 1 ? "s" : ""}
                        <span className="float-right">&#9662;</span>
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg">
                            {guestOptions.map((num) => (
                                <div
                                    key={num}
                                    onClick={() => handleSelect(num)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {num} Guest{num > 1 ? "s" : ""}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {showSummary && (
                    <>
                        <div className="mt-4 p-4 bg-gray-50 border rounded-xl space-y-3">
                            <div className="flex justify-between text-gray-700">
                                <span>
                                    ${roomdetail.price} × {nights} night{nights > 1 ? "s" : ""}
                                </span>
                                <span className="font-medium">
                                    ${(roomdetail.price * nights).toLocaleString("en-US")}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Service Fee</span>
                                <span>${roomdetail.serviceFee.toLocaleString("en-US")}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Cleaning Fee</span>
                                <span>${roomdetail.cleaningFee.toLocaleString("en-US")}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-semibold text-lg text-gray-800">
                                <span>Total</span>
                                <span>${calculateTotalPrice().toLocaleString("en-US")}</span>
                            </div>
                        </div>

                        <div className="mt-6 w-90">
                            <StripeCheckout
                                totalAmount={calculateTotalPrice()}
                                bookingDetails={{
                                    userEmail: localStorage.getItem("email"),
                                    hotelId: roomdetail.hotelId,
                                    hotelName: roomdetail.hotelName,
                                    checkInDate,
                                    checkOutDate,
                                    guests: selectedGuests,
                                    totalPrice: calculateTotalPrice(),
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default PriceDetails;
