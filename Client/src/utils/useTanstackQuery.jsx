import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTanstackQuery = (url,token="") => {
  const config = token
  ? { headers: { Authorization: `Bearer ${token}` } }
  : {};

  const fetchBlogs = async () => {
    const response = await axios.get(url,config);
    return response;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
  return { isPending, isError, data, error };
};

export default useTanstackQuery;
