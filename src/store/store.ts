import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./date";
import infoReducer from "./info";

export const store = configureStore({
  reducer: {
    date: dateReducer,
    info: infoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
