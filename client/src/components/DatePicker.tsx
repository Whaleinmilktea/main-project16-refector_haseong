import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export const DatePick = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => date && setStartDate(date)}
      isClearable
      placeholderText="I have been cleared!"
    />
  );
};
