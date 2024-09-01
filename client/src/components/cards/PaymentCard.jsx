import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { verifyUserPayment } from "../../Redux/slices/razorpaySlice";



function PaymentCard({ course }) {
   
    const dispatch = useDispatch()

  const subscription_id = useSelector(
    (state) => state.razorpay.subscription_id
  );
  const razorPayKey = useSelector((state) => state.razorpay.key);
  const userData = useSelector((state) => state.auth.data);
  const { isPaymentVerified } = useSelector((state) => state.razorpay);



  const navigate = useNavigate();

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
    courseId:course._id
    
  };

  const handleSubscription = async (event) => {
    event.preventDefault();

    // checking for empty payment credential
    if (!razorPayKey || !subscription_id) {
        toast.error('please start again , from fresh')
      return;
    }

    const options = {
      key: razorPayKey,
      subscription_id: subscription_id,
      name: "LearnSphere Pvt.Ltd.",
      description: "annual Subscription",
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        // displaying the success message
        toast.success("Payment Successfull");

        // verifying the payment
         await dispatch(verifyUserPayment(paymentDetails));

        // redirecting the user according to the verification status
        !isPaymentVerified
          ? navigate("/course/checkout/success")
          : navigate("/course/checkout/fail");
      },
      prefill: {
        name: userData.fullName,
        email: userData.email,
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="bg-white shadow-md rounded-md w-[100vw] sm:w-[80vw] md:w-[50vw] lg:w-[30vw] flex flex-col my-3">
      <div className="flex justify-center text-3xl font-bold p-3 border-b-2">
        Order Details
      </div>
      <div className="h-[40vh] p-3 ">
        <img
          src={course?.thumbnail?.secure_url}
          className="w-[100%] h-[100%] border decoration-purple-500"
        />
      </div>
      <div className="p-2 text-sm font-bold ">{course?.title}</div>
      <div className="flex justify-between p-3 ">
        <div className="font-bold">Total Fees :</div>
        <div className="pr-6 space-x-1 flex items-center font-semibold">
          <BiRupee /> {course?.price}
        </div>
      </div>
      <div
        className="flex justify-center pb-4"
        onClick={(event) => {
          handleSubscription(event);
        }}
      >
        <button className="px-4 py-2 bg-purple-500 rounded-md text-white">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default PaymentCard;
