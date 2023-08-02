export interface CalendarEvent {
  id: string | number;
  title: string;
  daysOfWeek?: string[];
  startTime: string;
  endTime: string;
  startRecur: string;
  endRecur: string;
  description: string;
  overlap: boolean;
}

export interface ScheduleList {
  schedule: Schedule[];
}

export interface Schedule {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  color: string;
  dayOfWeek: number[];
}
