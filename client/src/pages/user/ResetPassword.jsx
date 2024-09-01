import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../Redux/slices/authSlice";
import Layout from "../../Layout/Layout";
import toast from "react-hot-toast";


const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
    resetToken: useParams().resetToken,
  });

  // function to handle user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    const newData = { ...data, [name]: value };
    setData(newData);
  };

  // function to handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check the empty field
    if (!data.password || !data.confirmPassword || !data.resetToken) {
      toast.error("All fields are mandatory");
      return;
    }

    // password validation using regex
    if (!data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    // matching the password
    if (data.password !== data.confirmPassword) {
      toast.error("Both password should be same");
      return;
    }

    // calling the api to reset password
    const res = await dispatch(resetPassword(data));

    // redirecting to the login page
    if (res.payload.success) {
      navigate("/login");
    }
  };

  return (
    <Layout>
      {/* forget password container */}
      <div
        onSubmit={handleFormSubmit}
        className="flex items-center justify-center h-[60vh] my-5"
      >
        {/* forget password card */}
        <form className="flex flex-col justify-center gap-6 rounded-lg p-4 text-black w-80 h-[26rem] shadow-[0_0_10px_black]">
          <h1 className="text-center text-2xl font-bold">Reset Password</h1>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="email">
              New Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your new password"
              className="bg-transparent px-2 py-1 border"
              value={data.password}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-semibold" htmlFor="cnfPassword">
              Confirm New Password
            </label>
            <input
              required
              type="password"
              name="confirmPassword"
              id="cnfPassword"
              placeholder="Confirm your new password"
              className="bg-transparent px-2 py-1 border"
              value={data.confirmPassword}
              onChange={handleUserInput}
            />
          </div>

          <button
            className="w-full bg-purple-500 hover:bg-purple-400 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
