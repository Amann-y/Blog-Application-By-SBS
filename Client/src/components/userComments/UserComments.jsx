import React, { useState, useCallback } from "react";
import { FaRegUser } from "react-icons/fa";
import { convertUTCToIST } from "../../utils/convertUTCToIST";
import { useGlobalContext } from "../../context/useUserContext";
import Modal from "../../utils/Modal"; 
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserComments = ({ data, handleDelete }) => {

  const { userId, userName: name } = useGlobalContext();
  const { comment, userName, createdAt, createdBy,updatedAt, _id } = data;

  const token = localStorage.getItem("Blog-Token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment); // Initialize with current comment
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const navigate = useNavigate();

  const handleUpdate = useCallback(async () => {
    if (updatedComment.trim() === "") {
      return toast.error("Field shouldn't be empty");
    }

    setIsLoading(true); // Start loading
    try {
      const response = await axios.patch(
        `http://localhost:5500/api/v1/comment/edit-comment/${_id}`,
        { comment: updatedComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false); // Stop loading
    }
  }, [updatedComment, _id, token, navigate]);

  return (
    <section className="container border mx-auto my-2 rounded shadow-md px-2">
      <div className="gap-1 flex-wrap py-1 flex items-center justify-between px-2">
        <div className="flex flex-col gap-2 flex-wrap">
          <p>{comment}</p>
          <div className="flex justify-start items-center gap-2 flex-wrap">
            <FaRegUser />
            <p>{userName}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-wrap">
          {(updatedAt || createdAt) && convertUTCToIST(updatedAt || createdAt)}
          {userId === createdBy && name === userName && (
            <div className="flex justify-start items-center gap-2 md:gap-5 flex-wrap">
              <button
                className="bg-orange-400 px-2 py-1 rounded shadow-sm hover:bg-orange-500"
                onClick={openModal}
              >
                Edit
              </button>
              <button
                className="bg-red-400 px-2 py-1 rounded shadow-sm hover:bg-red-500"
                onClick={() => handleDelete(_id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal should only render when `isModalOpen` is true */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <textarea
              rows="3"
              className="w-full py-1 outline-none bg-zinc-300 px-1 rounded text-black"
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className={`bg-violet-500 hover:bg-violet-700 font-semibold px-1 py-1 rounded-md ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </form>
        </Modal>
      )}
    </section>
  );
};

export default UserComments;

