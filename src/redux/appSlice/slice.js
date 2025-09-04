import { createSlice } from "@reduxjs/toolkit";

const appSlise = createSlice({
  name: "app",
  initialState: {
    isOpenMenu: false,
    isShowNotification: false,
    isOpenForm: false,
  },
  reducers: {
    setIsOpenMenu: (state, action) => {
      state.isOpenMenu = action.payload;
    },
    setShowNotification: (state, action) => {
      state.isShowNotification = action.payload;
    },
    setIsOpenForm: (state, action) => {
      state.isOpenForm = action.payload;
    },
  },
});

export const { setIsOpenMenu, setShowNotification, setIsOpenForm } =
  appSlise.actions;
export default appSlise.reducer;
