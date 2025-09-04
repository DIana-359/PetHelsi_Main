export const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectUserType = (state) => state.auth.userType;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectIsError = (state) => state.auth.isError;
