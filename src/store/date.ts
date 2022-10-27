import { createSlice } from "@reduxjs/toolkit";

export interface stateType {
  month?: number | string;
  day?: number | string;
  selectedTime?: string;
}

const date = createSlice({
  name: "dateReducer",
  initialState: {
    month: "",
    day: "",
    selectedTime: "",
  } as stateType,
  reducers: {
    clickCalendar: (state, action) => {
      state.month = action.payload.month;
      state.day = action.payload.day;
    },
    clickTime: (state, action) => {
      state.selectedTime = action.payload;
    },
  },
});

export const { clickCalendar, clickTime } = date.actions;

export default date.reducer;
