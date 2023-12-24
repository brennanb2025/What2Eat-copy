// DatePicker.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DatePickerGPT = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="expirationDate" className="form-label">
        Select Expiration Date:
      </label>
      <input
        type="date"
        id="expirationDate"
        className="form-control"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePickerGPT;