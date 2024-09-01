import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from '../../helper/axiosInstance'
import { logout } from "./authSlice";

const initialState = {
  allUsersCount: 0,
  totalActiveSubscriptions: 0,
};

// function to get the stats data from backend
export const getStatsData = createAsyncThunk("getstat", async () => {
  try {
    const res = axiosInstance.get("/misc/admin/stats/users");
    toast.promise(res, {
      loading: "Getting the stats...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to load stats",
    });

    const response = await res;
    return response.data;
  } catch (error) {
    console(error?.response?.data?.message);
  }
});

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
      state.allUsersCount = action?.payload?.allUsersCount;
      state.totalActiveSubscriptions = action?.payload?.totalActiveSubscriptions;
    })
    .addCase(logout.fulfilled, (state, action) => {
      if (action?.payload) {
          localStorage.clear();
          state.allUsersCount = 0;
          state.totalActiveSubscriptions = 0;
      }

  })
  },
});

export default statSlice.reducer;
