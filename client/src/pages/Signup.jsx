import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "../assets/Learn_Sphere_logo/logo-no-background.png";
import { createAccount } from "../Redux/slices/authSlice";

function Signup() {
  const dispatch = useDispatch();

  const [previewImage, setImagePreview] = useState("");

  // for user input
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  // function to set the signup data
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };

  // function to create account
  const createNewAccount = async (event) => {
    event.preventDefault();

    // checking the empty fields
    if (
      !signupData.avatar ||
      !signupData.email ||
      !signupData.fullName ||
      !signupData.password ||
      !signupData.confirmPassword
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    // checking the name field length
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters");
      return;
    }

    // email validation using regex
    if (
      !signupData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      toast.error("Invalid email id");
      return;
    }

    // password validation using regex
    if (!signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Password and Confirm Password must be same");
    }

    // creating the form data from the existing data
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);
    formData.append("confirmPassword", signupData.confirmPassword);

    // calling create account action
    const res = await dispatch(createAccount(formData));

    // redirect to login page if true
    if (res?.payload?.success)
      toast("Please , verify your account mail is sent to your email", {
        icon: "ℹ️",
      });

    // clearing the signup inputs
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setImagePreview("");
  };

  return (
    <section className="flex  bg-gradient-to-r from-purple-200 to-purple-600 w-[100vw] min-h-[100vh] m-0 p-0">
      <div className="hidden w-[60%] bg-gradient-to-r from-purple-200 to-purple-600 justify-center items-center md:flex">
        <div className="text-center">
          <img src={Logo} alt="Logo" className="w-32 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2 text-white">
            Registration Page
          </h3>
        </div>
      </div>

      {/* right container */}
      <div className="flex flex-col items-center justify-center px-2 py-4 mx-auto w-[90%] md:w-[40%] md:px-0 md:py-0 md:h-screen lg:py-0 md:bg-white">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              noValidate
              onSubmit={createNewAccount}
            >
              <div className="relative">
                <label
                  className="cursor-pointer relative"
                  htmlFor="image_uploads"
                >
                  {previewImage ? (
                    <img
                      className="w-24 h-24 rounded-full m-auto"
                      src={previewImage}
                      alt="preview image"
                    />
                  ) : (
                    <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                  )}
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  name="image_uploads"
                  accept=".jpg, .jpeg, .png , .JPG,.JPEG,.PNG"
                  onChange={getImage}
                />
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  placeholder="Enter Full Name"
                  required=""
                  name="fullName"
                  value={signupData.fullName}
                  onChange={handleUserInput}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  placeholder="Enter your email"
                  required=""
                  name="email"
                  onChange={handleUserInput}
                  value={signupData.email}
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
                  onChange={handleUserInput}
                  value={signupData.password}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  required=""
                  onChange={handleUserInput}
                  value={signupData.confirmPassword}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 bg-gradient-to-r from-purple-200 to-purple-600"
              >
                Create Account
              </button>
            </form>
            <p className="text-center">
              Have an account ?{" "}
              <Link to={"/login"} className=" text-purple-400 cursor-pointer">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
