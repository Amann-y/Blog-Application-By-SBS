
import React, { useState } from 'react';
import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (otp.length === 0) {
      setError('OTP cannot be empty.');
      return;
    }

    setLoading(true);
    try {
       const response = await axios.post(`http://localhost:5500/api/v1/user/verify-email`,{
        email, otp
       })
    
       if(response?.data?.success){
        toast.success("Email has been verified")
        navigate("/login")
        setEmail("")
        setOtp("")
        setError("")
       }
      } catch (err) {
        setError('Verification failed. Please try again.');
        toast.error(err.response?.data?.message || "Verification failed. Please try again.")
      } finally {
        setLoading(false); // Reset loading state
      }
  };

  return (
    <div className="flex items-center justify-center dark:bg-black bg-gray-100 mx-2 my-2 md:my-0 md:mx-0">
      <div className="bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-black">Verify Your Email</h2>
  
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`mt-1 block w-full p-2 border ${error.includes('email') ? 'border-red-500' : 'border-gray-300'} dark:text-black rounded-md focus:ring focus:ring-blue-300`}
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className={`mt-1 block w-full p-2 border ${error.includes('OTP') ? 'border-red-500' : 'border-gray-300'} dark:text-black rounded-md focus:ring focus:ring-blue-300`}
              placeholder="Enter your OTP"
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`w-full py-2 ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'} text-white rounded-md hover:${loading ? '' : 'bg-blue-700'} transition duration-200`}
          >
            {loading ? 'Verifying...' : 'Verify'} {/* Change button text based on loading state */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
