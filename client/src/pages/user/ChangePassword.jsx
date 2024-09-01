import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Layout from '../../Layout/Layout'
import { changePassword } from "../../Redux/slices/authSlice";



const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // function to handle input box change
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
  };

  // function to handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // checking the fields are empty or not
    if (!userPassword.oldPassword || !userPassword.newPassword || !userPassword.confirmPassword) {
      toast.error("All fields are mandatory");
      return;
    }
     
    if(userPassword.newPassword !== userPassword.confirmPassword){
        return toast.error('New Password and confirm password must be same')
    }
    // validating the password using regex
    if (
      !userPassword.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)
    ) {
     toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    // calling the api from auth slice
    const res = await dispatch(changePassword(userPassword));

    // clearing the input fields
    setUserPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword : ""
    });

    // redirecting to profile page if password changed
    if (res.payload.success) navigate("/user/profile");
  };

  return (
    <Layout>
      {/* forget password container */}
      <div className="flex items-center justify-center my-3">
        {/* forget password card */}
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center space-y-6 rounded-lg p-4  w-80  shadow-[0_0_10px_black]"
        >  
     
          <h1 className="text-center text-2xl font-bold">Change Password</h1>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="oldPassword">
              Old Password
            </label>
            <input
              required
              type="password"
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter your old password"
              className="bg-transparent px-2 py-1 border"
              value={userPassword.oldPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="newPassword">
              New Password
            </label>
            <input
              required
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter your new password"
              className="bg-transparent px-2 py-1 border"
              value={userPassword.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              required
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your new password"
              className="bg-transparent px-2 py-1 border"
              value={userPassword.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>

          <Link to={"/user/profile"}>
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
              <AiOutlineArrowLeft /> Back to Profile
            </p>
          </Link>

          <button
            className="w-full text-white bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer mb-4"
            type="submit"
          >
            Change Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ChangePassword;
