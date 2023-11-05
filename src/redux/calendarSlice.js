import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDate: null,
  disabledButtons: JSON.parse(localStorage.getItem("disabledButtons")) || [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    updateSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    disableButton: (state, action) => {
      const buttonText = action.payload;
      if (!state.disabledButtons.includes(buttonText)) {
        state.disabledButtons.push(buttonText);
        localStorage.setItem("disabledButtons", JSON.stringify(state.disabledButtons));
      }
    },
  },
});

export const { updateSelectedDate, disableButton } = calendarSlice.actions;

export default calendarSlice.reducer;
