import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./App.css"
import useOnlineNotification from './utils/useOnlineNotification';
import OnlineNotification from './components/OnlineNotification/OnlineNotification';

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
const ForgotPassword = React.lazy(()=>import('./pages/ForgotPassword'))
const ResetPassword = React.lazy(()=>import('./pages/ResetPassword'))
const EmailVerification = React.lazy(()=>import('./pages/EmailValidation'))

const App = () => {
  const isOnline = useOnlineNotification()

  if(!isOnline){
    return <OnlineNotification/>
  }

  return (
    <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-w-fit">
      <Suspense
        fallback={  <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/api/v1/user/reset/:id/:token" element={<ResetPassword/>}/>
          <Route path="/account/verify-email" element={<EmailVerification/>}/>

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
