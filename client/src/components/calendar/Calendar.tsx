import { useEffect, useState } from "react";
import { getScheduleList } from "../../apis/CalendarApi";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { RecurEvent, SingleEvent } from "../../types/CalendarInterfaces";
import { useQuery } from "@tanstack/react-query";
import PostPersonalEvent from "../modal/PostPersonalEvent";
import "./fullcalendar-custom.css";
import ViewCalendarEvent from "../modal/ViewCalendarEvent";

const Calendar = () => {
  const [events, setEvents] = useState<(RecurEvent | SingleEvent)[]>([]);
  const [viewEventInfo, setViewEventInfo] = useState<boolean>(false);
  const [postPersonalSchedule, setPostPersonalSchedule] =
    useState<boolean>(false);
  const { data, isLoading, error } = useQuery(
    ["scheduleList"],
    getScheduleList
  );

  useEffect(() => {
    if (!data) return;
    setEvents(data);
  }, [data]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  const handleDateClick = () => {
    setPostPersonalSchedule(true);
  };

  const handleEventClick = (e) => {
    const clickedEvent = e.event;
    setViewEventInfo(true);
  };

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
        eventClick={handleEventClick}
      />
      <PostPersonalEvent
        isOpen={postPersonalSchedule}
        closeModal={() => setPostPersonalSchedule(false)}
      />
      <ViewCalendarEvent
        isOpen={viewEventInfo}
        closeModal={() => setViewEventInfo(false)}
        s
      />
    </>
  );
};

export default Calendar;
