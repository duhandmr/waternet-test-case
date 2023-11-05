const localStorageMiddleware = store => next => action => {
    const result = next(action);
  
    if (action.type === "table/updateReservationTime") {
      const tableData = store.getState().table.tableData;
      localStorage.setItem("tableData", JSON.stringify(tableData));
    }
  
    return result;
  };
  
  export default localStorageMiddleware;
  