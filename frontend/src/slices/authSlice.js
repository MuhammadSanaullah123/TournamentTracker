import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },

    clearCredentials: (state, action) => {
      state.userInfo = null;
      sessionStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, clearCredentials, setUser } = authSlice.actions;

export default authSlice.reducer;
