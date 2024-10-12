import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateBlog = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: location?.state?.title || "",
    categoryTitle: location?.state?.categoryTitle || "",
    description: location?.state?.description || "",
    imgUrl: location?.state?.imgUrl || "",
  });

  const token = localStorage.getItem("Blog-Token");
  const navigate = useNavigate();

  // Redirect if location state is invalid
  if (!location?.state || !token) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.title ||
      !data.categoryTitle ||
      !data.description ||
      !data.imgUrl
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:5500/api/v1/blog/user-blog/${location?.state?._id}`,
        data,
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
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center my-2 mx-2">
      <div className="w-full max-w-xl p-4 bg-slate-300 rounded-lg mb-2 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold md:mb-6 text-center animate-bounce dark:text-black">
          {location?.pathname === "/update-blog" ? "Update A Blog" : ""}
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
              value={data.title}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-black"
              onChange={handleChange}
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
              value={data.categoryTitle}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-black"
              onChange={handleChange}
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
              value={data.imgUrl}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-black"
              onChange={handleChange}
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
              id="description"
              name="description"
              rows={5}
              value={data.description}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-black"
              onChange={handleChange}
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
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
