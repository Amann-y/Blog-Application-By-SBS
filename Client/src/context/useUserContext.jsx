import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("Blog-Token") || null
  );
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Effect to fetch user data if token exists
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          // Replace with your API endpoint to get user data
          const response = await axios.get(
            "http://localhost:5500/api/v1/user/logged-user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          setUserEmail(response?.data?.user?.email || null);
          setUserName(response?.data?.user?.fullName || null);
          setUserId(response?.data?.user?._id || null);
        } catch (error) {
          toast.error("Failed to fetch user data");
        }
      } else {
        setUserEmail(null);
        setUserName(null);
        setUserId(null);
      }
    };

    fetchUserData();
  }, [token]); // Fetch user data when token changes

  useEffect(() => {
    // Update the theme in the HTML class
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const saveUserData = (token, username, useremail, userid) => {
 
    setToken(token);
    setUserEmail(useremail);
    setUserName(username);
    setUserId(userid);
    localStorage.setItem("Blog-Token", token); // Store token in localStorage
  };

  const removeUserData = () => {
    setToken(null);
    setUserEmail(null);
    setUserName(null);
    setUserId(null);
    localStorage.removeItem("Blog-Token"); // Remove token from localStorage
  };

  return (
    <AppContext.Provider
      value={{ saveUserData, removeUserData, userId, userEmail, userName, theme, toggleTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
