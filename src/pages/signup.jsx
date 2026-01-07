import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, terms } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!terms) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post('https://backend-book-my-stay-production.up.railway.app/api/signup', {
        name,
        email,
        password,
      });

      if (response.data.message) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        toast.error(response.data.message || "Error creating account.");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMsg);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="relative flex h-screen w-full">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
          alt="Placeholder"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute top-10 left-4 flex bg-opacity-40">
          <h2 className="text-white text-3xl font-extrabold">BookMyStay</h2>
        </div>
        <div className='absolute bottom-20 left-6 flex flex-col gap-3 bg-opacity-40'>
          <h2 className='text-gray-300 text-2xl font-bold'>Your journey begins here</h2>
          <p className='text-gray-400 text-sm font-semibold'>Find and book your perfect accommodation anywhere in the world.</p>
        </div>
      </div>
      <div className="bg-white h-screen w-full flex flex-col items-center justify-center px-4 md:px-10">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-sm text-gray-600 mt-1">Sign up for your BookMyStay account</p>
        <form className="w-full max-w-md space-y-4 mt-6" onSubmit={handleSubmit}>
          <label className="text-sm font-semibold">Full name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500">Password must be at least 8 characters long</p>
          <label className="text-sm font-semibold">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="terms"
              checked={formData.terms}
              onChange={handleChange}
              name="terms"
              className="mr-2 w-4 h-4"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the <span className="text-blue-600 underline cursor-pointer">Terms of Service</span> and <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm font-semibold"
          >
            Sign Up
          </button>

          <p className="text-xs text-gray-700 mt-1">Or continue with</p>
        </form>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button onClick={() => toast.info('Google login functionality will be implemented soon')} className="w-28 h-10 border border-gray-300 rounded-md text-sm font-semibold flex items-center justify-center space-x-2">
            <FontAwesomeIcon icon={faGoogle} style={{ color: "#b12020" }} />
            <span>Google</span>
          </button>
          <button onClick={() => toast.info('Facebook login functionality will be implemented soon')} className="w-28 h-10 border border-gray-300 rounded-md text-sm font-semibold flex items-center justify-center space-x-2">
            <FontAwesomeIcon icon={faSquareFacebook} style={{ color: "#1877F2" }} />
            <span>Facebook</span>
          </button>
          <button onClick={() => toast.info('Apple login functionality will be implemented soon')} className="w-28 h-10 border border-gray-300 rounded-md text-sm font-semibold flex items-center justify-center space-x-2">
            <FontAwesomeIcon icon={faApple} style={{ color: "#0c7946" }} />
            <span>Apple</span>
          </button>
        </div>

        <p className="text-sm mt-3">
          Already have an account?{' '}
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signin')}>
            Sign In
          </span>
        </p>

        <ToastContainer toastClassName="text-sm font-semibold text-black" position="bottom-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default SignUp;
