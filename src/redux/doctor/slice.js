import { createSlice } from "@reduxjs/toolkit";

const doctorsSlise = createSlice({
  name: "doctor",
  initialState: {
    doctors: [],
  },
});
export default doctorsSlise.reducer;
