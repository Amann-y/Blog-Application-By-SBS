import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const passwordValue = passwordRef.current.value;
    const confirmPasswordValue = confirmPasswordRef.current.value;

    if (!passwordValue || passwordValue === "") {
      toast.error("Please provide a password");
      setLoading(false);
      return;
    }

    if (!confirmPasswordValue || confirmPasswordValue === "") {
      toast.error("Please provide a Confirm password");
      setLoading(false);
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      toast.error("Password & Confirm password don't match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5500/api/v1/user/reset-password/${id}/${token}`,
        { password: passwordValue, confirmPassword: confirmPasswordValue }
      );

      if (response.data.success) {
        toast.success("Password has been reset successfully");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mx-1 md:mx-0 items-center my-4 bg-gray-100 dark:bg-gray-700">
      <div className="w-full max-w-md p-4 mx-1 md:p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-black">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password" // Change type to password
              id="password"
              ref={passwordRef}
              className="mt-1 block w-full px-3 py-2 border dark:text-black border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password" // Change type to password
              id="confirm-password"
              ref={confirmPasswordRef}
              className="mt-1 block w-full px-3 py-2 border dark:text-black border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
