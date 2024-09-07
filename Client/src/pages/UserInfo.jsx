import React, { useState, useCallback } from "react";
import { useGlobalContext } from "../context/useUserContext";
import Modal from "../utils/Modal";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const { userName, userEmail, userid } = useGlobalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const navigate = useNavigate();
  const token = localStorage.getItem("Blog-Token");

  const { removeUserData } = useGlobalContext();

  const handleUpdate = useCallback(async () => {
    if (password.trim() !== passwordConfirmation.trim()) {
      return toast.error("Password & Confirm Password don't match");
    }
  
    setIsLoading(true); // Start loading
    try {
      const response = await axios.put(
        `http://localhost:5500/api/v1/user/change-password`,
        { password, password_confirmation: passwordConfirmation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        // Clear password fields after successful response
        setPassword("");
        setPasswordConfirmation("");
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // Stop loading
    }
  }, [password, passwordConfirmation, token, navigate]);

  const deleteHandle = async () => {
    // Confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete your account?");
    if (!isConfirmed) return; // Exit if the user cancels

    setIsLoading(true); // Start loading
    try {
      const response = await axios.delete(`http://localhost:5500/api/v1/user/delete-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        removeUserData();
        localStorage.removeItem("Blog-Token");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <section className="my-2 px-2 md:py-5 container mx-auto flex flex-col md:flex-row gap-2 py-2">
      <div className="basis-1/2 shadow-md rounded flex justify-center sm:justify-between gap-2 flex-wrap items-center text-xl md:text-2xl py-3 md:py-0">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
          alt="profile-image"
        />
        <div className="px-4 animate__animated animate__backInDown animate__slower mb-2 lg:mb-0">
          Namaste <span>{userName}</span>
        </div>
      </div>

      <div className="basis-1/2 flex flex-col items-center shadow-md rounded gap-3 py-3">
        <h1 className="text-xl md:text-2xl"> User Detail</h1>
        <h2>Email : {userEmail}</h2>
        <div className="flex justify-between flex-wrap items-center gap-5">
          <button
            className={`px-4 py-2 bg-gradient-to-r from-orange-500 via-purple-400 to-pink-300 text-white rounded-md hover:text-black animate__animated animate__pulse animate__slower`}
            onClick={openModal}
          >
            Change Password
          </button>

          <button
            className={`px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-md hover:text-black animate__animated animate__pulse animate__slower`}
            onClick={deleteHandle} // Call deleteHandle on click
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Modal should only render when `isModalOpen` is true */}
      {isModalOpen && (
        <Modal onClose={closeModal} type={"changePassword"}>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <div>
              <label>Password</label>
              <input
                required
                className="w-full py-1 outline-none bg-zinc-300 px-1 rounded text-black"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>

            <div>
              <label>Confirm Password</label>
              <input
                required
                className="w-full py-1 outline-none bg-zinc-300 px-1 rounded text-black"
                value={passwordConfirmation}
                placeholder="Confirm Password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                type="password"
              />
            </div>

            <button
              type="submit"
              className={`bg-violet-500 hover:bg-violet-700 font-semibold px-1 py-1 rounded-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </Modal>
      )}
    </section>
  );
};

export default UserInfo;
