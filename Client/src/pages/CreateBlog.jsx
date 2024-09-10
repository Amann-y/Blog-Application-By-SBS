import React, { useState, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const refTitle = useRef(null);
  const refCategoryTitle = useRef(null);
  const refDescription = useRef(null);
  const refImgUrl = useRef(null);

  const token = localStorage.getItem("Blog-Token");

  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !refTitle.current.value ||
      !refCategoryTitle.current.value ||
      !refDescription.current.value ||
      !refImgUrl.current.value
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true); // Set loading state to true before the request

    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/blog/create-blog",
        {
          title: refTitle.current.value,
          description: refDescription.current.value,
          imgUrl: refImgUrl.current.value,
          categoryTitle: refCategoryTitle.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.success) {
        refTitle.current.value = "";
        refDescription.current.value = "";
        refImgUrl.current.value = "";
        refCategoryTitle.current.value = "";
        toast.success(response?.data?.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Set loading state to false after the request
    }
  };

  return (
    <div className="flex justify-center items-center my-2">
      <div className="w-full max-w-xl p-4 bg-slate-200 rounded-lg shadow-lg">
        <h2 className="text-xl dark:text-black md:text-2xl font-bold md:mb-6 text-center animate-bounce">
          {location?.pathname === "/create-blog"
            ? "Create A Blog"
            : ""}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              ref={refTitle}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="categoryTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Category Title
            </label>
            <input
              type="text"
              id="categoryTitle"
              name="categoryTitle"
              ref={refCategoryTitle}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="imgUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image Url
            </label>
            <input
              type="text"
              id="imgUrl"
              name="imgUrl"
              ref={refImgUrl}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              rows={5}
              ref={refDescription}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-md ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-400 hover:text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              disabled={loading} // Disable the button if loading is true
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
