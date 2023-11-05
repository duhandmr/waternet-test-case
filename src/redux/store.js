import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './tableSlice';
import calendarSlice from './calendarSlice';
import localStorageMiddleware from './localStorageMiddleware';

export const store = configureStore({
  reducer: {
    table: tableReducer,
    calendar: calendarSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});
