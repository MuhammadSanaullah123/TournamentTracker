import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tournamentReducer from "./slices/tournamentSlice";

import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tournament: tournamentReducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
