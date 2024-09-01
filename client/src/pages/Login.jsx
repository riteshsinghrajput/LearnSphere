import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/Learn_Sphere_logo/logo-no-background.png"
import { adminLogin, instructorLogin, login } from "../Redux/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginType, setLoginType] = useState("student");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // function to handle the user input
  const handleLoginTypeChange = (event) => {
    setLoginType(event.target.value);
  };
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // function to login
  const handleLogin = async (event) => {
    event.preventDefault();
  
    if (!loginType) {
      return toast.error("Please select type of user");
    }
    // checking the empty fields
    if (!loginData.email || !loginData.password) {
   
      toast.error("Please fill all the fields");
      return;
    }

    let res;
    if (loginType === "student") {
      res = await dispatch(login(loginData));
    } else if (loginType === "instructor") {
      res = await dispatch(instructorLogin(loginData));
    }
    else if(loginType === 'admin'){
      res = await dispatch(adminLogin(loginData))
    }

    // redirect to home page if true
    if (res?.payload?.success && res?.payload?.type !== 'verify') navigate("/");
    else if(res?.payload?.type === 'verfiy'){
      toast("Please , verify your account", {
        icon: "ℹ️",
      });
    }

    // clearing the login inputs
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <section className="flex overflow-hidden bg-gradient-to-r from-purple-200 to-purple-600 w-[100vw] h-[100vh] m-0 p-0">
      <div className="hidden w-[60%] bg-gradient-to-r from-purple-200 to-purple-600 justify-center items-center md:flex">
        <div className="text-center">
          <img src={Logo} alt="Logo" className="w-32 mx-auto mb-4 " />
          <h3 className="text-2xl font-bold mb-2 text-gray-200">Welcome!</h3>
          <p className="text-gray-200">Please login to access the resourse.</p>
        </div>
      </div>

      {/* right container */}
      <div className="flex flex-col items-center justify-center px-2 py-4 mx-auto w-[90%] md:w-[40%] md:px-0 md:py-0 md:h-screen lg:py-0 md:bg-white">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex flex-col justify-center items-center">
              <img src={""} alt="logo" className="md:hidden" />
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Welcome Back !
              </h1>
            </div>

            <form
              className="space-y-4 md:space-y-6"
              noValidate
              onSubmit={(e)=> handleLogin(e)}
            >
              <div className="mb-4 shadow-md  flex justify-around">
                <label className="block mb-2 text-lg cursor-pointer">
                  <input
                    type="radio"
                    value="student"
                    checked={loginType === "student"}
                    onChange={handleLoginTypeChange}
                    className="mr-2 cursor-pointer "
                  />
                  Student
                </label>
                <label className="block mb-2 text-lg cursor-pointer">
                  <input
                    type="radio"
                    value="admin"
                    checked={loginType === "admin"}
                    onChange={handleLoginTypeChange}
                    className="mr-2 cursor-pointer"
                  />
                  Admin
                </label>

                <label className="block mb-2 text-lg cursor-pointer">
                  <input
                    type="radio"
                    value="instructor"
                    checked={loginType === "instructor"}
                    onChange={handleLoginTypeChange}
                    className="mr-2 cursor-pointer "
                  />
                  Instructor
                </label>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  placeholder="Enter Email"
                  required=""
                  name="email"
                  value={loginData?.email}
                  onChange={handleUserInput}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  required=""
                  value = {loginData?.password}
                  onChange={handleUserInput}
                />
              </div>

              <div className="text-center link text-accent cursor-pointer" onClick={()=>setLoginData({email:"test@gmail.com" , password :"Test@123"})}>
                Guest Login
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 bg-gradient-to-r from-purple-200 to-purple-600"
              >
                Login
              </button>
            </form>
            <Link to={"/forgetpassword"}>
              <p className="text-center link text-accent cursor-pointer pt-4">
                Forget Password
              </p>
            </Link>
            <p className="text-center">
              Don&apos;t have an account ?{" "}
              <Link to={"/signup"} className=" text-purple-400 cursor-pointer">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
