import React, { useState, useEffect } from "react";
import useTanstackQuery from "../../utils/useTanstackQuery";
import BlogCard from "../blogCard/BlogCard";
import SimmerCard from "../SimmerCard/SimmerCard";
import InfiniteScroll from 'react-infinite-scroll-component';

const ITEMS_PER_PAGE = 3; // Number of items per page

const Home = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [currentBlogs, setCurrentBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending: loading, isError, error, data } = useTanstackQuery("http://localhost:5500/api/v1/blog/blogs");
  
  const blogs = data?.data?.blogs || []; // Safely access blogs

  useEffect(() => {
    if (blogs.length > 0) {
      loadMoreBlogs(); // Load initial blogs
    }
  }, [blogs]);

  const loadMoreBlogs = () => {
    const nextBlogs = blogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    
    if (nextBlogs.length > 0) {
      setCurrentBlogs((prev) => [...prev, ...nextBlogs]);
      setCurrentPage((prev) => prev + 1);
    } else {
      setHasMore(false); // No more blogs to load
    }
  };

  if (isError) {
    return (
      <div>
        <h1 className="text-center my-2 text-2xl text-red-500 font-semibold">
          Error: {error?.message || "An unknown error occurred"}
        </h1>
      </div>
    );
  }

  return (
    <section>
      {loading ? (
        <SimmerCard />
      ) : (
        <InfiniteScroll
          dataLength={currentBlogs.length}
          next={loadMoreBlogs}
          hasMore={hasMore}
          loader={<h4 className="text-center text-xl">Loading...</h4>}
          endMessage={<p style={{ textAlign: 'center' }}><b>You have seen it all!</b></p>}
        >
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
        </InfiniteScroll>
      )}
    </section>
  );
};

export default Home;




