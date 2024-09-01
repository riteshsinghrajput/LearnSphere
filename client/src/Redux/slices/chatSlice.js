import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    conversation: "",
    messages: ""
};

export const setConversation = createAsyncThunk("/coversation/add", async (data) => {

    console.log(data)
    try {
        const res = await axiosInstance.post('/conversation/add', data)
        return res?.data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }

})
export const getConversationDetails = createAsyncThunk("/coversation/get", async (data) => {

    console.log(data)
    try {
        const res = await axiosInstance.post('/conversation/get', data)
        return res?.data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }

})

export const addMessage = createAsyncThunk("/message/add", async (data) => {

    try {
        const res = await axiosInstance.post('/message/add', data)
        return res?.data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }

})
export const getMessage = createAsyncThunk("/message/get", async (conversationId) => {
    try {
        const res = await axiosInstance.post(`/message/get/${conversationId}`)
        return res?.data
    } catch (error) {
        console.log(error)
        return error?.response?.data
    }

})


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getConversationDetails.fulfilled, (state, action) => {
                if (action?.payload?.success) {
                    state.conversation = action?.payload?.data
                }
            })
            .addCase(getMessage.fulfilled, (state, action) => {
                if (action?.payload?.success) {
                    state.messages = action.payload.msg
                }
            })
    }
});

export default chatSlice.reducer;