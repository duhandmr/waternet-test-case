// App.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToTable, updateTableData } from './redux/tableSlice';
import Table from './components/Table';
import AddToTable from './components/AddToTable';
import Select from './components/Select';

function App() {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table.tableData);

  const [editItem, setEditItem] = useState(null);

  const onEditTable = (updatedData) => {
    dispatch(updateTableData(updatedData));
    setEditItem(null);
  };

  return (
    <div className="App">
      <Select />
      <Table tableData={tableData} onEditItem={setEditItem} />
      <AddToTable
        onAddToTable={(newItem) => dispatch(addToTable(newItem))}
        onEditTable={onEditTable}
        editItem={editItem}
        setEditItem={setEditItem}
        tableData={tableData}
      />
    </div>
  );
}

export default App;
