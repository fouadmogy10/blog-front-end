import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Create from "./admin/pages/Create";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BlogDetails from "./pages/BlogDetails";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import AddCategory from "./admin/pages/AddCategory";
import AllUsers from "./admin/pages/AllUsers";
import Posts from "./admin/pages/Posts";
import AllCategories from "./admin/pages/AllCat";
import AllComment from "./admin/pages/AllComment";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "./app/features/category/categoryServices";
import { useEffect } from "react";
import "@lottiefiles/lottie-player";
import PrivateRoutesAdmin from "./components/PrivateRoutesAdmin";
import PrivateRoutes from "./components/PrivateRoutes";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/forgetPassword";
import PageNotFound from "./pages/PageNotFound";
import loader from "./assets/loader.json";
import { useLottie } from "lottie-react";
import { getAllPost } from "./app/features/blogs/blogSlice";
const options = {
  loop: true,
  autoplay: true,
  animationData: loader,
};
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog);
  const { View } = useLottie(options);
  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getAllCategories());
  }, []);

  if (blogs?.length <= 0) {
    return (
      <div className="min-h-screen fixed z-[1000000] min-w-full flex items-center justify-center text-black">
        {View}
      </div>
    );
  }
  return (
    <>
      <>
        {location.pathname.includes("/admin") == false && <Navbar />}
        {/* {window.location.pathname.includes("/admin") == false && <Navbar />} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="post/create" element={<PrivateRoutes />}>
            <Route path="/post/create" element={<CreatePost />} />
          </Route>
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />

          <Route path="admin" element={<PrivateRoutesAdmin />}>
            <Route path="/admin/" element={<AllUsers />} />
            <Route path="addCategory" element={<AddCategory />} />
            <Route path="All-posts" element={<Posts />} />
            <Route path="AllCategory" element={<AllCategories />} />
            <Route path="AllComment" element={<AllComment />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {!(
          location.pathname.includes("/admin") ||
          location.pathname.includes("/login") ||
          location.pathname.includes("/register")
        ) && <Footer />}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    </>
  );
}

export default App;
