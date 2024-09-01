import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../helper/axiosInstance";

let isLoggedIn = false;
let isVerifyUser = "";
let data = {};

try {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn) {
        isLoggedIn = JSON.parse(storedIsLoggedIn);
    }
} catch (error) {
    console.error("Error parsing isLoggedIn:", error);
}

try {
    const storedData = localStorage.getItem("data");
    if (storedData) {
        data = JSON.parse(storedData);
    }
} catch (error) {
    console.error("Error parsing data:", error);
}

const initialState = {
    isLoggedIn,
    data,
    isVerifyUser
};




// function to handle signup
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        let res = axiosInstance.post("user/register", data);

        toast.promise(res, {
            loading: "Wait! Creating your account",
            success: (data) => {
                console.log(data)
                return data?.data?.msg;
            },
            error: (err) => {
                // Check if there's a response with an error message
                if (err.response && err.response.data && err.response.data.msg) {
                    return `${err.response.data.msg}`;
                } else {
                    // Generic error message
                    return `Failed to create account`;
                }
            },
        });

        // getting response resolved here
        res = await res;
        return res.data;
    } catch (error) {
        console(error);
    }
});

// function to handle login
export const login = createAsyncThunk("auth/login", async (data) => {
    try {
        let res = axiosInstance.post("/user/login", data);
        toast.promise(res, {
            loading: "Wait! Login ....",
            success: (data) => {
                return data?.data?.msg;
            },
            error: (err) => {
                // Check if there's a response with an error message
                if (err.response && err.response.data && err.response.data.msg) {
                    return `${err.response.data.msg}`;
                } else {
                    // Generic error message
                    return `Failed to Login`;
                }
            },
        });

        res = await res;
        return res.data;
    } catch (error) {
        console.log(error.message)

    }
});

// function to fetch user data
export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = await axiosInstance.get("/user/me");
        return res?.data;
    } catch (error) {
        console.log(error)
        toast.error(error.message);
    }
});

// function to handle logout
export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        let res = axiosInstance.put("/user/logout");

        toast.promise(res, {
            loading: "Wait! logout ....",
            success: (data) => {
                return data?.data?.msg;
            },
            error: (err) => {
                // Check if there's a response with an error message
                if (err.response && err.response.data && err.response.data.msg) {
                    return `${err.response.data.msg}`;
                } else {
                    // Generic error message
                    return `Failed to Log out`;
                }
            },
        });

        // getting response resolved here
        res = await res;
        return res.data;
    } catch (error) {
        console(error.message);
    }
});
export const vefifyUser = createAsyncThunk("auth/verfiyUser", async (userId) => {
    try {
        let res = axiosInstance.post(`/user/verify/${userId}`);



        // getting response resolved here
        res = await res;
        console.log(res)
        return res.data;
    } catch (error) {
        console(error.message);
    }
});

// function to handle forget password
export const forgetPassword = createAsyncThunk(
    "auth/forgetPassword",
    async (email) => {
        try {
            let res = axiosInstance.post("/user/reset", { email });

            await toast.promise(res, {
                loading: "Loading...",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to send verification email",
            });

            // getting response resolved here
            res = await res;
            return res.data;
        } catch (error) {
            console(error?.response?.data?.message);
        }
    }
);
export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
    try {
        let res = axiosInstance.post(`/user/reset/${data.resetToken}`, {
            password: data.password,
            confirmPassword: data.confirmPassword
        });

        toast.promise(res, {
            loading: "Updation...",
            success: (data) => {
                return data?.data?.msg;
            },
            error: "Failed to reset password",
        });
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (error) {
        console.log(error?.response?.data?.message);
    }
});

export const instructorLogin = createAsyncThunk('/admin/inst/login', async (data) => {
    try {
        let res = axiosInstance.post("/admin/inst/login", data);
        toast.promise(res, {
            loading: "Wait! Login ....",
            success: (data) => {
                return data?.data?.msg;
            },
            error: (err) => {
                // Check if there's a response with an error message
                if (err.response && err.response.data && err.response.data.msg) {
                    return `${err.response.data.msg}`;
                } else {
                    // Generic error message
                    return `Failed to Login`;
                }
            },
        });

        res = await res;
        return res.data;
    } catch (error) {
        console.log(error.message)

    }
})
export const adminLogin = createAsyncThunk('/admin/login', async (data) => {
    try {
        let res = axiosInstance.post("/admin/login", data);
        toast.promise(res, {
            loading: "Wait! Login ....",
            success: (data) => {
                return data?.data?.msg;
            },
            error: (err) => {
                // Check if there's a response with an error message
                if (err.response && err.response.data && err.response.data.msg) {
                    return `${err.response.data.msg}`;
                } else {
                    // Generic error message
                    return `Failed to Login`;
                }
            },
        });

        res = await res;
        return res.data;
    } catch (error) {
        console.log(error.message)

    }
})

// function to update user profile
export const updateProfile = createAsyncThunk(
    "/user/update/profile",
    async (data) => {
        try {
            let res = axiosInstance.put(`/user/update`, data);

            toast.promise(res, {
                loading: "Updating...",
                success: (data) => {
                    return data?.data?.msg;
                },
                error: "Failed to update profile",
            });
            // getting response resolved here
            res = await res;
            return res.data;
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    }
);

export const changePassword = createAsyncThunk(
    "/auth/changePassword",
    async (userPassword) => {
        try {
            let res = axiosInstance.post("/user/change_password", userPassword);

            await toast.promise(res, {
                loading: "Loading...",
                success: (data) => {
                    return data?.data?.message;
                },
                error: (err) => {
                    // Check if there's a response with an error message
                    if (err.response && err.response.data && err.response.data.msg) {
                        return `${err.response.data.msg}`;
                    } else {
                        // Generic error message
                        return `Failed to change password , try again`;
                    }
                },
            });

            // getting response resolved here
            res = await res;
            return res.data;
        } catch (error) {
           console.log(error?.response?.data?.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.fulfilled, (state, action) => {
                console.log(action)
                if (action?.payload) {
                    state.isVerifyUser = false
                }
                else {
                    localStorage.clear();
                    state.isLoggedIn = false;
                    state.data = {};
                }
            })
            .addCase(vefifyUser.fulfilled, (state, action) => {
                if (action?.payload) {
                    isVerifyUser = true
                }
            })
            // for user login
            .addCase(login.fulfilled, (state, action) => {
                if (action?.payload && action.payload?.success && action?.payload?.type !== "verify") {
                    localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                    localStorage.setItem("isLoggedIn", true);
                    state.isLoggedIn = true;
                    state.data = action?.payload?.user;
                }
                else {
                    localStorage.clear();
                    state.isLoggedIn = false;
                    state.data = {};
                }
            })
            // for inst login
            .addCase(instructorLogin.fulfilled, (state, action) => {
                if (action?.payload && action.payload?.success) {
                    localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                    localStorage.setItem("isLoggedIn", true);
                    state.isLoggedIn = true;
                    state.data = action?.payload?.user;
                }
                else {
                    localStorage.clear();
                    state.isLoggedIn = false;
                    state.data = {};
                }
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                if (action?.payload && action.payload?.success) {
                    localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                    localStorage.setItem("isLoggedIn", true);
                    state.isLoggedIn = true;
                    state.data = action?.payload?.user;
                }
                else {
                    localStorage.clear();
                    state.isLoggedIn = false;
                    state.data = {};
                }
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                if (action?.payload && action.payload?.success) {
                    localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                    localStorage.setItem("isLoggedIn", true);
                    state.isLoggedIn = true;
                    state.data = action?.payload?.user;
                }
                else {
                    localStorage.clear();
                    state.isLoggedIn = false;
                    state.data = {};
                }
            })
            // for user logout
            .addCase(logout.fulfilled, (state, action) => {
                if (action?.payload) {
                    localStorage.clear();
                    state.isLoggedIn = false;
                    state.data = "";
                }

            })

    },
});

export default authSlice.reducer;
