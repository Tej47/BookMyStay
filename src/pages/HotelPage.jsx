import HotelImage from "../components/HotelImage";
import NavBar from "../components/Navigation";
import PriceDetails from "../components/PriceDetails";
import HomeFooter from "../components/HomeFooter";
import HotelDescription from "../components/HotelDescription";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function HotelPage() {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);
    const { id } = useParams();

    const [hotelData, setHotelData] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/hotels/${id}`)
            .then((response) => setHotelData(response.data))
            .catch((error) => console.error("Failed to fetch hotel details:", error));
    }, [id]);

    if (!hotelData) return <div className="text-center p-10">Loading...</div>;

    const hotelimages = [
        {
            id: 1,
            name: hotelData.name,
            img: hotelData.imageURL
        }
    ];

    return (
        <>
            <NavBar
                homeRef={homeRef}
                aboutRef={aboutRef}
                contactRef={contactRef}
            />

            <div className="mt-20">
                {hotelimages.map((hotelimage) => (
                    <HotelImage hotelimage={hotelimage} key={hotelimage.id} />
                ))}
            </div>

            <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-2/3 bg-gray-100 p-6 rounded-lg shadow-sm">
                    <HotelDescription hotelData={hotelData} />
                </div>

                <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-sm">
                    <PriceDetails
                        roomdetail={{
                            hotelId: hotelData._id,
                            hotelName: hotelData.name,
                            price: hotelData.price || 120,
                            rating: hotelData.rating || 4.5,
                            serviceFee: 15,
                            cleaningFee: 20
                        }}
                    />
                </div>
            </div>

            <HomeFooter />
        </>
    );
}

export default HotelPage;
