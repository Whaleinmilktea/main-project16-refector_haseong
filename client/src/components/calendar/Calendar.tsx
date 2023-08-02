import { useEffect } from "react";
import { getScheduleList } from "../../apis/CalendarApi";
import FullCalendar from "@fullcalendar/react";

const Calendar = () => {

  useEffect(() => {
    getScheduleList();
  }, []);

  return (
    <>
      <FullCalendar />
    </>
  );
};

export default Calendar;
