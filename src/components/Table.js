import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cancelReservation,
  deleteOrder,
  editTableItem,
  setClickedOrder,
  updateReservationTime,
} from "../redux/tableSlice";
import { RiDeleteBin2Line, RiCalendar2Line, RiEdit2Line } from "react-icons/ri";
import Calendar from "./Calendar";
import Modal from "./Modal";

const Table = ({ isOpen, onClose }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickedOrder = useSelector((state) => state.table.clickedOrder);
  const tableData = useSelector((state) => state.table.tableData);

  const reservationTime = useSelector((state) => {
    const order = state.table.clickedOrder;
    const tableData = state.table.tableData;
    if (order && tableData) {
      const item = tableData.find((item) => item.order === order);
      if (item) {
        return item.reservationTime;
      }
    }
    return null;
  });

  const dispatch = useDispatch();

  const handleEditClick = (item) => {
    dispatch(editTableItem(item));
  };

  const handleDeleteClick = (item) => {
    dispatch(deleteOrder({order: item.order}))
  };

  const handleCalendarClick = (item) => {
    const table = JSON.parse(localStorage.getItem("tableData"));
    let reservation = "";

    for (let i = 0; i < table.length; i++) {
      if (table[i].order === item.order) {
        dispatch(setClickedOrder(table[i]));
        reservation = table[i].reservationTime;
        break;
      }
    }

    if (reservation !== "" && clickedOrder !== null) {
      setIsModalOpen(true);
    } else {
      setShowDatePicker(true);
    }
  };

  const handleCancelReservation = () => {
    if (clickedOrder) {
      const canceledReservationTime = clickedOrder.reservationTime;
      dispatch(cancelReservation({ reservationTime: canceledReservationTime }));
      setIsModalOpen(false);
    }
    window.location.reload();
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>NO</th>
            <th>Subject</th>
            <th>Process</th>
            <th>Saved By</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{item.order}</td>
              <td>{item.no}</td>
              <td>{item.subject}</td>
              <td>{item.process}</td>
              <td>{item.savedBy}</td>
              <td>
                {item.date}
                <RiDeleteBin2Line
                  className="icon delete"
                  onClick={() => handleDeleteClick(item)}
                />
                <RiEdit2Line
                  className="icon edit"
                  onClick={() => handleEditClick(item)}
                />
                <RiCalendar2Line
                  className="icon calendar"
                  onClick={() => handleCalendarClick(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDatePicker && (
        <Calendar
          isOpen={showDatePicker}
          onClose={() => setShowDatePicker(false)}
        />
      )}
      <div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="calendar-popup">
            {clickedOrder && (
              <p>{`Rezervasyonunuz: ${clickedOrder.reservationTime}`}</p>
            )}
            <button onClick={() => handleCancelReservation()}>Cancel</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Table;
