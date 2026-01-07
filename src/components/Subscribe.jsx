import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Subscribe() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            const response = await axios.post(
                "https://backend-book-my-stay-production.up.railway.app/api/subsuccess",
                { email }
            );

            if (response.data.message) {
                toast.success("Subscribed successfully");
                setTimeout(() => {
                    navigate('/subsuccess');
                }, 1000);
            } else {
                toast.error("Error in subscribing");
            }
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="mt-20 bg-gradient-to-t from-[#146380] via-[#1f8eb7] to-[#0284c7] py-16 px-4">
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-2">
                        Subscribe to Our Newsletter
                    </h2>
                    <p className="text-white mb-6 text-base sm:text-lg">
                        Get exclusive deals, travel tips, and the latest updates directly to your inbox.
                    </p>

                    <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="bg-white rounded-md h-10 w-full sm:w-96 px-4"
                        />
                        <button
                            className="bg-amber-500 text-white px-6 h-10 rounded-md"
                            onClick={handlesubmit}
                        >
                            Subscribe
                        </button>
                    </div>

                    <p className="text-sm text-white mt-4">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Subscribe;
