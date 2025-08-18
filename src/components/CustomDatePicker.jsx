import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker({ selectedDate, onChange, id }) {
    return (
        <DatePicker
            id={id}
            selected={selectedDate}
            onChange={onChange}
            dateFormat="MM/dd/yyyy"
            className="input-field"
        />
    );
}

export default CustomDatePicker;
