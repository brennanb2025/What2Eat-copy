import "./DatePicker.css";

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <div className="form-group mt-3">
        <label htmlFor="datePicker">
          <strong>Select Expiration Date:</strong>
        </label>
          <input
            data-testid="date-picker"
            type="date"
            id="datePicker"
            className="form-control mt-1"
            value={selectedDate === "9999-12-31" ? "" : selectedDate}
            onChange={handleDateChange}
          />
      </div>
    </div>
  );
};

export default CustomDatePicker;
