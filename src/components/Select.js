import React from "react";

const Select = () => {
  return (
    <div className="select-container">
      <div className="custom-select">
        <select>
          <option value="option1">Sales Process</option>
          <option value="option2">Call Center Process</option>
          <option value="option3">Customer Care Process</option>
        </select>
      </div>
      <div className="custom-select">
        <select>
          <option value="option1">Service Applications</option>
          <option value="option2">Call Center Applications</option>
          <option value="option3">Pool Records</option>
        </select>
      </div> 
    </div>
  );
};

export default Select;
