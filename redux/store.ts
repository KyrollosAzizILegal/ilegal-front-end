import { configureStore } from '@reduxjs/toolkit';
import { FetchBaseQueryError, setupListeners } from '@reduxjs/toolkit/query';
import { api } from './services/api'; // Replace with your API service path
import homeSlice from './services/header';
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
    Home: homeSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Optional: setup listeners for refetching on focus or reconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export function isFetchBaseQueryError(error: any): error is FetchBaseQueryError {
    return error && typeof error === "object" && "status" in error;
  }
