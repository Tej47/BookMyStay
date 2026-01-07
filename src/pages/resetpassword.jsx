import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Resetpassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const email = localStorage.getItem('resetEmail');
    const [error, setError] = useState('');

    const handleSendCode = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!email) {
            toast.error("Email is missing. Please restart the reset process.");
            return;
        }

        try {
            const response = await axios.post('https://backend-book-my-stay-production.up.railway.app/api/resetpassword', {
                email,
                newPassword: password,
            });

            if (response.data.message) {
                toast.success("Password changed successfully");
                setTimeout(() => {
                    navigate('/resetsuccess');
                }, 3000);
            } else {
                toast.error("Error in changing password.");
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
                    alt="Reset Background"
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
                <h1 className="text-2xl font-bold mb-2 text-center">Reset Password</h1>
                <p className="text-sm text-gray-600 text-center">Create a new password for your account</p>

                <form onSubmit={handleSendCode} className="w-full max-w-sm space-y-4 mt-6">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <p className="text-xs text-gray-600 mt-1">Password must be at least 8 characters long</p>

                    <button
                        type="submit"
                        className="w-full h-10 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm font-semibold"
                    >
                        Reset Password
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
                    onClick={() => navigate('/verifycode')}
                    className="text-blue-600 text-sm cursor-pointer mt-4 font-semibold"
                >
                    ← Back to Verification
                </span>
            </div>
        </div>
    );
}

export default Resetpassword;
