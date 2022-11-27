import { configureStore } from "@reduxjs/toolkit";
import { contactsAPI } from "../services/contactAPI";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const store = configureStore({
  reducer: {
    [contactsAPI.reducerPath]: contactsAPI.reducer,
  },
  // adding API middleware enables caching,invalidation, polling and other features of rtk-query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsAPI.middleware),
});

setupListeners(store.dispatch);
