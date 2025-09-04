// 'use client'
// import { createSlice } from "@reduxjs/toolkit";
// import {
//   fetchSignup,
//   fetchSignin,
//   // signOut, refreshUser
// } from "./operations";
// import { useEffect } from "react";




// const initialState = {
//   user: {
//     id: null,
//     name: null,
//     email: null,
//     userType: null,
//   },
//   // token: null,
//   isLoggedIn: false,
//   isRefreshing: false,
//   isLoading: false,
//   isError: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // setUserType(state, action) {
//     //   state.userType = action.payload;
//     // },
//     // setToken(state, action) {
//     //   state.token = action.payload;
//     // },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchSignup.pending, state => {
//         state.isLoading = true;
//         state.isError = false;
//       })
//       .addCase(fetchSignup.fulfilled, (state, action) => {
//         state.isLoggedIn = true;
//         state.isLoading = false;
//         state.userType = action.payload.userType;
//         state.email = action.payload.data.email;
//         console.log(state.email);
//       })
//       .addCase(fetchSignup.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = action.payload || true;
//       })
//       .addCase(fetchSignin.pending, state => {
//         state.isLoading = true;
//         state.isError = false;
//       })
//       .addCase(fetchSignin.fulfilled, (state, action) => {
//         // state.user = action.payload.user;
//         state.isLoggedIn = true;
//         state.isLoading = false;
//         // state.email = action.payload.data.email;
//         // state.token = action.payload.token;
//         // console.log(state.token);
//         useEffect(() => {
//           console.log(1)
            
//           }, []);
//         state.userType = action.payload.userType;
//       })
//       .addCase(fetchSignin.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = action.payload || true;
//       });
    //      .addCase(signOut.fulfilled, (state) => {
    //       state.user = { name: null, email: null };
    //       state.token = null;
    //       state.isLoggedIn = false;
    //       state.userType = "owner";
    //      })
    //      .addCase(refreshUser.pending, (state) => {
    //        state.isRefreshing = true;
    //        state.isError = false;
    //     })
    //     .addCase(refreshUser.fulfilled, (state, action) => {
    //       state.token = action.payload.accessToken;
    //       state.user = action.payload.user;
    //       state.isLoggedIn = true;
    //       state.isRefreshing = false;
    //       state.userType = action.payload.userType;
    //     })
    //     .addCase(refreshUser.rejected, (state, action) => {
    //       state.isRefreshing = false;
    //       state.isLoggedIn = false;
    //       state.isError = action.payload || true;
    //     });
//   },
// });

// export const { setUserType, setToken } = authSlice.actions;
// const authReducer = authSlice.reducer;
// export default authReducer;
