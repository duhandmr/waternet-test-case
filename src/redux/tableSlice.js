import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableData: JSON.parse(localStorage.getItem("tableData")) || [],
  disableButtons: JSON.parse(localStorage.getItem("disableButtons")) || [],
  editItem: null,
  clickedOrder: null, // Yeni bir durum eklendi
  disabledButtons: []
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addToTable: (state, action) => {
      state.tableData.push(action.payload);

      localStorage.setItem("tableData", JSON.stringify(state.tableData));
    },
    editTableItem: (state, action) => {
      state.editItem = action.payload;
    },
    updateTableData: (state, action) => {
      state.tableData = action.payload;
      localStorage.setItem("tableData", JSON.stringify(action.payload));
    },
    updateReservationTime: (state, action) => {
      const { order, reservationTime } = action.payload;
      state.tableData = state.tableData.map((item) => {
        if (item.order === order) {
          return { ...item, reservationTime };
        }
        return item;
      });
      localStorage.setItem("tableData", JSON.stringify(state.tableData));
    },
    setClickedOrder: (state, action) => {
      const clickedOrder = action.payload;
      const tableData = state.tableData;
      const selectedItem = tableData.find(
        (item) => item.order === clickedOrder.order
      );

      state.clickedOrder = selectedItem;
    },
    cancelReservation: (state, action) => {
      const canceledReservationTime = action.payload.reservationTime;
      
      state.disabledButtons = state.disabledButtons.filter((button) => button !== canceledReservationTime);
    
      state.tableData = state.tableData.map((item) => {
        if (item.reservationTime === canceledReservationTime) {
          return { ...item, reservationTime: '' };
        }
        return item;
      });
    
      localStorage.setItem("disabledButtons", JSON.stringify(state.disabledButtons));
      localStorage.setItem("tableData", JSON.stringify(state.tableData));
    },
    
    deleteOrder: (state, action) => {
      const { order } = action.payload;
      const canceledItemIndex = state.tableData.findIndex(
        (item) => item.order === order
      );

      if (canceledItemIndex !== -1) {
        state.tableData = state.tableData.filter(
          (item) => item.order !== order
        );

        const updatedTableData = [...state.tableData];
        const updatedItem = { ...updatedTableData[canceledItemIndex] };
        updatedTableData[canceledItemIndex] = updatedItem;

        localStorage.removeItem("tableData");
        localStorage.removeItem("disabledButtons");
      }
    },
  },
});

export const {
  addToTable,
  editTableItem,
  updateTableData,
  updateReservationTime,
  setClickedOrder,
  cancelReservation,
  deleteOrder,
} = tableSlice.actions;

export default tableSlice.reducer;
