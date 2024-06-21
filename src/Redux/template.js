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

export const createtemplate = createAsyncThunk(
  "template/createtemplate",
  async (obj, thunkAPI) => {
    try {
      setTokenValues();

      const response = await fetch(`${apiUrl}/${userId}/createtemplate`, {
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

export const getAlltemplate = createAsyncThunk(
  "template/getAlltemplate",
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues();
      const response = await fetch(`${apiUrl}/getAlltemplate/?searchQuery=${obj?.searchValue}&pageNumber=${obj?.pageNumber}&pageCount=${obj?.perPageCount}&fromDate=${obj?.fromDate}&toDate=${obj?.toDate}`, {
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

export const updatetemplate = createAsyncThunk(
  "templates/updatetemplate",
  async (template) => {
    const response = await fetch(`${apiUrl}/${template._id}/updateTemplate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(template),
    });
    const data = await response.json();
    return data;
  }
);

export const getAlltemplateById = createAsyncThunk(
  "templates/getAlltemplateById",
  async (obj,thunkAPI) => {
    try{
    setTokenValues();

    console.log(userId,"id",obj)
    const response = await fetch(`${apiUrl}/${userId}/getAlltemplateById/?searchQuery=${obj?.searchValue}&pageNumber=${obj?.pageNumber}&pageCount=${obj?.perPageCount}&fromDate=${obj?.fromDate}&toDate=${obj?.toDate}`, {
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
export const updatetemplateStatus = createAsyncThunk(
  "templates/updatetemplateStatus",
  async (template) => {
    const response = await fetch(`${apiUrl}/${template.id}/updateTemplateStatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(template),
    });
    const data = await response.json();
    return data;
  }
);

export const deletetemplate = createAsyncThunk(
  "template/deletetemplate",
  async (obj, thunkAPI) => {
    console.log("obj",obj)
    try {
      setTokenValues();
      const response = await fetch(`${apiUrl}/${obj.id}/deleteTemplate`, {
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

export const sendTemplate = createAsyncThunk(
  "templates/sendTemplate",
  async (template) => {
    const response = await fetch(`${apiUrl}/${userId}/sendEmailTemplate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(template),
    });
    const data = await response.json();
    return data;
  }
);

export const getAllRecepient = createAsyncThunk(
  "template/getAllRecepient",
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues();
      const response = await fetch(`${apiUrl}/allRecepient/?searchQuery=${obj?.searchValue}&pageNumber=${obj?.pageNumber}&pageCount=${obj?.perPageCount}&fromDate=${obj?.fromDate}&toDate=${obj?.toDate}`, {
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
const initialStateValues = {

  istemplateSliceFetching: false,
  istemplateSliceFetchingSmall: false,
  istemplateSliceSuccess: false,
  istemplateSliceError: false,
  templateSliceErrorMessage: '',
  templateSliceSuccessMessage: '',
 
  alltemplate: [],
  allRecepient:[],
  totalRecepient:"",
  totaltemplate:""
};

const templateSlice = createSlice({
  name: "template",
  initialState: initialStateValues,
  reducers: {
    cleartemplateSliceStates: (state, action) => {
       state.istemplateSliceFetching= false;
      state.istemplateSliceFetchingSmall= false;
      state.istemplateSliceSuccess= false;
      state.istemplateSliceError=false;
      state.templateSliceErrorMessage= '';
      state.templateSliceSuccessMessage= '';
    },

    cleartemplatesliceData: (state, action) => {
      state.alltemplate = [];
     state.allRecepient=[];
      return state;
    },
   
    
  },

  extraReducers: (builder) => {
    builder.addCase(createtemplate.fulfilled, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceSuccess = true
      state.templateSliceSuccessMessage = payload?.Message || 'template Raised Successfully'
      state.istemplateSliceFetchingSmall= false;
      return state;
    });

    builder.addCase(createtemplate.rejected, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceError = true;
      state.istemplateSliceFetchingSmall= false;
      state.templateSliceErrorMessage =
        payload?.message || "Something Went Wrong";
    });
    builder.addCase(createtemplate.pending, (state, { payload }) => {
      state.istemplateSliceFetching = true;
      state.istemplateSliceFetchingSmall= true;
    });

    builder.addCase(getAlltemplate.fulfilled, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.alltemplate = [...state.alltemplate, ...payload?.Data];
      state.totaltemplate=payload.totalCount
      return state;
    });
    builder.addCase(getAlltemplate.rejected, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceError = true;
      state.templateSliceErrorMessage =
        payload?.message || "Something Went Wrong";
    });
    builder.addCase(getAlltemplate.pending, (state, { payload }) => {
      state.istemplateSliceFetching = true;
    });

    builder.addCase(getAlltemplateById.fulfilled, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.alltemplate = [...state.alltemplate, ...payload?.Data];
   state.totaltemplate=payload.totalCount
      return state;
    });
    builder.addCase(getAlltemplateById.rejected, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceError = true;
      state.templateSliceErrorMessage =
        payload?.message || "Something Went Wrong";
    });
    builder.addCase(getAlltemplateById.pending, (state, { payload }) => {
      state.istemplateSliceFetching = true;
    });

    builder.addCase(updatetemplate.fulfilled, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceSuccess = true;
      let templateIndex = state.alltemplate.findIndex(
        (blog) => blog._id === payload.Data[0]._id
      );
     
      state.alltemplate[templateIndex] = payload?.Data[0];

      state.templateSliceSuccessMessage = payload?.Message || "Success";
      return state;
    });
    builder.addCase(updatetemplate.rejected, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceError = true;
      state.templateSliceErrorMessage = payload?.message || "Something Went Wrong";
    });
    builder.addCase(updatetemplate.pending, (state, { payload }) => {
      state.istemplateSliceFetching = true;
    });

    // CASES FOR DELETE BLOG
    builder.addCase(deletetemplate.fulfilled, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceSuccess = true;
      state.templateSliceSuccessMessage = payload?.Message;
      state.alltemplate = state.alltemplate.filter(
        (blog) => blog._id !== payload.Data
      );

      return state;
    });
    builder.addCase(deletetemplate.rejected, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceError = true;
      state.templateSliceErrorMessage = payload?.Message || "Something Went Wrong";
    });
    builder.addCase(deletetemplate.pending, (state, { payload }) => {
      state.istemplateSliceFetching = true;
    });

    
    builder.addCase(updatetemplateStatus.fulfilled, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceSuccess = true;
      let templateIndex = state.alltemplate.findIndex(
        (blog) => blog._id === payload.Data[0]._id
      );

      state.alltemplate[templateIndex] = payload?.Data[0];
      console.log("payload",payload.Data._id,templateIndex)
      state.templateSliceSuccessMessage = payload?.Message || "Success";
      return state;
    });
    builder.addCase(updatetemplateStatus.rejected, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceError = true;
      state.templateSliceErrorMessage = payload?.message || "Something Went Wrong";
    });
    builder.addCase(updatetemplateStatus.pending, (state, { payload }) => {
      state.istemplateSliceFetching = true;
    });

    builder.addCase(sendTemplate.fulfilled, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceSuccess = true
      state.templateSliceSuccessMessage = payload?.Message || 'template Raised Successfully'
      state.istemplateSliceFetchingSmall= false;
      return state;
    });

    builder.addCase(sendTemplate.rejected, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceError = true;
      state.istemplateSliceFetchingSmall= false;
      state.templateSliceErrorMessage =
        payload?.message || "Something Went Wrong";
    });
    builder.addCase(sendTemplate.pending, (state, { payload }) => {
      state.istemplateSliceFetching = true;
      state.istemplateSliceFetchingSmall= true;
    });

    builder.addCase(getAllRecepient.fulfilled, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.allRecepient = [...state.allRecepient, ...payload?.Data];
      state.totalRecepient=payload.totalCount
      return state;
    });
    builder.addCase(getAllRecepient.rejected, (state, { payload }) => {
      state.istemplateSliceFetching = false;
      state.istemplateSliceError = true;
      state.templateSliceErrorMessage =
        payload?.message || "Something Went Wrong";
    });
    builder.addCase(getAllRecepient.pending, (state, { payload }) => {
      state.istemplateSliceFetching = true;
    });
  },
});

export const {

  clearnotificationData,
  cleartemplatesliceData,
  cleartemplateSliceStates,

} = templateSlice.actions;
export const template = (state) => state.template;
export default templateSlice;
