import axios from "axios";
import HotelCard from "../components/HotelCard";
import { useEffect, useState } from "react";
import NavBar from "../components/Navigation";
import Destinations from "../components/Destinations";
import HomeBase from "../components/HomeBase";
import HomeFooter from "../components/HomeFooter";
import HowItWorks from "../components/HowItWorks";
import Subscribe from "../components/Subscribe";
import { useRef } from "react";



function Home() {
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);
    const propsRef = useRef(null);

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log("useEffect is running");
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getallhotels');
                console.log("Fetched hotels:", response.data);
                setHotels(response.data);


            } catch (error) {
                console.log("error in fetching the details ", error)
            } finally {
                setLoading(false);
            }
        }
        fetchHotels();
    }, [])


    // const hotels = [
    //     { id: 1, img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", name: "Luxury Open View Suite", location: "Miami Beach, FL", price: "500$", rating: "4.5" },
    //     { id: 2, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", name: "Downtown Modern Apartment", location: "New York, NY", price: "500$", rating: "4.5" },
    //     { id: 3, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", name: "Downtown Modern Apartment", location: "New York, NY", price: "500$", rating: "4.5" },
    //     { id: 4, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", name: "Downtown Modern Apartment", location: "New York, NY", price: "500$", rating: "4.5" },
    //     { id: 5, img: "https://c4.wallpaperflare.com/wallpaper/462/505/95/resort-caribbean-leisure-vacation-wallpaper-preview.jpg", name: "Downtown Modern Apartment", location: "New York, NY", price: "500$", rating: "4.5" },
    //     { id: 6, img: "https://th.bing.com/th/id/OIP.ZO-MHEN36WQQDEgdiVYTeAHaEr?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", name: "Downtown Modern Apartment", location: "New York, NY", price: "500$", rating: "4.5" },
    //     { id: 7, img: "https://th.bing.com/th/id/OIP.y5AnK71FJ92vSOE5gHsA5gHaEo?w=266&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", name: "Downtown Modern Apartment", location: "New York, NY", price: "500$", rating: "4.5" },
    //     { id: 8, img: "https://wallpaperaccess.com/full/902497.jpg", name: "Downtown Modern Apartment", location: "New York, NY", price: "500$", rating: "4.5" },
    // ]

    const locations = [
        { id: 1, img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", name: "New York", properties: "500" },
        { id: 2, img: "https://th.bing.com/th/id/OIP.ZO-MHEN36WQQDEgdiVYTeAHaEr?w=250&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", name: "Florida", properties: "500" },
        { id: 3, img: "https://th.bing.com/th/id/OIP.y5AnK71FJ92vSOE5gHsA5gHaEo?w=266&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", name: "Miami", properties: "500" },
        { id: 4, img: "https://wallpaperaccess.com/full/902497.jpg", name: "Downtown", properties: "500" }

    ]
    return (
        <>


            <NavBar
                homeRef={homeRef}
                aboutRef={aboutRef}
                contactRef={contactRef}
            />


            <div ref={homeRef}>
                <HomeBase propsRef={propsRef} />
            </div>

            <div ref={propsRef} className="mt-30 px-4">
                <div className="text-center mb-6 px-10">
                    <h2 className="text-4xl font-bold">Popular Destinations</h2>
                    <p className="text-lg text-gray-600 mt-1">Discover our most sought-after locations</p>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
                    {locations.map((location) => (
                        <Destinations location={location} key={location.id} />
                    )
                    )}

                </div>

            </div>

            <div className="mt-30 px-4">
                <div className="text-left mb-6 px-10">
                    <h2 className="text-4xl font-bold">Featured Properties</h2>
                    <p className="text-lg text-gray-600 mt-1">Handpicked Properties for your next stay</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {loading ? (
                        <p>Loading hotels...</p>
                    ) : (
                        hotels.map((hotel) => <HotelCard hotel={hotel} key={hotel.id} />)
                    )}
                </div>

            </div>

            <div ref={aboutRef}>
                <HowItWorks />
            </div>
            <Subscribe />
            <div ref={contactRef}>
                <HomeFooter />
            </div>




        </>
    )
}
export default Home