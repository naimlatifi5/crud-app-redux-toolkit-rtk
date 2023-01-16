import { configureStore } from '@reduxjs/toolkit'
import { contactsAPI } from '../services/contactAPI'
import { setupListeners } from '@reduxjs/toolkit/query/react'

export const store = configureStore({
  reducer: {
    [contactsAPI.reducerPath]: contactsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsAPI.middleware),
})

setupListeners(store.dispatch)
