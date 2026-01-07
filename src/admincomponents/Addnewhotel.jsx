import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AdminSideBar from './AdminSideBar';

function Addnewhotel() {
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token") || '');

    const [formData, setFormData] = useState({
        name: '',
        roomCount: '',
        starRating: '',
        description: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        phoneNumber: '',
        email: '',
        imageURL: [],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.roomCount ||
            !formData.starRating ||
            !formData.description ||
            !formData.address ||
            !formData.city ||
            !formData.country ||
            !formData.postalCode ||
            !formData.phoneNumber ||
            !formData.email ||
            !formData.imageURL
        ) {
            toast.error('Please fill in all required fields.');
            return;
        }


        if (isNaN(formData.roomCount) || isNaN(formData.starRating)) {
            toast.error('Room count and star rating must be numbers.');
            return;
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error('Invalid email format.');
            return;
        }
        try {
            console.log("Token sent to backend:", token);

            const response = await axios.post('http://localhost:5000/api/addhotel', {
                name: formData.name,
                roomCount: formData.roomCount,
                starRating: formData.starRating,
                description: formData.description,
                address: formData.address,
                city: formData.city,
                country: formData.country,
                postalCode: formData.postalCode,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                imageURL: formData.imageURL,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(response, "responseeee")
            if (response.status == 200) {

                toast.success('Hotel added successfully!');
                setTimeout(() => {
                    navigate('/adminpage');
                }, 2000);
            }
            else {
                toast.error(response.data.message);

            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
                if (error.response.status == 401) {

                    setTimeout(() => {
                        navigate('/adminsignin');
                    }, 2000);
                }
            }
            else {
                toast.error("An error occured while adding an hotel");
            }
            console.log(error);
        }

    };

    return (
        <div className='h-screen w-screen flex'>
            <AdminSideBar />

            <div className="bg-gray-100 h-224 w-screen">
                <div className="flex border-b border-gray-300 p-5">
                    <span
                        onClick={() => navigate('/adminpage')}
                        className="text-gray-500 text-sm mt-1 font-semibold hover:cursor-pointer"
                    >
                        ← Back
                    </span>
                    <h2 className="text-2xl font-bold ml-10">Add New Hotel</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='bg-white h-192 w-200 ml-55 mt-8 rounded border border-gray-300 p-8 space-y-6'>
                        <div className='flex'>
                            <div className='ml-2'>
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Hotel Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-87 h-10 border border-gray-300 rounded px-3 py-2 text-sm" placeholder="Enter hotel name" />
                            </div>

                            <div className='ml-8'>
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Room Count</label>
                                <input type="number" name="roomCount" value={formData.roomCount} onChange={handleChange} className="w-39 h-10 border border-gray-300 rounded px-3 py-2 text-sm" placeholder="120" />
                            </div>

                            <div className='ml-8'>
                                <label className="block text-gray-700 text-sm font-semibold mb-2">Star Rating</label>
                                <input type="number" name="starRating" value={formData.starRating} onChange={handleChange} min="1" max="5" className="w-39 h-10 border border-gray-300 rounded px-3 py-2 text-sm" placeholder="1-5" />
                            </div>
                        </div>

                        <div className='ml-2'>
                            <label className='block text-gray-700 text-sm font-semibold mb-2'>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className='h-[108px] w-[725px] border border-gray-300 rounded px-3 py-2 text-sm resize-none'
                                placeholder='A luxurious hotel in the heart of the city...'
                            ></textarea>
                        </div>

                        <div className='flex'>
                            <div className='ml-2'>
                                <label className='block text-gray-700 text-sm font-semibold mb-2'>Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-87 h-10 border border-gray-300 rounded px-3 py-2 text-sm" placeholder='123 Luxury Avenue' />
                            </div>
                            <div className='ml-8'>
                                <label className='block text-gray-700 text-sm font-semibold mb-2'>City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-87 h-10 border border-gray-300 rounded px-3 py-2 text-sm" placeholder='New York' />
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='ml-2'>
                                <label className='block text-gray-700 text-sm font-semibold mb-2'>Country</label>
                                <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-87 h-10 border border-gray-300 rounded px-3 py-2 text-sm" placeholder='United States' />
                            </div>
                            <div className='ml-8'>
                                <label className='block text-gray-700 text-sm font-semibold mb-2'>Postal Code</label>
                                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-87 h-10 border border-gray-300 rounded px-3 py-2 text-sm" placeholder='500102' />
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='ml-2'>
                                <label className='block text-gray-700 text-sm font-semibold mb-2'>Phone Number</label>
                                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-87 h-10 border border-gray-300 rounded px-3 py-2 text-sm" placeholder='+91********' />
                            </div>
                            <div className='ml-8'>
                                <label className='block text-gray-700 text-sm font-semibold mb-2'>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-87 h-10 border border-gray-300 rounded px-3 py-2 text-sm" placeholder='contact@grandhotel.com' />
                            </div>
                        </div>

                        <div className='ml-2'>
                            <label className='block text-gray-700 text-sm font-semibold mb-2'>Image URL</label>
                            {/* <input type="text" name="imageURL" value={formData.imageURL} onChange={handleChange} className="w-[725px] h-10 border border-gray-300 rounded px-3 py-2 text-sm" placeholder='https://example.com/hotel-img.jpg' /> */}
                            <input
                                type="text"
                                name="imageURL"
                                value={formData.imageURL.join(', ')}  // convert array to string for display
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        imageURL: e.target.value.split(',').map(url => url.trim()) // convert back to array
                                    })
                                }
                                className="w-[725px] h-10 border border-gray-300 rounded px-3 py-2 text-sm"






                                
                                placeholder="https://img1.jpg, https://img2.jpg, ..."
                            />
                        </div>
                        <div className='flex mt-10'>
                            <button type="reset" className="bg-white rounded text-black font-semibold ml-130 border border-gray-400 h-10 w-25 hover:cursor-pointer">
                                Reset
                            </button>
                            <button type="submit" className="bg-blue-500 rounded text-white font-semibold ml-4 h-10 w-30 hover:cursor-pointer">
                                Add Hotel
                            </button>
                        </div>
                    </div>
                </form>

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
}

export default Addnewhotel;
