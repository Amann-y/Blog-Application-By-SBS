import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css"

// Lazy-loaded components
const Navbar = React.lazy(() => import('./components/navbar/Navbar'));
const Home = React.lazy(() => import('./components/home/Home'));
const SingleBlog = React.lazy(() => import('./pages/SingleBlog'));
const Register = React.lazy(() => import('./pages/Register'));
const Login = React.lazy(() => import('./pages/Login'));
const PrivatePages = React.lazy(() => import('./pages/PrivateRoute'));
const CreateBlog = React.lazy(() => import('./pages/CreateBlog'));
const UserBlogs = React.lazy(() => import('./pages/UserBlogs'));
const UpdateBlog = React.lazy(() => import('./pages/UpdateBlog'));
const UserInfo = React.lazy(() => import('./pages/UserInfo'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Footer = React.lazy(() => import('./pages/Footer'));
const About = React.lazy(() => import('./pages/About'));

const App = () => {
  return (
    <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Suspense
        fallback={<div className="text-center text-xl min-h-screen">Loading...</div>}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About/>}/>

          <Route element={<PrivatePages />}>
            <Route path="/single-blog" element={<SingleBlog />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/update-blog" element={<UpdateBlog />} />
            <Route path="/user-blogs" element={<UserBlogs />} />
            <Route path="/user-info" element={<UserInfo />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
