import { createSlice } from "@reduxjs/toolkit";

const ownersSlice = createSlice({
  name: "owner",
  initialState: {
    owners: [],
  },
});
export default ownersSlice.reducer;
