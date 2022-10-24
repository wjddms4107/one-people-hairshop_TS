import { createSlice } from "@reduxjs/toolkit";

export interface stateType {
  name: string;
  number: string;
  selectedSort: string;
  request: string;
}

const info = createSlice({
  name: "infoReducer",
  initialState: {
    name: "",
    number: "",
    selectedSort: "",
    request: "",
  } as stateType,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeNumber: (state, action) => {
      state.number = action.payload;
    },
    clickSort: (state, action) => {
      state.selectedSort = action.payload;
    },
    changeRequest: (state, action) => {
      state.request = action.payload;
    },
  },
});

export const { changeName, changeNumber, clickSort, changeRequest } =
  info.actions;

export default info.reducer;
