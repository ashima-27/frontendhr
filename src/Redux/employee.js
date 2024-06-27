import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

let orgId
let userId
let userName
let createdBy
let organizationId
let token
let headers

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const setTokenValues = () => {
  const data = Cookies.get('loginData')
    ? JSON.parse(Cookies.get('loginData'))
    : null
  console.log("login", data)
  userId = data?.Data?.id
  userName = data?.Data?.firstName + ' ' + data?.Data?.lastName

  organizationId = data?.organizationId
  token = Cookies.get('token')
  console.log(token);
  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

export const getAllEmployee = createAsyncThunk(
  'employee/getAllEmployee',
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/getAllEmployees/?searchQuery=${obj?.searchValue}&pageNumber=${obj?.pageNumber}&pageCount=${obj?.perPageCount}`, {
        method: "GET",
        headers,
        body: JSON.stringify(obj?.filters),
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

export const getAllDepartments = createAsyncThunk(
  'employee/getAllDepartments',
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/getAllDepartments`, {
        method: "GET",
        headers,
        body: JSON.stringify(obj?.filters),
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
export const getAllProjects = createAsyncThunk(
  'employee/getAllProjects',
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/getAllProjects`, {
        method: "GET",
        headers,
        body: JSON.stringify(obj?.filters),
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
export const getAllPositions = createAsyncThunk(
  'employee/getAllPositions',
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/${obj.departmentId}/getAllPositions`, {
        method: "GET",
        headers,
        body: JSON.stringify(obj?.filters),
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
export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      const formData = new FormData();

      for (let key in obj) {
        if (key === 'image' && obj[key]) {
          formData.append(key, obj[key]);
        } else {
          formData.append(key, obj[key]);
        }
      }


      const response = await fetch(`${apiUrl}/addEmployee`, {
        method: 'POST',
        body: formData,
      });

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

export const ScheduleMeeting = createAsyncThunk(
  'employee/ScheduleMeeting',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()

      const response = await fetch(`${apiUrl}/${userId}/scheduleMeeting`, {
        method: 'POST',
        headers,
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

export const updateMeeting = createAsyncThunk(
  'employee/updateMeeting',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()

      const response = await fetch(`${apiUrl}/${obj.id}/updateMeeting`, {
        method: 'PUT',
        headers,
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

export const getAllMeeting = createAsyncThunk(
  'employee/getAllMeeting',
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/getAllMeeting/?pageNumber=${obj?.pageNumber}&pageCount=${obj?.perPageCount}&fromDate=${obj?.fromDate}&toDate=${obj?.toDate}`, {
        method: "GET",
        headers,
        body: JSON.stringify(obj?.filters),
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


export const getAllMeetingById = createAsyncThunk(
  'employee/getAllMeetingById',
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/${userId}/getAllMeetingById/?pageNumber=${obj?.pageNumber}&pageCount=${obj?.perPageCount}&fromDate=${obj?.fromDate}&toDate=${obj?.toDate}`, {
        method: "GET",
        headers,
        body: JSON.stringify(obj?.filters),
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


export const getEmployeeById = createAsyncThunk(
  'employee/getEmployeeById',
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/${obj?.id}/getEmployeeById`, {
        method: "GET",
        headers,

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

export const getProfile = createAsyncThunk(
  'employee/getProfile',
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/${userId}/getEmployeeById`, {
        method: "GET",
        headers,

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

export const makeActiveInactive = createAsyncThunk(
  'employee/makeActiveInactive',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      const newStatus = obj.status === "Active" ? "Inactive" : "Active";
      const response = await fetch(`${apiUrl}/${obj?.id}/${newStatus}/makeActiveInactive`, {
        method: 'PUT',
        headers,
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

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (obj, thunkAPI) => {
    console.log("obj", obj)
    try {

      const response = await fetch(`${apiUrl}/${obj._id}/updateEmployee`, {
        method: "PUT",
        headers,
        body: JSON.stringify(obj)
      });

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

  isemployeeSliceFetching: false,
  isemployeeSliceFetchingSmall: false,
  isemployeeSliceSuccess: false,
  isemployeeSliceError: false,
  employeeSliceErrorMessage: '',
  employeeSliceSuccessMessage: '',

  isemployeeAddSuccess: false,
  isemployeeAddError: false,
  addEmployeeSuccessMessage: '',
  addEmployeeErrorMessage: '',

  isemployeeByIdSliceFetching: false,
  isemployeeByIdSliceFetchingSmall: false,
  isemployeeByIdSliceSuccess: false,
  employeeByIdSliceErrorMessage: '',
  employeeByIdSliceSuccessMessage: '',
  isemployeeByIdSliceError:'',

  ismeetingSliceFetching: false,
  ismeetingSliceFetchingSmall: false,
  ismeetingSliceSuccess: false,
  ismeetingSliceError: false,
  meetingSliceErrorMessage: '',
  meetingSliceSuccessMessage: '',

  allEmployee: [],
  maleEmployee: 0,
  femaleEmployee: 0,
  newEmployee: 0,
  totalEmployee: 0,
  allMeeting: [],
  totalMeeting:0,
  employee: [],
  allDepartments: [],
  allPositions: [],
  allProjects: [],
  profile:[]
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialStateValues,
  reducers: {
    clearemployeeSliceStates: (state, action) => {
      state.isemployeeSliceFetching = false;
      state.isemployeeSliceFetchingSmall = false;
      state.isemployeeSliceSuccess = false;
      state.isemployeeSliceError = false;
      state.employeeSliceErrorMessage = '';
      state.employeeSliceSuccessMessage = '';

      state.isemployeeAddSuccess = false;
      state.isemployeeAddError = false;
      state.addEmployeeSuccessMessage = '';
      state.addEmployeeErrorMessage = '';

      state.isemployeeByIdSliceFetching=false;
    state. isemployeeByIdSliceFetchingSmall=false;
    state. isemployeeByIdSliceSuccess=false;
    state. employeeByIdSliceErrorMessage='';
    state. employeeByIdSliceSuccessMessage='';
    state. isemployeeByIdSliceError='';



    },
    clearProfile:(state,action)=>{
      state.profile=[]
      return state;
    },
    clearemployeeSliceData: (state, action) => {
      state.allEmployee = []
      return state
    },
    clearemeetingSliceData: (state, action) => {
      state.allMeeting = []
      return state
    },

    clearemployeeSliceMessages: (state, action) => {
      console.log('employee Slice Messages cleared')

      state.employeeSliceErrorMessage = ''
      state.employeeSliceSuccessMessage = ''
      return state
    },

    clearAllPositions: (state, action) => {
      state.allPositions = []
      return state
    },
    clearAllDepartments: (state, action) => {
      state.allDepartments = []
      return state
    },
    clearAllProjects: (state, action) => {
      state.allProjects = []
      return state
    },

    clearEmployeeByIdData:(state,action)=>{
      state.employee=[]
      return state;
    }

  },

  extraReducers: builder => {

    builder.addCase(getAllEmployee.fulfilled, (state, { payload }) => {
      state.isemployeeSliceFetching = false
      state.allEmployee = [...state?.allEmployee, ...payload?.Data]
      state.newEmployee = [payload?.newEmployees]
      state.maleEmployee = [payload?.maleEmployees]
      state.femaleEmployee = [payload?.femaleEmployees]
      state.totalEmployee = payload?.count
      return state
    })
    builder.addCase(getAllEmployee.rejected, (state, { payload }) => {
      state.isemployeeSliceFetching = false
      state.isemployeeSliceError = true
      state.employeeSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(getAllEmployee.pending, (state, { payload }) => {
      state.isemployeeSliceFetching = true
    })

    builder.addCase(addEmployee.fulfilled, (state, { payload }) => {
      state.isemployeeSliceFetching = false
      state.isemployeeSliceFetchingSmall = false
      state.isemployeeAddSuccess = true
      state.addEmployeeSuccessMessage = payload?.Message || 'New Employee Added !'
      state.allEmployee = [...state?.allEmployee, ...payload?.Data]
      return state
    })
    builder.addCase(addEmployee.rejected, (state, { payload }) => {
      state.isemployeeSliceFetching = false
      state.isemployeeSliceFetchingSmall = false
      state.isemployeeAddError = true

      state.addEmployeeErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(addEmployee.pending, (state, { payload }) => {
      state.isemployeeSliceFetchingSmall = true
      state.isemployeeSliceFetchingSmall = true
    })

    builder.addCase(getEmployeeById.fulfilled, (state, { payload }) => {
      state.isemployeeByIdSliceFetching = false
      state.employee = payload?.Data
      return state
    })
    builder.addCase(getEmployeeById.rejected, (state, { payload }) => {
      state.isemployeeByIdSliceFetching = false
      state.isemployeeByIdSliceError = true
      state.employeeByIdSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(getEmployeeById.pending, (state, { payload }) => {
      state.isemployeeByIdSliceFetching = true
    })
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.isemployeeByIdSliceFetching = false
      state.profile = payload
      return state
    })
    builder.addCase(getProfile.rejected, (state, { payload }) => {
      state.isemployeeByIdSliceFetching = false
      state.isemployeeByIdSliceError = true
      state.employeeByIdSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(getProfile.pending, (state, { payload }) => {
      state.isemployeeByIdSliceFetching = true
    })

    builder.addCase(updateEmployee.fulfilled, (state, { payload }) => {
      state.isemployeeByIdSliceFetching = false;
      state.isemployeeSliceFetchingSmall = false
      state.isemployeeByIdSliceSuccess = true;
      let Index = state.allEmployee.findIndex(
        (blog) => blog._id === payload.Data._id
      );
      state.allEmployee[Index] = payload?.Data;
      state.employeeByIdSliceSuccessMessage = payload?.Message || "Success";
      return state;
    });
    builder.addCase(updateEmployee.rejected, (state, { payload }) => {
      state.isemployeeByIdSliceFetching = false;
      state.isemployeeSliceFetchingSmall = false
      state.isemployeeByIdSliceError = true;
      state.employeeByIdSliceErrorMessage = payload?.message || "Something Went Wrong";
    });
    builder.addCase(updateEmployee.pending, (state, { payload }) => {
      state.isemployeeByIdSliceFetching = true;
      state.isemployeeSliceFetchingSmall = true
    });

    builder.addCase(getAllMeeting.fulfilled, (state, { payload }) => {
      state.ismeetingSliceFetching = false
      state.allMeeting = [...state.allMeeting, ...payload?.Data]
      state.totalMeeting=payload?.totalMeeting
      return state
    })
    builder.addCase(getAllMeeting.rejected, (state, { payload }) => {
      state.ismeetingSliceFetching = false
      state.ismeetingSliceError = true
      state.meetingSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(getAllMeeting.pending, (state, { payload }) => {
      state.ismeetingSliceFetching = true
    })

    builder.addCase(getAllMeetingById.fulfilled, (state, { payload }) => {
      state.ismeetingSliceFetching = false
      state.allMeeting = [...state.allMeeting, ...payload?.Data]
      state.totalMeeting=payload?.totalMeeting
      return state
    })
    builder.addCase(getAllMeetingById.rejected, (state, { payload }) => {
      state.ismeetingSliceFetching = false
      state.ismeetingSliceError = true
      state.meetingSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(getAllMeetingById.pending, (state, { payload }) => {
      state.ismeetingSliceFetching = true
    })
    builder.addCase(ScheduleMeeting.fulfilled, (state, { payload }) => {
      state.ismeetingSliceFetching = false
       state.ismeetingSliceSuccess = true
       state.isemployeeSliceFetchingSmall = false
      state.meetingSliceSuccessMessage = payload?.Message || 'Meeting Scheduled'
      return state
    })
    builder.addCase(ScheduleMeeting.rejected, (state, { payload }) => {
      state.ismeetingSliceFetching = false
      state.ismeetingSliceError = true
      state.isemployeeSliceFetchingSmall = false
      state.meetingSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(ScheduleMeeting.pending, (state, { payload }) => {
      state.ismeetingSliceFetching = true
      state.isemployeeSliceFetchingSmall = true
    })

    builder.addCase(updateMeeting.fulfilled, (state, { payload }) => {
      state.ismeetingSliceFetching = false
      state.ismeetingSliceFetchingSmall = false
      state.ismeetingSliceSuccess=true
      let Index = state.allMeeting.findIndex(
        (blog) => blog._id === payload.Data._id
      );
      state.allMeeting[Index] = payload?.Data;
   
      state.meetingSliceSuccessMessage = payload?.Message || 'Meeting updated'
      return state
    })
    builder.addCase(updateMeeting.rejected, (state, { payload }) => {
      state.ismeetingSliceFetching = false
      state.ismeetingSliceFetchingSmall = false
      state.ismeetingSliceError = true

      state.meetingSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(updateMeeting.pending, (state, { payload }) => {
      state.ismeetingSliceFetching = true
      state.ismeetingSliceFetchingSmall = true
    })

    builder.addCase(makeActiveInactive.fulfilled, (state, { payload }) => {
      // state.isBlogSliceFetchingSmall = false
      // state.isBlogActiveInactiveSuccess = true
      let Index = state.allEmployee.findIndex(blog =>
        blog._id === payload.Data._id
      )

      state.allEmployee[Index] = payload?.Data
      // state.blogSliceSuccessMessage = payload?.Message || 'Success'
      return state
    })
   
    builder.addCase(makeActiveInactive.rejected, (state, { payload }) => {
      // state.isBlogSliceFetchingSmall = false
      // state.isBlogSliceError = true
      // state.blogSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(makeActiveInactive.pending, (state, { payload }) => {
      // state.isBlogSliceFetchingSmall = true
    })
    builder.addCase(getAllDepartments.fulfilled, (state, { payload }) => {
      state.isemployeeSliceFetching = false
      state.allDepartments = payload

      return state
    })
    builder.addCase(getAllDepartments.rejected, (state, { payload }) => {
      state.isemployeeSliceFetching = false
      state.isemployeeSliceError = true
      state.employeeSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(getAllDepartments.pending, (state, { payload }) => {
      state.isemployeeSliceFetching = true
    })

    builder.addCase(getAllProjects.fulfilled, (state, { payload }) => {
      state.isemployeeSliceFetching = false
      state.allProjects = payload

      return state
    })
    builder.addCase(getAllProjects.rejected, (state, { payload }) => {
      state.isemployeeSliceFetching = false
      state.isemployeeSliceError = true
      state.employeeSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(getAllProjects.pending, (state, { payload }) => {
      state.isemployeeSliceFetching = true
    })

    builder.addCase(getAllPositions.fulfilled, (state, { payload }) => {
      state.isemployeeSliceFetching = false
      state.allPositions = payload

      return state
    })
    builder.addCase(getAllPositions.rejected, (state, { payload }) => {
      state.isemployeeSliceFetching = false
      state.isemployeeSliceError = true
      state.employeeSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(getAllPositions.pending, (state, { payload }) => {
      state.isemployeeSliceFetching = true
    })

   
  }
})

export const {
  clearemployeeSliceStates,
  clearemployeeSliceData,
  clearBlogDetailData,
  clearBlogUserData,
  clearemployeeSliceMessages,
  clearBlogDraftData,
  clearemeetingSliceData,
  clearAllPositions,
  clearAllDepartments,
  clearAllProjects,
  clearEmployeeByIdData,
  clearProfile
} = employeeSlice.actions
export const blogData = state => state.employee
export default employeeSlice
