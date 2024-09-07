import React from "react";
import { useState } from "react";
import axios from "axios";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  async function getData(url, method = "get") {
    try {
      const response = await axios({
        method,
        url,
      });

      if (response?.data?.success) {
        setData(response?.data?.blogs);
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
        setError(response?.data?.message);
      }
    } catch (error) {
      setError(error?.response?.data?.message || error.message); // Handle any errors
    } finally {
      setLoading(false); // End loading regardless of success or error
    }
  }

  return { data, getData, error, loading };
};

export default useFetchData;
