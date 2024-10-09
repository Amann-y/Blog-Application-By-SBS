import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../blogCard/BlogCard";
import SimmerCard from "../SimmerCard/SimmerCard";
import InfiniteScroll from 'react-infinite-scroll-component';

const ITEMS_PER_PAGE = 3;

const Home = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [currentBlogs, setCurrentBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs using Axios
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5500/api/v1/blog/blogs");
      setBlogs(response?.data?.blogs); // Adjust based on your API response structure
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Fetch blogs on component mount
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      loadMoreBlogs(); // Load initial blogs once
    }
  }, [blogs]);

  const loadMoreBlogs = () => {
    const nextBlogs = blogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    if (nextBlogs.length > 0) {
      // Avoid adding duplicates
      const newBlogs = nextBlogs.filter(blog => !currentBlogs.some(current => current._id === blog._id));
      
      if (newBlogs.length > 0) {
        setCurrentBlogs((prev) => [...prev, ...newBlogs]);
        setCurrentPage((prev) => prev + 1);
      }
    } else {
      setHasMore(false); // No more blogs to load
    }
  };

  if (loading) {
    return <SimmerCard />;
  }

  if (error) {
    return (
      <div>
        <h1 className="text-center my-2 text-2xl text-red-500 font-semibold">
          Error: {error.message || "An unknown error occurred"}
        </h1>
      </div>
    );
  }

  return (
    <section>
      <InfiniteScroll
        dataLength={currentBlogs.length}
        next={loadMoreBlogs}
        hasMore={hasMore}
        loader={<h4 className="text-center text-xl">Loading...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}><b>You have seen it all!</b></p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-2 gap-3 container mx-auto">
          {currentBlogs.map((blogData) => {
            const isMore = expandedItems[blogData._id];
            const trimDescription = blogData?.description.substring(0, 120) + "...";
            return (
              <BlogCard
                key={blogData._id} // Use a unique key
                blogData={blogData}
                isMore={isMore}
                trimDescription={trimDescription}
                setExpandedItems={setExpandedItems}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default Home;






