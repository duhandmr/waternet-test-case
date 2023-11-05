// components/AddToTable.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToTable,
  editTableItem,
  updateTableData,
} from "../redux/tableSlice";

const AddToTable = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table.tableData);
  const editItem = useSelector((state) => state.table.editItem);

  const [selectedFailureCode, setSelectedFailureCode] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedProcess, setSelectedProcess] = useState("");
  const [notes, setNotes] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (editItem) {
      setSelectedFailureCode(editItem.failureCode);
      setSelectedSubCategory(editItem.subCategory);
      setSubject(editItem.subject);
      setSelectedProcess(editItem.process);
      setNotes(editItem.notes);
      setIsEdit(true);
    }
  }, [editItem]);

  const handleAddClick = () => {
    if (
      selectedFailureCode &&
      selectedSubCategory &&
      subject &&
      selectedProcess &&
      notes
    ) {
      if (isEdit) {
        const editedItem = {
          order: editItem.order,
          no: editItem.no,
          failureCode: selectedFailureCode,
          subCategory: selectedSubCategory,
          subject,
          process: selectedProcess,
          savedBy: editItem.savedBy,
          notes,
          date: editItem.date,
        };

        const updatedData = tableData.map((item) =>
          item.no === editItem.no ? editedItem : item
        );

        dispatch(updateTableData(updatedData));
        dispatch(editTableItem(null));
        setIsEdit(false);
      } else {
        const newItem = {
          order: tableData.length + 1,
          no: `SER-${tableData.length + 1}`,
          failureCode: selectedFailureCode,
          subCategory: selectedSubCategory,
          subject,
          process: selectedProcess,
          savedBy: "Gökay Kahraman",
          notes,
          date: new Date().toLocaleDateString(),
          reservationTime: reservationTime,
        };

        dispatch(addToTable(newItem));
      }

      setSelectedFailureCode("");
      setSelectedSubCategory("");
      setSubject("");
      setSelectedProcess("");
      setNotes("");
    } else {
      alert("Lütfen tüm alanları doldurun.");
    }
  };

  return (
    <div className="add-to-table">
      <div className="add-to-table-top">
        <div className="custom-select">
          <select
            value={selectedFailureCode}
            onChange={(e) => setSelectedFailureCode(e.target.value)}
          >
            <option value="" disabled>
              Select Failure Code
            </option>
            <option value="Service">Service</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <div className="custom-select">
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            <option value="" disabled>
              Select Sub-Category
            </option>
            {selectedFailureCode === "Service" && (
              <option value="Filtre Change">Filtre Change</option>
            )}
            {selectedFailureCode === "Service" && (
              <option value="Cleaning">Cleaning</option>
            )}
            {selectedFailureCode === "Maintenance" && (
              <option value="Cleaning">Cleaning</option>
            )}
            {selectedFailureCode === "Maintenance" && (
              <option value="Education">Education</option>
            )}
          </select>
        </div>
      </div>
      <div className="add-to-table-content">
        <input
          className="input-full"
          placeholder="Subject SER-99 / Cart Adı"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <div className="custom-select">
          <select
            value={selectedProcess}
            onChange={(e) => setSelectedProcess(e.target.value)}
          >
            <option value="" disabled>
              Select Process
            </option>
            <option value="First Registration">First Registration</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>
      <div className="add-to-table-bottom">
        <button onClick={handleAddClick}>{isEdit ? "Update" : "Create"}</button>
      </div>
    </div>
  );
};

export default AddToTable;
