
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../index.css";
import axios from "axios";

const NavBar = ({ homeRef, aboutRef, contactRef }) => {
    // 
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [hotels, setHotels] = useState([]);
    const [token] = useState(localStorage.getItem("token") || '')

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchQuery.trim() !== "") {
                axios.get(`http://localhost:5000/api/searchhotels?query=${searchQuery}`)
                    .then(response => setHotels(response.data))
                    .catch(error => console.error("Search error", error));
            } else {
                setHotels([]); // Clear results if query is empty
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    // const navigateSearch =()=>{
    //      navigate(`/hotel/${hotel._id}`);
    // }

    const scrollTo = (ref) => {
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out.");
        setTimeout(() => {
            navigate("/signin");
        }, 2000);
        
    };

    const handleLogin = () =>{
        navigate("/signin");
    }

    return (
        <div className="w-full fixed top-0 left-0 z-50 bg-white shadow-md border-b">
            <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-10">
                <h1
                    onClick={() => navigate('/')}
                    className="font-bold cursor-pointer text-xl text-blue-700"
                >
                    BookMyStay
                </h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">
                    <button onClick={() => scrollTo(homeRef)} className="hover:text-blue-500">Home</button>
                    <button onClick={() => scrollTo(contactRef)} className="hover:text-blue-500">Contact</button>
                    <button onClick={() => scrollTo(aboutRef)} className="hover:text-blue-500">About</button>
                    {/* <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <input
                            className="p-2 w-48 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                            type="text"
                            placeholder="Search hotels"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="p-2 w-48 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none">
                            {hotels.length > 0 ? hotels.map(hotel => (
                                <div key={hotel._id} className="mb-2 p-2 bg-white shadow rounded">
                                    <h3 className="font-semibold text-lg">{hotel.name}</h3>
                                    <p>{hotel.city}, {hotel.country}</p>
                                </div>
                            )) : searchQuery && (
                                <p>No hotels found.</p>
                            )}
                        </div>
                        <button
                            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                            type="submit"
                        >
                            Search
                        </button>
                    </form> */}
                    <form onSubmit={handleSearch} className="relative flex items-center gap-2">
                        <div className="relative w-48">
                            <input
                                className="p-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                                type="text"
                                placeholder="Search hotels"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-10">
                                    {hotels.length > 0 ? (
                                        hotels.map((hotel) => (
                                            <div onClick={() => { navigate(`/hotel/${hotel._id}`) }}
                                                key={hotel._id}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <h3 className="font-semibold text-sm">{hotel.name}</h3>
                                                <p className="text-xs text-gray-600">{hotel.city}, {hotel.country}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="p-2 text-sm text-gray-500">No hotels found.</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <button
                            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>

                    {token? (
                        <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    >
                        Logout
                    </button>
                    ):(
                        <button
                        onClick={handleLogin}
                        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                        >Login</button>
                    )}
                </div>

                {/* Mobile Hamburger Icon */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden flex flex-col items-start bg-white px-6 py-4 gap-4 shadow">
                    <button onClick={() => scrollTo(homeRef)} className="hover:text-blue-500 w-full text-left">Home</button>
                    <button onClick={() => scrollTo(contactRef)} className="hover:text-blue-500 w-full text-left">Contact</button>
                    <button onClick={() => scrollTo(aboutRef)} className="hover:text-blue-500 w-full text-left">About</button>
                    {/* <form onSubmit={handleSearch} className="flex flex-col gap-2 w-full">
                        <input
                            className="p-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                            type="text"
                            placeholder="Search hotels"
                            value={searchInput}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <button
                            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                            type="submit"
                        >
                            Search
                        </button>
                    </form> */}
                    <form onSubmit={handleSearch} className="flex flex-col gap-2 w-full relative">
                        <div className="relative">
                            <input
                                className="p-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                                type="text"
                                placeholder="Search hotels"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto z-10">
                                    {hotels.length > 0 ? (
                                        hotels.map((hotel) => (
                                            <div
                                                key={hotel._id}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <h3 className="font-semibold text-sm">{hotel.name}</h3>
                                                <p className="text-xs text-gray-600">{hotel.city}, {hotel.country}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="p-2 text-sm text-gray-500">No hotels found.</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <button
                            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                            type="submit"
                        >
                            Search
                        </button>
                    </form>





                    {/* return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search hotels"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border p-2 w-80"
            />

            <div className="mt-4 border-t pt-4">
                {hotels.length > 0 ? hotels.map(hotel => (
                    <div key={hotel._id} className="mb-2 p-2 bg-white shadow rounded">
                        <h3 className="font-semibold text-lg">{hotel.name}</h3>
                        <p>{hotel.city}, {hotel.country}</p>
                    </div>
                )) : searchQuery && (
                    <p>No hotels found.</p>
                )}
            </div>
        </div>
    );
} */}



                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md w-full"
                    >
                        Logout
                    </button>
                     <ToastContainer toastClassName="text-sm font-semibold text-black" position="top-right" autoClose={3000} />
                </div>
            )}
        </div>
    );
};

export default NavBar;
