import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaLongArrowAltDown } from "react-icons/fa";
import { toast } from "react-toastify";
import UserComments from "../components/userComments/UserComments";
import { useRef } from "react";
import "animate.css";
import { useGlobalContext } from "../context/useUserContext";

const SingleBlog = () => {
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState([]);
  const [likeFlag, setLikeFlag] = useState(false);
  const {
    state: {
      imgUrl,
      title,
      description,
      nameOfCreator,
      emailOfCreator,
      categoryTitle,
      createdAt,
      _id,
    },
  } = useLocation();

  const token = localStorage.getItem("Blog-Token");

  const userComment = useRef(null);

  const { userId } = useGlobalContext();

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/v1/comment/all-comments/${_id}`
      );
      if (response?.data?.success) {
        setComments(response?.data?.comments);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/comment/create-comment",
        {
          comment: userComment.current.value,
          blogId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.success) {
        userComment.current.value = "";
        toast.success(response?.data?.message);
        fetchComments();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/v1/comment/delete-comment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.success) {
        // Remove the deleted comment from the state
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== id)
        );
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const likeHandler = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5500/api/v1/blog/user-blog/like/${_id}`,
        {}, // This can be an empty object if no data is needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
     
      if (response?.data?.success) {
        setLike(response?.data?.likes?.likes);
        setLikeFlag(response.data.likes.likes.some(ele=>ele==userId));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const getLikes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/v1/blog/blog-likes/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
     
      if (response?.data?.success) {
        setLike(response?.data?.likes);
        setLikeFlag(response.data.likes.some(ele=>ele._id==userId));
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchComments();
    getLikes();
  }, []);

  return (
    <section className="container mx-auto pb-2">
      <div className="w-full md:h-96 rounded">
        <img
          src={imgUrl}
          alt={title}
          className="object-contain w-full h-auto max-h-96 rounded shadow-md"
        />
      </div>
      <div className=" rounded px-1 mx-1">
        <h2 className="text-center text-xl md:text-2xl drop-shadow animate__animated animate__flipInX animate__slower">
          {title}
        </h2>
        <p className="text-justify dark:text-white/70 text-slate-700">
          {description}
        </p>
      </div>
      <div className="rounded px-2 py-1 md:px-1 flex items-center flex-wrap justify-between mt-1 font-semibold shadow-md animate__animated animate__fadeInRight animate__slower">
        <div className="cursor-pointer flex flex-col" onClick={likeHandler}>
          <i
            className={`fa ${
              likeFlag && "text-red-400"
            } text-2xl md:text-3xl`}
          >
            &#xf087;
          </i>
          <p>{like?.length > 0 && like?.length}</p>
        </div>
        <div className="flex flex-col">
          <p>CreatedBy : {nameOfCreator}</p>
          <p>Email : {emailOfCreator}</p>
        </div>
      </div>

      <div className="mx-1">
        {token && (
          <div className="my-1 py-2 px-2 bg-zinc-300 container mx-auto shadow-md rounded">
            <form
              className="grid grid-cols-1 md:grid-cols-3 gap-2"
              onSubmit={handleSubmit}
            >
              <input
                placeholder="Write Comment"
                type="text"
                required
                ref={userComment}
                className="col-span-2 px-2 py-1 rounded outline-none dark:text-black"
              />
              <button
                type="submit"
                className="col-span-1 dark:text-black bg-green-300 rounded-md py-1 px-2 font-semibold hover:bg-green-400"
              >
                Comment
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="mx-1">
        {comments.length > 0 && (
          <div className="flex items-center justify-center py-1 gap-1 text-xl md:text-2xl border-b-2">
            <p>Users Comments </p>
            <FaLongArrowAltDown />
          </div>
        )}
        {comments.length > 0 &&
          comments?.reverse().map((ele) => {
            return (
              <UserComments
                key={ele._id}
                data={ele}
                handleDelete={handleDelete}
              />
            );
          })}
      </div>
    </section>
  );
};

export default SingleBlog;
