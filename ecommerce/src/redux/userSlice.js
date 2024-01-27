import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    username: '',
    token: '',
    email: ''
  },
  reducers: {
    setUserDetails: (state, actions) => {
      const { username, token, email } = actions.payload
      state.username = username
      state.email = email
    },
    resetUserDetails: (state, actions) => {
      state.username = ''
      state.email = ''
    },
  }
});

export const { setUserDetails, resetUserDetails } = userSlice.actions;
export default userSlice.reducer;
