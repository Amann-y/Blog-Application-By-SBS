import React from "react";
import useFetchData from "../../utils/useFetchData";
import { useEffect, useState } from "react";
import BlogCard from "../blogCard/BlogCard";
import SimmerCard from "../SimmerCard/SimmerCard";
import useTanstackQuery from "../../utils/useTanstackQuery";

const Home = () => {
  // const { data, getData, error, loading } = useFetchData();
  const [expandedItems, setExpandedItems] = useState({});

  const {
    isPending: loading,
    isError: error,
    data,
  } = useTanstackQuery("http://localhost:5500/api/v1/blog/blogs");
  const blogs = data?.data?.blogs || []; // Safely access blogs
  // console.log("dd", error);

  // useEffect(() => {
  //   getData("http://localhost:5500/api/v1/blog/blogs");
  // }, []);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-2 gap-3 container mx-auto">
          {blogs?.map((blogData, index) => {
            const isMore = expandedItems[index];
            let trimDescription =
              blogData?.description.substring(0, 120) + "...";
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
      )}
    </section>
  );
};

export default Home;
