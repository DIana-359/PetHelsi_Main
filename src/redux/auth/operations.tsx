// import Cookies from "js-cookie";
// import axios, { AxiosError } from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { setToken, setUserType } from "./slice";

// axios.defaults.baseURL =
  // тестове API
  // axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";
  // "https://om6auk3tiqy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws/api";

// const setAuthHeader = (token: string) => {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// };

// export const clearAuthHeader = () => {
//   axios.defaults.headers.common["Authorization"] = "";
// };

// export function fetchSignup (
//     userData: {
//       email: string;
//       password: string;
//       repeatPassword: string;
//       roleType: string;

 
//   ) {
//     try {
//       const response = await axios.post(
//         // ( "/campers"
//         "/v1/auth/register",
//         userData
//       );
//       // console.log(userData);
//       console.log(response);
//       setAuthHeader(response.data.token);
//       return response.data;
//     } catch (err) {
//       const error = err as AxiosError<{ message: string }>;

//       if (error.response) {
//         return thunkAPI.rejectWithValue({
//           status: error.response.status,
//           message: error.response.data.message,
//         });
//       } else {
//         return thunkAPI.rejectWithValue({
//           status: 500,
//           message: "Network error",
//         });
//       }
//     }
//   }
// );

// export const fetchSignin = createAsyncThunk(
//   "auth/signin",
//   async (userData: { email: string; password: string }, thunkAPI) => {
//     try {
//       const response = await axios.post("/v1/auth/login", userData);
//       console.log(userData);
//       // console.log(response.config.data.email.email);
//       console.log(response);
//       setAuthHeader(response.data.token);
//       return response.data;
//     } catch (err) {
//       const error = err as AxiosError<{ message: string }>;

//       if (error.response) {
//         return thunkAPI.rejectWithValue({
//           status: error.response.status,
//           message: error.response.data.message,
//         });
//       } else {
//         return thunkAPI.rejectWithValue({
//           status: 500,
//           message: "Network error",
//         });
//       }
//     }
//   }
// );

// export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });
