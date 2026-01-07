import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSendCode = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://backend-book-my-stay-production.up.railway.app/api/sendotp', {
                email,
            });

            if (response.data.message) {
                localStorage.setItem("resetEmail", email);
                toast.success("OTP sent successfully");
                setTimeout(() => {
                    navigate('/verifycode');
                }, 2000);
            } else {
                toast.error("Error in sending OTP");
            }

        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Some error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Left Image Section */}
            <div className="relative lg:w-1/2 h-screen">
                <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
                    alt="Background"
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute top-10 left-4">
                    <h2 className="text-white text-3xl font-extrabold">BookMyStay</h2>
                </div>
                <div className="absolute bottom-20 left-6 flex flex-col gap-3">
                    <h2 className="text-gray-300 text-2xl font-bold">Your journey begins here</h2>
                    <p className="text-gray-400 text-sm font-semibold">Find and book your perfect accommodation anywhere in the world.</p>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="bg-white h-screen lg:w-1/2 flex flex-col items-center justify-center px-6 py-8 lg:px-12">
                <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
                <p className="text-sm text-gray-600 mt-1 text-center">
                    Enter your email address and we'll send you a verification code
                </p>

                <form onSubmit={handleSendCode} className="w-full max-w-sm space-y-4 mt-6">
                    <label htmlFor="email" className="text-sm font-semibold">Email</label>
                    <input
                        id="email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full h-10 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm font-semibold"
                    >
                        Send Verification Code
                    </button>

                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        closeOnClick
                        pauseOnHover
                        draggable
                        pauseOnFocusLoss
                        theme="light"
                        toastClassName="text-sm font-semibold text-black"
                    />
                </form>

                <span
                    onClick={() => navigate('/signin')}
                    className="text-blue-600 text-sm cursor-pointer mt-4 font-semibold"
                >
                    ← Back to Sign In
                </span>
            </div>
        </div>
    );
}

export default ForgotPassword;
