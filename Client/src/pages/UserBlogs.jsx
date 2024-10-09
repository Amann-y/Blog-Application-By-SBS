import React, { useState } from 'react';
import useTanstackQuery from '../utils/useTanstackQuery';
import BlogCard from '../components/blogCard/BlogCard';
import withBlockCard from '../utils/withBlockCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from "react-toastify";

const UserBlogs = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const token = localStorage.getItem("Blog-Token");

  const { isFetching: loading, isError, data } = useTanstackQuery('http://localhost:5500/api/v1/blog/user-blog', token);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:5500/api/v1/blog/user-blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']); // Assuming 'blogs' is the query key for fetching blogs
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message)
    }
  });

  const UpdatedBlockCardComponent = withBlockCard(BlogCard);

  if (isError) {
    return (
      <div>
        <h1>{isError.message || 'An error occurred'}</h1>
      </div>
    );
  }

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <section>
      {loading ? (
        <div><h1 className="text-2xl my-2 text-center">Loading...</h1></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-2 gap-3 container mx-auto">
          {data?.data?.blogs.length > 0 ? data?.data?.blogs?.map((blogData, index) => {
            const isMore = expandedItems[index];
            const trimDescription =
              blogData?.description.substring(0, 120) + "...";
            return (
              <UpdatedBlockCardComponent
                key={blogData._id}
                blogData={blogData}
                isMore={isMore}
                trimDescription={trimDescription}
                setExpandedItems={setExpandedItems}
                index={blogData._id}
                deleteHandle={handleDelete}
              />
            );
          }) : (
            <div><h1 className="text-2xl my-2 text-center">No Blog! </h1></div>
          )}
        </div>
      )}
    </section>
  );
};

export default UserBlogs;
