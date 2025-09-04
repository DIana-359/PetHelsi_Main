import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import doctorsSliseReducer from "./doctor/slice";
import ownersSliceReducer from "./owner/slice";
import appSliseReducer from "../redux/appSlice/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfigAuth = {
  key: "auth",
  storage,
  whitelist: ["token", "isDoctor", "isOwner"],
};
const pAuthReducer = persistReducer(persistConfigAuth, authReducer);

const persistConfigDoctors = {
  key: "doctor",
  storage,
  whitelist: [],
};
const pDoctorsReducer = persistReducer(
  persistConfigDoctors,
  doctorsSliseReducer
);

const persistConfigOwners = {
  key: "owner",
  storage,
  whitelist: [],
};
const pOwnersReducer = persistReducer(persistConfigOwners, ownersSliceReducer);

// const persistConfigApp = {
//   key: "app",
//   storage,
//   whitelist: [],
// };

export const store = configureStore({
  reducer: {
    auth: pAuthReducer,
    doctor: pDoctorsReducer,
    owner: pOwnersReducer,
    app: appSliseReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
