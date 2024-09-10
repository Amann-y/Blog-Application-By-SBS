import React from "react";
import { convertUTCToIST } from "../../utils/convertUTCToIST";
import { useNavigate } from "react-router-dom";

const BlogCard = ({
  blogData,
  trimDescription,
  isMore,
  setExpandedItems,
  index,
}) => {
  const {
    imgUrl,
    categoryTitle,
    description,
    title,
    nameOfCreator,
    createdAt,
  } = blogData;

  const navigate = useNavigate();

  const toggleMore = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const istDate = convertUTCToIST(createdAt);

  return (
    <div
      className="shadow-lg mx-1 rounded border-2 pb-2 dark:hover:bg-slate-500 hover:bg-zinc-300 cursor-pointer flex flex-col justify-between gap-2"
      onClick={() => navigate("/single-blog", { state: blogData })}
    >
      <img
        src={imgUrl}
        alt={categoryTitle}
        className="w-full h-auto rounded hover:scale-95 transition-all ease-in-out duration-200"
      />
      <h1 className="px-1 text-center font-semibold">{title}</h1>

      <div className="px-2">
        {description.length > 120 ? (
          <div className="">
            <span className="font-thin ">
              {isMore ? description : trimDescription}

              <button
                onClick={() => toggleMore(index)}
                className="font-semibold"
              >
                {isMore ? " ...less" : " more"}
              </button>
            </span>
          </div>
        ) : (
          <span className="font-thin ">{description}</span>
        )}
      </div>

      <div className="px-2">
        <h2>
          Created By : <span className="font-semibold">{nameOfCreator}</span>
        </h2>
        <p>{istDate}</p>
      </div>
    </div>
  );
};

export default BlogCard;
