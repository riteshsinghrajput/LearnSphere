
import { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Footer from '../../components/footer/Footer'
import { vefifyUser } from "../../Redux/slices/authSlice";

const UserVerify = () => {
  const [message, setMessage] = useState("Verifying...");
  const [status, setStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { userId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const verifyUser = async () => {
      if (!userId) {
        setMessage("Invalid verification link.");
        setStatus("error");
        return;
      }

      try {
        const response = await dispatch(vefifyUser(userId));
        if (response.payload.success) {
          setMessage(response.payload.msg);
          setStatus("success");
        } else {
          setMessage("Verification failed. Please try again.");
          setStatus("error");
        }
      } catch (error) {
        setMessage("Server error. Please try again later.");
        setStatus("error");
      }
    };

    verifyUser();
  }, [location]);

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        {status === "success" && (
          <AiOutlineCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        )}
        {status === "error" && (
          <AiOutlineCloseCircle className="text-red-500 text-5xl mx-auto mb-4" />
        )}
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
        {status === "success" && (
          <a href="/login" className="text-blue-500 hover:underline">
            Go to Login
          </a>
        )}
        {status === "error" && (
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
      <Footer />
      </>
  );
};

export default UserVerify;
