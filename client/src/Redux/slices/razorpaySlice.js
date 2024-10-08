import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../helper/axiosInstance";
import { logout } from "./authSlice";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

// function to get the api key
export const getRazorPayId = createAsyncThunk("/razorPayId/get", async () => {
  try {
    const res = await axiosInstance.get("/courses/subscription/razorpay-key");
    return res.data;
  } catch (error) {
    toast.error("Failed to load data");
  }
});

// function to purchase the course bundle
export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async (courseId) => {
    try {
      const res = await axiosInstance.post(`/courses/subscription/subscribe/${courseId}`);
      return res.data;
    } catch (error) {
      toast.error('server error , try again');
    }
  }
);

// function to verify the user payment
export const verifyUserPayment = createAsyncThunk(
  "/verifyPayment",
  async (paymentDetail) => {
    try {
      const res = await axiosInstance.post(`/courses/subscription/verify/${paymentDetail.courseId}`, {
        razorpay_payment_id: paymentDetail.razorpay_payment_id,
        razorpay_subscription_id: paymentDetail.razorpay_subscription_id,
        razorpay_signature: paymentDetail.razorpay_signature,
      });
      return res?.data;
    } catch (error) {
      toast.error("error?.response?.data?.message");
    }
  }
);

export const getPaymentRecord = createAsyncThunk("paymentrecord", async () => {
  try {
    const res = axiosInstance.get("/courses/subscription?count=100");
    toast.promise(res, {
      loading: "Getting the payments record...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to get payment records",
    });

    const response = await res;
    return response.data;
  } catch (error) {
    toast.error("Operation failed");
  }
});



const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.rejected, () => {
        toast.error("Failed to get razor pay id");
      })
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.error(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      })
      .addCase(logout.fulfilled, (state, action) => {
        if (action?.payload) {
            state.key = "",
            state.subscription_id =  "";
            state.isPaymentVerified =  false;
            state.allPayments = {};
            state.finalMonths = {};
            state.monthlySalesRecord = [];
        }

    })
  },
});

export default razorpaySlice.reducer;
