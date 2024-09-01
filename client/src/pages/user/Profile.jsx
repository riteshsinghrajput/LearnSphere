import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Layout from "../../Layout/Layout";
import { getUserData } from "../../Redux/slices/authSlice";


const Profile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.auth?.data);



  useEffect(() => {
    // getting user details
    dispatch(getUserData());
  }, []);
  return (
    <Layout>
      <div className=" flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 min-w-80 border-2">
          <img
            className="w-40 m-auto rounded-full border border-black"
            src={userData?.avatar?.secure_url}
            alt="user profile image"
          />

          <h3 className="text-xl font-semibold text-center capitalize">
            {userData.fullName}
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <p>Email :</p>
            <p>{userData?.email}</p>
            <p>Role :</p>
            <p>{userData?.role === 'INST' ? "INSTRUCTOR" : userData?.role}</p>
           
          </div>

          {/* button to change the password */}
          <div className="flex items-center justify-between gap-2">
            <Link
              to={
                userData?.email === "test@gmail.com"
                  ? "/denied"
                  : "/changepassword"
              }
              className="w-1/2 bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center text-white"
            >
              <button>Change Password</button>
            </Link>

            <Link
              to={
                userData?.email === "test@gmail.com"
                  ? "/denied"
                  : "/user/editprofile"
              }
              className="w-1/2 border border-purple-600 hover:border-purple-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Profile;
