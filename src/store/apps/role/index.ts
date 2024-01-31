// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appRoles/fetchData', async (params: DataParams) => {
  const response = await axios.post('/api/roles/list', {
    params
  })

  return response.data
})

// ** Add User
export const addRole = createAsyncThunk(
  'appRoles/addRole',
  async (data: { [key: string]: number | string | string[] | boolean }, { getState, dispatch }: Redux) => {
    const response = await axios.post('/api/roles/add-role', {
      ...data
    })
  
    dispatch(fetchData(getState().role.params))
  
    return response.data
  }
)

// ** Edit User
export const editRole = createAsyncThunk(
  'appRoles/editRole',
  async (data: { [key: string]: number | string | string[] | boolean }, { getState, dispatch }: Redux) => {
    const response = await axios.post('/api/roles/edit-role', {
      ...data
    })
  
    dispatch(fetchData(getState().role.params))
  
    return response.data
  }
)

// ** Delete User
export const deleteRole = createAsyncThunk(
  'appRoles/deleteRole',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete(`/api/roles/delete/${id}`)
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

export const appRoleSlice = createSlice({
  name: 'appRoles',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.roles
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})


export default appRoleSlice.reducer
