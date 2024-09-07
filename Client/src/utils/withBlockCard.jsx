import React from "react";
import { useNavigate } from "react-router-dom";

const withBlockCard = (OldComponent) => {
  return (props) => {
    const navigate = useNavigate()
    const handleUpdate = ()=>{
      navigate("/update-blog",{state:props?.blogData})
    }
    return (
      <div className="rounded-md shadow-lg">
        <OldComponent {...props} />
        <div className="flex justify-between items-center gap-2 flex-wrap px-2 py-2">
          <button className="rounded-md px-2 md:px-4 py-1 bg-orange-400 hover:bg-orange-600" onClick={()=>handleUpdate()}>
            Edit
          </button>
          <button
            className="rounded-md px-2 md:px-4 py-1 bg-red-400 hover:bg-red-600"
            onClick={()=>props?.deleteHandle(props?.blogData?._id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
};

export default withBlockCard;
