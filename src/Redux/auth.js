import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const data =
  Cookies.get("loginData") !== "undefined" && Cookies.get("loginData")
    ? JSON.parse(Cookies.get("loginData"))
    : null;
    let orgId;
    let userId;
    let createdBy;
    let officialEmail;
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const setTokenValues = () => {
  orgId = data.user.Organization.uuid;
  userId = 17;
  createdBy = data.user.uuid;
  officialEmail = data.user.officialEmail;
};

// get login data for change Password functionality
const getTokenValues = () => {
  const data = Cookies.get('loginData')
  ? JSON.parse(Cookies.get('loginData'))
  : null
console.log("login", data)
userId = data?.Data?.id
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (obj, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}/loginUser`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      if (response?.status === 200) {
        console.log(data);
        Cookies.set("loginData", JSON.stringify(data));
        Cookies.set("token", data.Data.token);
        Cookies.set("userName", data.Data.name);
        Cookies.set("userEmail", data.Data.email);
        Cookies.set("role", JSON.stringify(data.Data.role));
    
        console.log(data, "data");
        return data;
      } else {
        console.log(data);
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const changePassword = createAsyncThunk(
  'changePassword',
  async (obj, thunkAPI) => {
    try {
      getTokenValues()

      const response = await fetch(`${apiUrl}/${userId}/changePassword`, {
        method: 'PUT',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      })
      let data = await response.json()
      if (response.status === 200) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      console.log(error, 'err')
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)
export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (obj, thunkAPI) => {
    try {
      getTokenValues()

      const response = await fetch(`${apiUrl}/forgotPassword`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      })
      let data = await response.json()
      if (response.status === 200) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      console.log(error, 'err')
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (obj, thunkAPI) => {
    try {
      getTokenValues()
    console.log("obj",obj)
      const response = await fetch(`${apiUrl}/resetPassword`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      })
      let data = await response.json()
      if (response.status === 200) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      console.log(error, 'err')
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)
const initialStateValues = {
  isAuthSliceFetching: false,
  isAuthSliceSuccess: false,
  isAuthSliceError: false,
  authSliceErrorMessage: "",
  authSliceSuccessMessage:"",
  isAuthSliceFetchingSmall:false,
  isAuthenticated:false,
  ischngeSliceSuccess:false,
  ischngeSliceSuccessMessage:'',
  ischngeSliceError:false,
  ischngeSliceErrorMessage:'',
  user:[]

};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialStateValues,
  reducers: {
    logout: (state, action) => {
      return initialStateValues;
    },
    clearAllSliceStates:(state,action)=>{
      state.authSliceSuccessMessage='';
      state.authSliceErrorMessage='';
      state.isAuthSliceError=false;
      state.isAuthSliceFetching=false;
      state.isAuthSliceFetchingSmall=false;
      state.isAuthSliceSuccess=false;
    }
    },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isAuthSliceFetching = false;
      state.isAuthSliceFetchingSmall=false;
      state.isAuthSliceSuccess = true;
      state.isAuthenticated=true;
      state.user=payload?.Data;
      console.log("us",state.user,payload?.Data)
      return state;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isAuthSliceFetching = false;
      state.isAuthSliceFetchingSmall=false;
      state.isAuthSliceError = true;
      state.authSliceErrorMessage = payload?.Message || "Something Went Wrong";
    });
    builder.addCase(loginUser.pending, (state, { payload }) => {
      state.isAuthSliceFetching = true;
      state.isAuthSliceFetchingSmall=true;
    });

    builder.addCase(changePassword.fulfilled, (state, { payload }) => {
      state.isAuthSliceFetching = false
      state.isAuthSliceFetchingSmall=false
       state.ischngeSliceSuccess = true
      state.ischngeSliceSuccessMessage = payload?.Message || 'Password Successfully changed'
      return state
    })
    builder.addCase(changePassword.rejected, (state, { payload }) => {
      state.isAuthSliceFetching = false
      state.isAuthSliceFetchingSmall=false
      state.ischngeSliceError = true
      state.ischngeSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(changePassword.pending, (state, { payload }) => {
      state.isAuthSliceFetching = true
      state.isAuthSliceFetchingSmall=true
    })

    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.isAuthSliceFetching = false
       state.ischngeSliceSuccess = true
       state.isAuthSliceFetchingSmall=false
      state.ischngeSliceSuccessMessage = payload?.Message || 'Reset Password Mail Sent'
      return state
    })
    builder.addCase(forgotPassword.rejected, (state, { payload }) => {
      state.isAuthSliceFetching = false
      state.ischngeSliceError = true
      state.isAuthSliceFetchingSmall=false
      state.ischngeSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(forgotPassword.pending, (state, { payload }) => {
      state.isAuthSliceFetching = true
      state.isAuthSliceFetchingSmall=true
    })

    builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
      state.isAuthSliceFetching = false
       state.ischngeSliceSuccess = true
       state.isAuthSliceFetchingSmall=false;
      state.ischngeSliceSuccessMessage = payload?.Message || 'Password Successfully changed'
      return state
    })
    builder.addCase(resetPassword.rejected, (state, { payload }) => {
      state.isAuthSliceFetching = false
      state.ischngeSliceError = true
      state.isAuthSliceFetchingSmall=false;
      state.ischngeSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(resetPassword.pending, (state, { payload }) => {
      state.isAuthSliceFetching = true
      state.isAuthSliceFetchingSmall=true
    })
  },
  
});

export const { logout ,clearAllSliceStates} = authSlice.actions;
export default authSlice;
