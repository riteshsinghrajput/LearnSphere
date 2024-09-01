import "../../index.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import PaymentCard from "../../components/cards/PaymentCard";
import Layout from "../../Layout/Layout";
import {
  getRazorPayId,
  purchaseCourseBundle,
} from "../../Redux/slices/razorpaySlice";

function Checkout() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getRazorPayId());
      await dispatch(purchaseCourseBundle(state?._id));
      setLoading(false);
    })();
  }, []);

  return (
    <Layout>
     
 <div className="min-h-[60vh] md:h-[80vh] flex justify-center items-center ">
        {loading ? (
          <div className="flex flex-col justify-center bg-white items-center space-y-3 ">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
            <p className="p-4 text-black font-bold">
              This may take a few seconds, please don&apos;t close this page.
            </p>
          </div>
        ):(
            <>
             <PaymentCard course = {state}/>
            </>
        )}
      
   
         
     </div>
      
    </Layout>
  );
}

export default Checkout;
