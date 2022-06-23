import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../redxSlice/counterSlice';
import searchNameSlice from '../redxSlice/searchNameSlice';
import sortHandlerSlice from '../redxSlice/sortHandlerSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    searchNameHandler: searchNameSlice,
    sortHandler: sortHandlerSlice,
  },
})