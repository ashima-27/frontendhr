import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

let orgId;
let userId;
let userName;
let createdBy;
let organizationId;
let token;
let headers;

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const setTokenValues = () => {
  const data = Cookies.get("loginData")
    ? JSON.parse(Cookies.get("loginData"))
    : null;
  console.log("login", data);
  userId = data?.Data?.id;
  userName = data?.Data?.firstName + " " + data?.Data?.lastName;

  organizationId = data?.organizationId;
  token = Cookies.get("token");
  console.log(token);
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const RaiseTicket = createAsyncThunk(
  "ticket/RaiseTicket",
  async (obj, thunkAPI) => {
    try {
      setTokenValues();

      const response = await fetch(`${apiUrl}/${userId}/raiseTicket`, {
        method: "POST",
        headers,
        body: JSON.stringify(obj),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error, "err");
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getAllTicket = createAsyncThunk(
  "ticket/getAllTicket",
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues();
      const response = await fetch(`${apiUrl}/getAllTicket/?searchQuery=${obj?.searchValue}&pageNumber=${obj?.pageNumber}&pageCount=${obj?.perPageCount}&fromDate=${obj?.fromDate}&toDate=${obj?.toDate}`, {
        method: "GET",
        headers,
        
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error, "err");
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async (ticket) => {
    const response = await fetch(`${apiUrl}/${ticket._id}/updateTicket`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });
    const data = await response.json();
    return data;
  }
);

export const getAllTicketById = createAsyncThunk(
  "tickets/getAllTicketById",
  async (obj,thunkAPI) => {
    try{
    setTokenValues();

    console.log(userId,"id",obj)
    const response = await fetch(`${apiUrl}/${userId}/getAllTicketById/?searchQuery=${obj?.searchValue}&pageNumber=${obj?.pageNumber}&pageCount=${obj?.perPageCount}&fromDate=${obj?.fromDate}&toDate=${obj?.toDate}`, {
      method: "GET",
      headers,
      // body: JSON.stringify(obj),
    });
    const data = await response.json();
    return data;
  }catch (error) {
    console.log(error, "err");
    return thunkAPI.rejectWithValue({ error: error.message });
  }}
);
export const updateTicketStatus = createAsyncThunk(
  "tickets/updateTicketStatus",
  async (ticket) => {
    const response = await fetch(`${apiUrl}/${ticket.id}/updateTicketStatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });
    const data = await response.json();
    return data;
  }
);

export const deleteTicket = createAsyncThunk(
  "ticket/deleteTicket",
  async (obj, thunkAPI) => {
    console.log("obj",obj)
    try {
      setTokenValues();
      const response = await fetch(`${apiUrl}/${obj.id}/deleteTicket`, {
        method: "PUT",
        headers,
        body: JSON.stringify(obj),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error, "err");
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const getAllNotifications = createAsyncThunk(
  "ticket/ getAllNotifications",
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues();
      const response = await fetch(`${apiUrl}/getAllNotification/?searchQuery=${obj?.searchValue}&pageNumber=${obj?.pageNumber}&pageCount=${obj?.perPageCount}&fromDate=${obj?.fromDate}&toDate=${obj?.toDate}`, {
        method: "GET",
        headers,
        body: JSON.stringify(obj?.filters),
      });
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error, "err");
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const initialStateValues = {

  isticketSliceFetching: false,
  isticketSliceFetchingSmall: false,
  isticketSliceSuccess: false,
  isticketSliceError: false,
  ticketSliceErrorMessage: '',
  ticketSliceSuccessMessage: '',

  
  allEmployee: [],
 
  notifications: [],
 
  allTicket: [],

  totalDrafts: "",
  totalnotification:"",
  totalTicket:""
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState: initialStateValues,
  reducers: {
    clearticketSliceStates: (state, action) => {
       state.isticketSliceFetching= false;
      state.isticketSliceFetchingSmall= false;
      state.isticketSliceSuccess= false;
      state.isticketSliceError=false;
      state.ticketSliceErrorMessage= '';
      state.ticketSliceSuccessMessage= '';
    },

    clearticketsliceData: (state, action) => {
      state.allTicket = [];
      return state;
    },
    clearnotificationData: (state, action) => {
      state.notifications = [];
      return state;
    },
   
    
  },

  extraReducers: (builder) => {
    builder.addCase(RaiseTicket.fulfilled, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.isticketSliceSuccess = true
      state.ticketSliceSuccessMessage = payload?.Message || 'Ticket Raised Successfully'
      state.isticketSliceFetchingSmall=false;
      return state;
    });

    builder.addCase(RaiseTicket.rejected, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.isticketSliceFetchingSmall=false;
      state.isticketSliceError = true;
      state.ticketSliceErrorMessage =
        payload?.message || "Something Went Wrong";
    });
    builder.addCase(RaiseTicket.pending, (state, { payload }) => {
      state.isticketSliceFetching = true;
      state.isticketSliceFetchingSmall=true;
    });

    builder.addCase(getAllTicket.fulfilled, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.allTicket = [...state.allTicket, ...payload?.Data];
      state.totalTicket=payload.totalCount
      return state;
    });
    builder.addCase(getAllTicket.rejected, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.isticketSliceError = true;
      state.ticketSliceErrorMessage =
        payload?.message || "Something Went Wrong";
    });
    builder.addCase(getAllTicket.pending, (state, { payload }) => {
      state.isticketSliceFetching = true;
    });

    builder.addCase(getAllTicketById.fulfilled, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.allTicket = [...state.allTicket, ...payload?.Data];
   state.totalTicket=payload.totalCount
      return state;
    });
    builder.addCase(getAllTicketById.rejected, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.isticketSliceError = true;
      state.ticketSliceErrorMessage =
        payload?.message || "Something Went Wrong";
    });
    builder.addCase(getAllTicketById.pending, (state, { payload }) => {
      state.isticketSliceFetching = true;
    });

    builder.addCase(updateTicket.fulfilled, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.isticketSliceSuccess = true;
      let ticketIndex = state.allTicket.findIndex(
        (blog) => blog._id === payload.Data._id
      );

      state.allTicket[ticketIndex] = payload?.Data;
      state.isticketSliceFetchingSmall=false;
      state.ticketSliceSuccessMessage = payload?.Message || "Success";
      return state;
    });
    builder.addCase(updateTicket.rejected, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.isticketSliceFetchingSmall=false;
      state.isticketSliceError = true;
      state.ticketSliceErrorMessage = payload?.message || "Something Went Wrong";
    });
    builder.addCase(updateTicket.pending, (state, { payload }) => {
      state.isticketSliceFetching = true;
      state.isticketSliceFetchingSmall=true;
    });

    // CASES FOR DELETE BLOG
    builder.addCase(deleteTicket.fulfilled, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.isticketSliceSuccess = true;
      state.ticketSliceSuccessMessage = payload?.Message;
      state.allTicket = state.allTicket.filter(
        (blog) => blog._id !== payload.Data
      );
      state.isticketSliceFetchingSmall=false;
      return state;
    });
    builder.addCase(deleteTicket.rejected, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.isticketSliceError = true;
      state.isticketSliceFetchingSmall=false;
      state.ticketSliceErrorMessage = payload?.Message || "Something Went Wrong";
    });
    builder.addCase(deleteTicket.pending, (state, { payload }) => {
      state.isticketSliceFetching = true;
      state.isticketSliceFetchingSmall=true;
    });

    builder.addCase(getAllNotifications.fulfilled, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.notifications = [...state.notifications, ...payload?.Data];
      state.totalnotification=payload?.total
      return state;
    });
    builder.addCase(getAllNotifications.rejected, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.isticketSliceError = true;
      state.ticketSliceErrorMessage =
        payload?.message || "Something Went Wrong";
    });
    builder.addCase(getAllNotifications.pending, (state, { payload }) => {
      state.isticketSliceFetching = true;
    });

    builder.addCase(updateTicketStatus.fulfilled, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.isticketSliceSuccess = true;
      let ticketIndex = state.allTicket.findIndex(
        (blog) => blog._id === payload.Data[0]._id
      );
      console.log("ti",ticketIndex,payload.Data[0]._id)

      state.allTicket[ticketIndex] = payload?.Data[0];
      console.log("dfg",state.allTicket)
      state.ticketSliceSuccessMessage = payload?.Message || "Status Updated";
      
      return state;
    });
    builder.addCase(updateTicketStatus.rejected, (state, { payload }) => {
      state.isticketSliceFetching = false;
      state.isticketSliceError = true;
      state.ticketSliceErrorMessage = payload?.message || "Something Went Wrong";
    });
    builder.addCase(updateTicketStatus.pending, (state, { payload }) => {
      state.isticketSliceFetching = true;
    });
  },
});

export const {

  clearnotificationData,
  clearticketsliceData,
  clearticketSliceStates,

} = ticketSlice.actions;
export const ticket = (state) => state.ticket;
export default ticketSlice;
