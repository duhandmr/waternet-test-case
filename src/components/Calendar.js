import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { disableButton, updateSelectedDate } from "../redux/calendarSlice";
import {
  setClickedOrder,
  updateReservationTime,
} from "../redux/tableSlice";

const Calendar = ({ onClose, isOpen }) => {
  const [date, setDate] = useState(new Date());

  const clickedOrder = useSelector((state) => state.table.clickedOrder);

  const reservationTime = useSelector(
    (state) => state.table.tableData[0].reservationTime
  );

  const dispatch = useDispatch();
  const disabledButtons = useSelector(
    (state) => state.calendar.disabledButtons
  );

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleSave = () => {
    if (clickedOrder) {
      const updatedReservationTime = {
        order: clickedOrder,
        reservationTime,
      };
      dispatch(updateReservationTime(updatedReservationTime));
    }
    console.log(clickedOrder);
    onClose();
  };

  const handleButtonClick = (buttonText, day) => {
    if (!disabledButtons.includes(`${day}-${buttonText}`)) {

      const updatedReservationTime = `${day}-${buttonText}`;
      dispatch(updateReservationTime({ order: clickedOrder.order, reservationTime: updatedReservationTime }));
  
      const updatedClickedOrder = { ...clickedOrder, reservationTime: updatedReservationTime };
      dispatch(setClickedOrder(updatedClickedOrder));
      
      dispatch(disableButton(`${day}-${buttonText}`));
    }
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const times = [
    "09.00-10.30",
    "10.30-12.00",
    "12.00-13.30",
    "13.30-15.00",
    "15.00-16.30",
    "16.30-18.00",
    "18.00-19.30",
    "19.30-21.00",
    "21.00-22.30",
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="calendar-popup">
        <h2>Select a Date</h2>
        <div className="weekdays">
          {days.map((day) => (
            <div className="weekday" key={day}>
              <p>{day}</p>
              <div className="buttons">
                {times.map((times) => (
                  <button
                    key={times}
                    onClick={() => handleButtonClick(times, day)}
                    disabled={disabledButtons.includes(`${day}-${times}`)}
                    className={
                      disabledButtons.includes(`${day}-${times}`)
                        ? "disabled-button"
                        : ""
                    }
                  >
                    {times}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <button onClick={handleSave}>Save</button>
          </div>
      </div>
    </Modal>
  );
};

export default Calendar;
