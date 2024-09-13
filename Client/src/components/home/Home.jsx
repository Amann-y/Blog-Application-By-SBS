import React, { useState } from "react";
import useTanstackQuery from "../../utils/useTanstackQuery";
import BlogCard from "../blogCard/BlogCard";
import SimmerCard from "../SimmerCard/SimmerCard";

const ITEMS_PER_PAGE = 6; // Number of items per page

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState({});

  const { isPending: loading, isError: error, data } = useTanstackQuery("http://localhost:5500/api/v1/blog/blogs");
  
  const blogs = data?.data?.blogs || []; // Safely access blogs

  // Calculate the total number of pages
  const totalPages = Math.max(Math.ceil(blogs.length / ITEMS_PER_PAGE), 1); // Ensure at least 1 page

  // Slice the blogs array based on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = blogs.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (error) {
    return (
      <div>
        <h1 className="text-center my-2 text-2xl text-red-500 font-semibold">
          Internal Server Error, Try Again
        </h1>
      </div>
    );
  }

  return (
    <section>
      {loading ? (
        <SimmerCard />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-2 gap-3 container mx-auto">
            {currentBlogs.map((blogData, index) => {
              const isMore = expandedItems[index];
              let trimDescription = blogData?.description.substring(0, 120) + "...";
              return (
                <BlogCard
                  key={index}
                  blogData={blogData}
                  isMore={isMore}
                  trimDescription={trimDescription}
                  setExpandedItems={setExpandedItems}
                  index={index}
                />
              );
            })}
          </div>
          <div className="flex justify-center my-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 mx-2 rounded ${currentPage === 1 ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-400 text-white'}`}
            >
              Previous
            </button>
            <span className="px-4 py-2 mx-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 mx-2 rounded ${currentPage === totalPages ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-400 text-white'}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;



