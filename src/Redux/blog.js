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
console.log("login",data)
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

export const getAllBlogs = createAsyncThunk(
  'blog/getAllBlogs',
  async (obj, thunkAPI) => {
    console.log(apiUrl);
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/getAllBlogs/${obj?.pageNumber}/${obj?.perPageCount}/?searchQuery=${obj?.searchValue}`, {
        // method: 'GET',
        // headers
        method: "POST",
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

export const getBlogById = createAsyncThunk(
  'blog/getBlogById',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/getBlogById/${obj.id}`, {
        method: 'GET',
        headers
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

export const getBlogsByUserId = createAsyncThunk(
  'blog/getBlogsByUserId',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/getBlogsByUserId/${userId}/${obj?.pageNumber}/${obj?.perPageCount}/?searchQuery=${obj?.searchValue}`, {
        // method: 'GET',
        // headers
        method: "POST",
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

export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      
      const response = await fetch(`${apiUrl}/${userId}/createBlog`, {
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

export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/updateBlog/${obj.blogId}`, {
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

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/deleteBlog/${obj.id}`, {
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


export const makeBlogActiveInactive = createAsyncThunk(
  'blog/makeBlogActiveInactive',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/makeBlogActiveInactive/${obj?.id}/${obj?.status}`, {
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

export const duplicateBlog = createAsyncThunk(
  'blog/duplicateBlog',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/duplicateBlog/${userId}/${obj.blogId}`, {
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

export const createBlogAsDraft = createAsyncThunk(
  'blog/createBlogAsDraft',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/${userId}/createBlogAsDraft`, {
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

export const getDraftBlogById = createAsyncThunk(
  'blog/getDraftBlogById',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/${userId}/getDraftBlogById/${obj?.pageNumber}/${obj?.perPageCount}/?searchQuery=${obj?.searchValue}`, {
        method: 'GET',
        headers
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

export const dispatchSaveAsDraftButton = createAsyncThunk(
  "blog/dispatchSaveAsDraftButton",
  async (data, thunkAPI) => {
    try {
      console.log("save as draft dispatch data", data);

      return data;
    } catch (error) {
      console.log(error, "err");
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);


const initialStateValues = {
  isBlogSliceFetching: false,
  isBlogSliceFetchingSmall: false,
  isBlogSliceSuccess: false,
  isBlogEditSliceSuccess: false,
  isBlogActiveInactiveSuccess:false,
  isBlogSliceError: false,
  blogSliceErrorMessage: '',
  blogSliceSuccessMessage: '',
  isBlogDeleteSliceSuccess:'',
  isBlogDuplicatedSliceSucess:'',
  isBlogDraftSliceSuccess:'',
 isBlogCreateSuccess:'',
 isBlogByUserFetching:'',
 isBlogDraftCreateSuccess:false,
 toggleSaveAsDraftPopup:false,
 blogDraft:[],
  allBlogs: [],
  blogDetail: [],
  blogCount:'',
  UserBlogs:[],
  totalUserBlogs:'',
  totalDrafts:''
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: initialStateValues,
  reducers: {
    clearBlogSliceStates: (state, action) => {
      state.isBlogSliceFetching = false
      state.isBlogSliceSuccess = false
      state.blogSliceSuccessMessage = ''
      state.isBlogSliceError = false
      state.blogSliceErrorMessage = ''
      state.isBlogEditSliceSuccess = false
      state.isBlogDeleteSliceSuccess=false
      state.isBlogActiveInactiveSuccess=false
      state.isBlogDuplicatedSliceSucess=false
      state.isBlogCreateSuccess=false
      state.isBlogByUserFetching=false
      state.isBlogDraftSliceSuccess=false
    state.isBlogDraftCreateSuccess=false
    },
    clearBlogSliceData: (state, action) => {
      state.allBlogs = []
      return state
    },
    clearBlogUserData:(state,action)=>{
      state.UserBlogs=[]
      return state
    },
    clearBlogDetailData:(state,action)=>{
      state.blogDetail=[]
      return state
    },
    clearBlogDraftData:(state,action)=>{
      state.blogDraft=[]
      return state
    },
    clearBlogSliceMessages: (state, action) => {
      console.log('Blog Slice Messages cleared')
    
      state.blogSliceErrorMessage = ''
      state.blogSliceSuccessMessage = ''
      return state
    }
  },

  extraReducers: builder => {
    // CASES FOR GET ALL BLOGS
    builder.addCase(getAllBlogs.fulfilled, (state, { payload }) => {
      state.isBlogSliceFetching = false
      state.allBlogs =[...state.allBlogs,...payload?.Data]
      state.blogCount=payload?.blogCount[0]?.totalBlogs ?? 0;
      return state
    })
    builder.addCase(getAllBlogs.rejected, (state, { payload }) => {
      state.isBlogSliceFetching = false
      state.isBlogSliceError = true
      state.blogSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(getAllBlogs.pending, (state, { payload }) => {
      state.isBlogSliceFetching = true
    })

    // CASES FOR GET BLOG BY ID
    builder.addCase(getBlogById.fulfilled, (state, { payload }) => {
      state.isBlogSliceFetching = false
      state.blogDetail = payload?.Data[0]
      return state
    })
    builder.addCase(getBlogById.rejected, (state, { payload }) => {
      state.isBlogSliceFetching = false
      state.isBlogSliceError = true
      state.blogSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(getBlogById.pending, (state, { payload }) => {
      state.isBlogSliceFetching = true
    })

    // CASES FOR CREATE BLOG
    builder.addCase(createBlog.fulfilled, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = false
      state.isBlogCreateSuccess = true
      state.blogSliceSuccessMessage = payload?.Message || 'Success'

      return state
    })
    builder.addCase(createBlog.rejected, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = false
      state.isBlogSliceError = true
      state.blogSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(createBlog.pending, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = true
    })

    // CASES FOR UPDATE BLOG
    
    builder.addCase(updateBlog.fulfilled, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = false
      state.isBlogEditSliceSuccess = true
     let blogIndex= state.allBlogs.findIndex(blog => 
         blog._id === payload.Data[0]._id
      )
      let UserblogIndex= state.UserBlogs.findIndex(blog => 
        blog._id === payload.Data[0]._id
     )
      state.allBlogs[blogIndex]=payload?.Data[0]
      state.UserBlogs[UserblogIndex]=payload?.Data[0]
      state.blogSliceSuccessMessage = payload?.Message || 'Success'
      return state
    })
    builder.addCase(updateBlog.rejected, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = false
      state.isBlogSliceError = true
      state.blogSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(updateBlog.pending, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = true
    })

    // CASES FOR DELETE BLOG
    builder.addCase(deleteBlog.fulfilled, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = false
      state.isBlogDeleteSliceSuccess = true
      state.blogSliceSuccessMessage = payload?.Message
      state.allBlogs = state.allBlogs.filter(blog => blog._id !== payload.Data)
      state.blogCount=payload?.totalBlogs
      state.UserBlogs = state.UserBlogs.filter(blog => blog._id !== payload.Data)
      state.blogDraft=state.blogDraft.filter(blog => blog._id !== payload.Data)
      state.totalUserBlogs=payload?.totalBlogs
      return state
    })
    builder.addCase(deleteBlog.rejected, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = false
      state.isBlogSliceError = true
      state.blogSliceErrorMessage = payload?.Message || 'Something Went Wrong'
    })
    builder.addCase(deleteBlog.pending, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = true
    })

    
    // CASES FOR GET BLOG BY USER ID
    builder.addCase(getBlogsByUserId.fulfilled, (state, { payload }) => {
      state.isBlogByUserFetching = false
      state.UserBlogs = [...state.UserBlogs, ...payload?.Data]
      state.totalUserBlogs= payload?.totalBlogs[0]?.totalBlogs ?? 0  ;
      return state
    })
    builder.addCase(getBlogsByUserId.rejected, (state, { payload }) => {
      state.isBlogByUserFetching = false
      state.isBlogSliceError = true
      state.blogSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(getBlogsByUserId.pending, (state, { payload }) => {
      state.isBlogByUserFetching = true
    })

     // CASES FOR makeBlogActiveInactive
     builder.addCase(makeBlogActiveInactive.fulfilled, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = false
      state.isBlogActiveInactiveSuccess = true
     let blogIndex= state.allBlogs.findIndex(blog => 
         blog._id === payload.Data[0]._id
      )
      
      let UserblogIndex= state.UserBlogs.findIndex(blog => 
        blog._id === payload.Data[0]._id
     )

     console.log(UserblogIndex, blogIndex);
    
 
      state.allBlogs[blogIndex]=payload?.Data[0]
      state.UserBlogs[UserblogIndex]=payload?.Data[0]
 
  
      state.blogSliceSuccessMessage = payload?.Message || 'Success'
      return state
    })
    builder.addCase(makeBlogActiveInactive.rejected, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = false
      state.isBlogSliceError = true
      state.blogSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(makeBlogActiveInactive.pending, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = true
    })

      // CASES FOR duplicate BLOG
      builder.addCase(duplicateBlog.fulfilled, (state, { payload }) => {
        state.isBlogSliceFetchingSmall = false
        state.isBlogDuplicatedSliceSucess = true
        state.allBlogs.unshift(payload.Data[0]);
        state.UserBlogs.unshift(payload.Data[0]);
        state.blogCount=payload?.blogCount
        state.totalUserBlogs=payload?.totalBlogsUser
        state.blogSliceSuccessMessage = payload?.Message || 'Success'
  
        return state
      })
      builder.addCase(duplicateBlog.rejected, (state, { payload }) => {
        state.isBlogSliceFetchingSmall = false
        state.isBlogSliceError = true
        state.blogSliceErrorMessage = payload?.message || 'Something Went Wrong'
      })
      builder.addCase(duplicateBlog.pending, (state, { payload }) => {
        state.isBlogSliceFetchingSmall = true
      })
       // CASES FOR CREATE BLOG
    builder.addCase(createBlogAsDraft.fulfilled, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = false
      state.isBlogDraftCreateSuccess = true    
      state.blogSliceSuccessMessage = payload?.Message || 'Success'

      return state
    })
    builder.addCase(createBlogAsDraft.rejected, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = false
      state.isBlogSliceError = true
      state.blogSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(createBlogAsDraft.pending, (state, { payload }) => {
      state.isBlogSliceFetchingSmall = true
    })

     // CASES FOR GET BLOG BY ID
     builder.addCase(getDraftBlogById.fulfilled, (state, { payload }) => {
      state.isBlogSliceFetching = false
      state.blogDraft = payload?.Data
      state.totalDrafts=payload?.totalBlogs
      console.log("dt",payload?.Data,payload?.Data)
      return state
    })
    builder.addCase(getDraftBlogById.rejected, (state, { payload }) => {
      state.isBlogSliceFetching = false
      state.isBlogSliceError = true
      state.blogSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(getDraftBlogById.pending, (state, { payload }) => {
      state.isBlogSliceFetching = true
    })

     
    builder.addCase(
      dispatchSaveAsDraftButton.fulfilled,
      (state, { payload }) => {
        state.toggleSaveAsDraftPopup = payload ?? false;
        return state;
      }
    );
    builder.addCase(
      dispatchSaveAsDraftButton.rejected,
      (state, { payload }) => {}
    );
    builder.addCase(
      dispatchSaveAsDraftButton.pending,
      (state, { payload }) => {}
    );

  }
})

export const {
  clearBlogSliceStates,
  clearBlogSliceData,
  clearBlogDetailData,
  clearBlogUserData,
  clearBlogSliceMessages,
  clearBlogDraftData
} = blogSlice.actions
export const blogData = state => state.blogData
export default blogSlice
