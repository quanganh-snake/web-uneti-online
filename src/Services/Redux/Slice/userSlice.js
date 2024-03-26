import { simpleSHA256 } from '@/Services/Utils/stringUtils'
import { createSlice } from '@reduxjs/toolkit'
import { isString } from 'lodash-unified'

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userStart: (state) => {
      state.isFetching = true
    },
    userSuccess: (state, action) => {
      state.isFetching = false
      const user = action.payload

      if (isString(user.Role)) {
        user.Role = simpleSHA256(user.Role)
      }
      state.currentUser = user
      state.error = false
    },
    userFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  },
})

export const { userStart, userSuccess, userFailure } = userSlice.actions
export default userSlice.reducer
