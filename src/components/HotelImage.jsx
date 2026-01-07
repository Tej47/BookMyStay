import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function HotelImage({ hotelimage }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? hotelimage.img.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === hotelimage.img.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden">
      <img
        src={hotelimage.img[currentIndex]}
        alt={hotelimage.name}
        className="w-full h-full object-cover transition duration-300"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-white/70 backdrop-blur-md text-gray-800 p-3 rounded-full shadow-md hover:bg-white hover:scale-105 transition"
        aria-label="Previous Image"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-white/70 backdrop-blur-md text-gray-800 p-3 rounded-full shadow-md hover:bg-white hover:scale-105 transition"
        aria-label="Next Image"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>

      {/* Caption */}
      <div className="absolute bottom-5 left-5 text-white z-20">
        <h3 className="text-xl sm:text-2xl font-semibold">{hotelimage.name}</h3>
        <p className="text-sm">{currentIndex + 1} / {hotelimage.img.length}</p>
      </div>
    </div>
  );
}

export default HotelImage;
