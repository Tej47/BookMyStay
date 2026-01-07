import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function Resetsuccess() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Left Image Section */}
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

            {/* Right Success Message Section */}
            <div className="bg-white h-screen lg:w-1/2 flex items-center justify-center px-6 py-8 lg:px-12">
                <div className="bg-white w-full max-w-sm rounded-md flex flex-col items-center px-6 py-8 shadow-md">
                    <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{ color: "#4ade80" }} />
                    <h1 className="text-3xl font-bold mt-4">Success!</h1>
                    <p className="text-sm text-gray-600 mt-1 text-center">
                        Your password has been reset successfully.
                    </p>
                    <p className="text-sm text-gray-800 mt-4 text-center">
                        You can now use your new password to sign in to your account.
                    </p>
                    <button
                        onClick={() => navigate('/signin')}
                        className="w-full mt-8 h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 text-sm font-semibold"
                    >
                        Return to Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Resetsuccess;
