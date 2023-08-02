import tokenRequestApi from "./TokenRequestApi";
import { CalendarEvent, Schedule } from "../types/CalendarInterfaces";
import { v4 as uuidv4 } from "uuid";

export const getScheduleList = async () => {
  const everySchedule: Schedule[] = [];
  const response = await tokenRequestApi.get("/schedule/list");
  everySchedule.push(...response.data.schedule); // 서버데이터 무결성 확보 ===> 새로운 배열에 넣기

  const mappedSchedule: CalendarEvent[] = everySchedule.map((schedule) => {
    const mappedSchedule: CalendarEvent = {
      id: uuidv4(),
      title: schedule.title,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      startRecur: schedule.startDate,
      endRecur: schedule.endDate,
      description: schedule.description,
      overlap: true,
    };
  });
  return mappedSchedule;
};
