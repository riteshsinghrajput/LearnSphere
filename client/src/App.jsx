import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import NotRequireAuth from "./components/auth/NotRequireAuth";
import RequireAuth from "./components/auth/RequireAuth";
import About from "./pages/About";
import CancelAndRefundPolicy from "./pages/CancelAndRefundPolicy";
import Contact from "./pages/Contact";
import AddLecture from "./pages/course/AddLecture";
import Course from "./pages/course/Course";
import CourseCategory from "./pages/course/CourseCategory";
import CourseDescription from "./pages/course/CourseDescription";
import CreateCourse from "./pages/course/CreateCourse";
import MyCourse from "./pages/course/MyCourse";
import MyCourseDescription from "./pages/course/MyCourseDescription";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import Denied from "./pages/Denied";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Payment/Checkout";
import PaymentFailure from "./pages/Payment/PaymentFailure";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import Privacy from "./pages/Privacy";
import Signup from "./pages/Signup";
import SupportPage from "./pages/supportTeam/SupportPage";
import TermCondition from "./pages/TermCondition";
import ChangePassword from "./pages/user/ChangePassword";
import EditProfile from "./pages/user/EditProfile";
import ForgetPassword from "./pages/user/ForgetPassword";
import Profile from "./pages/user/Profile";
import ResetPassword from "./pages/user/ResetPassword";
import UserVerify from "./pages/user/UserVerify";

function App() {
  const userData = useSelector((state) => state?.auth?.data);
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
      toast("Right click is disabled", {
        icon: "ℹ️",
      });
    };
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl + Shift + I
        (event.metaKey && event.altKey && event.key === "I") || // Cmd + Option + I (Mac)
        event.key === "F12" // F12
      ) {
        event.preventDefault();
        toast("Inspect shortcut is disabled", {
          icon: "ℹ️",
        });
      }
    };
    if (!userData || (userData.role !== "ADMIN" && userData.role !== "INST")) {
      window.addEventListener("contextmenu", handleContextMenu);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [userData]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Course />} />
        <Route
          path="/courses/category/:category"
          element={<CourseCategory />}
        />
        <Route
          path="/courses/courseDescription/:courseId"
          element={<CourseDescription />}
        />

        <Route path="/verifyUser/:userId" element={<UserVerify />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />

        <Route path="/term-condtion" element={<TermCondition />} />
        <Route path="/cancel-refund" element={<CancelAndRefundPolicy />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        <Route path="/denied" element={<Denied />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/user/profile" element={<Profile />} />

        <Route element={<NotRequireAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path = "/supportTeam/problem" element = {<SupportPage />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN", "INST"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addLecture" element={<AddLecture />} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={["ADMIN", "INST", "USER"]} />}
        >
          <Route path="/course/checkout" element={<Checkout />} />
          <Route path="/course/checkout/success" element={<PaymentSuccess />} />
          <Route path="/course/checkout/fail" element={<PaymentFailure />} />
          <Route path="/mycourse" element={<MyCourse />} />
          <Route
            path="/mycourse/:category/:courseId"
            element={<MyCourseDescription />}
          />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
