import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./date";

export const store = configureStore({
  reducer: {
    date: dateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
