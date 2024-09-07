import React from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import SingleBlog from "./pages/SingleBlog";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivatePages from "./pages/PrivateRoute";
import CreateBlog from "./pages/CreateBlog";
import UserBlogs from "./pages/UserBlogs";
import UpdateBlog from "./pages/UpdateBlog";
import UserInfo from "./pages/UserInfo";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div  className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


        <Route element={<PrivatePages />}>
          <Route path="/single-blog" element={<SingleBlog />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/update-blog" element={<UpdateBlog />} />
          <Route path="/user-blogs" element={<UserBlogs />} />
          <Route path="/user-info" element={<UserInfo />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
