import { v4 as uuidv4 } from "uuid";
import tokenRequestApi from "./TokenRequestApi";
import {
  RecurEvent,
  Schedule,
  ScheduleList,
  SingleEvent,
} from "../types/CalendarInterfaces";
import { DayOfWeekBinaryToNumber } from "../pages/utils/DaysOfWeekMap";

export const getScheduleList = async () => {
  const recurSchedule: Schedule[] = [];
  const singleSchedule: Schedule[] = [];
  const response = await tokenRequestApi.get<ScheduleList>("/schedule/list");
  if (response.data.schedule) {
    response.data.schedule.forEach((schedule) => {
      if (schedule.startDate === schedule.endDate) {
        singleSchedule.push(schedule);
      } else {
        recurSchedule.push(schedule);
      }
    });
  }

  const mappedRecurSchedule: RecurEvent[] = recurSchedule.map((schedule) => ({
    id: uuidv4(),
    title: schedule.title,
    daysOfWeek: DayOfWeekBinaryToNumber(schedule.dayOfWeek),
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    startRecur: schedule.startDate,
    endRecur: schedule.endDate,
    description: schedule.description,
    color: schedule.color,
    overlap: true,
  }));

  const mappedSingleSchedule: SingleEvent[] = singleSchedule.map(
    (schedule) => ({
      id: uuidv4(),
      title: schedule.title,
      start: `${schedule.startDate}T${schedule.startTime}`,
      end: `${schedule.endDate}T${schedule.endTime}`,
      description: schedule.description,
      color: schedule.color,
      overlap: true,
    })
  );
  const combinedSchedule: (RecurEvent | SingleEvent)[] = [
    ...mappedRecurSchedule,
    ...mappedSingleSchedule,
  ];

  return combinedSchedule;
};

export const postCustomSchedule = async (schedule: Schedule) => {
  await tokenRequestApi.post("/schedule", schedule);
};
