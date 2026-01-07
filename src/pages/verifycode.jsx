import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Verifycode() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [email] = useState(localStorage.getItem("resetEmail") || '');

    const handleSendCode = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://backend-book-my-stay-production.up.railway.app/api/verifyotp', {
                otp,
                email,
            });

            if (response.data.message) {
                toast.success("OTP successfully verified");
                setTimeout(() => {
                    navigate('/resetpassword');
                }, 3000);
            } else {
                toast.error("Error in verifying OTP");
            }
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Some error occurred. Please try again.");
            }
            console.error(error.response);
        }
    };

    const handleBackToSignIn = () => {
        navigate('/forgotpassword');
    };

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Left Section (Image) */}
            <div className="relative lg:w-1/2 h-screen">
                <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
                    alt="Placeholder"
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

            {/* Right Section (Form) */}
            <div className="bg-white h-screen lg:w-1/2 flex flex-col items-center justify-center px-6 py-8 lg:px-12">
                <h1 className="text-2xl font-bold">Verify Code</h1>
                <p className="text-sm text-gray-600 mt-1 text-center">
                    Enter the verification code sent to your email
                </p>

                <form onSubmit={handleSendCode} className="w-full max-w-sm space-y-4 mt-6">
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        required
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="text-sm text-gray-700">
                        Didn't receive a code?{" "}
                        <span className="text-blue-800 cursor-pointer hover:underline">
                            Resend Code
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-10 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm font-semibold"
                    >
                        Verify Code
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
                        toastClassName={() =>
                            "bg-blue-100 text-blue-800 text-sm font-medium px-6 py-3 rounded-md shadow-sm"
                        }
                    />
                </form>

                <span
                    onClick={handleBackToSignIn}
                    className="text-blue-600 text-sm cursor-pointer mt-4 font-semibold"
                >
                    ← Back to Forgot Password
                </span>
            </div>
        </div>
    );
}

export default Verifycode;
