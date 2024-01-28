import { useEffect, useState } from "react";
import { getScheduleList } from "../../apis/CalendarApi";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { RecurEvent, SingleEvent } from "../../types/CalendarInterfaces";
import PostPersonalEvent from "../modal/PostPersonalEvent";
import "./fullcalendar-custom.css";
import { useQuery } from "@tanstack/react-query";

const Calendar = () => {
  const [events, setEvents] = useState<(RecurEvent | SingleEvent)[]>([]);
  const [postPersonalSchedule, setPostPersonalSchedule] =
    useState<boolean>(false);

  const { data, isLoading, error } = useQuery(
    ["scheduleList"],
    getScheduleList
  );

  useEffect(() => {
    if (data === undefined) return
    setEvents(data)
  }, [data])

  const handleDateClick = () => {
    setPostPersonalSchedule(true);
  };

  if (isLoading) <p>로딩중</p>
  if (error) <p>에러발생</p>

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          start: "today",
          center: "title",
          end: "prev,next",
        }}
        height={"100vh"}
        events={events}
        allDaySlot={false}
        slotMinTime={"06:00:00"}
        slotMaxTime={"30:00:00"}
        dateClick={handleDateClick}
        // TODO eventClick={handleEventClick}
      />
      <PostPersonalEvent
        isOpen={postPersonalSchedule}
        closeModal={() => setPostPersonalSchedule(false)}
      />
    </>
  );
};

export default Calendar;
