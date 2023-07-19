import { AxiosResponse } from "axios";
import tokenRequestApi from "./TokenRequestApi";
import {
  getStudyGroupInfo,
  getStudyGroupList,
} from "./StudyGroupApi";
import { StudyInfoDto } from "../types/StudyGroupApiInterfaces";

export interface StudyEvent {
  id: string;
  title: string;
  daysOfWeek?: string[];
  startTime: string;
  endTime: string;
  startRecur: string;
  endRecur: string;
  description: string;
  overlap: boolean;
  divide: string;
}

export const generateStudyEvents = async (
  isLoggedIn: boolean
): Promise<StudyEvent[]> => {
  const myStudyGroups = await getStudyGroupList();
  const studyGroupIds: number[] = [];

  for (const member of myStudyGroups.data.members) {
    studyGroupIds.push(member.id);
  }

  const studyGroupInfos: StudyInfoDto[] = [];
  for (const id of studyGroupIds) {
    const studyGroupInfo = await getStudyGroupInfo(id, isLoggedIn);
    studyGroupInfos.push(studyGroupInfo);
  }

  const events: StudyEvent[] = studyGroupInfos.map(
    (studyGroupInfo: StudyInfoDto) => {
      const mappedDaysOfWeek: string[] = studyGroupInfo.daysOfWeek.map(
        (day: string) => {
          switch (day) {
            case "월":
              return "1"; // "월" -> 1
            case "화":
              return "2"; // "화" -> 2
            case "수":
              return "3"; // "수" -> 3
            case "목":
              return "4"; // "목" -> 4
            case "금":
              return "5"; // "금" -> 5
            case "토":
              return "6"; // "토" -> 6
            case "일":
              return "0"; // "일" -> 0
            default:
              return "";
          }
        }
      );

      const event: StudyEvent = {
        id: studyGroupInfo.id.toString(),
        title: studyGroupInfo.studyName,
        daysOfWeek: mappedDaysOfWeek,
        startTime: `${studyGroupInfo.studyTimeStart}:00`,
        endTime: `${studyGroupInfo.studyTimeEnd}:00`,
        startRecur: studyGroupInfo.studyPeriodStart,
        endRecur: studyGroupInfo.studyPeriodEnd,
        description: studyGroupInfo.introduction,
        overlap: true,
        divide: "studyGroup"
      };
      return event;
    }
  );

  // 5. fullCalendar 이벤트 배열 반환
  return events;
};

// TODO : 개인 커스텀 일정을 등록
export interface CustomEventDto {
  title: string;
  studyTimeStart: string;
  studyTimeEnd: string;
  description: string;
  color: string;
}

export const generateCustomEvents = async (
  isLoggedIn: boolean,
  eventInfo: CustomEventDto
) => {
  if (!isLoggedIn) throw new Error("로그인이 필요합니다.");

  const timeSchedule: CustomEventDto = {
    title: eventInfo.title,
    studyTimeStart: eventInfo.studyTimeStart,
    studyTimeEnd: eventInfo.studyTimeEnd,
    description: eventInfo.description,
    color: eventInfo.color,
  };

  const response = await tokenRequestApi.post("/calendars/members", {
    timeSchedule,
  });
  return response;
};

// TODO : 개인 커스텀 일정 조회
export interface FullCalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color?: string;
  divide: string;
}

export const getCustomEvent = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) throw new Error("로그인이 필요합니다.");

  const response = await tokenRequestApi.get("/calendars/members");

  const customEventData : FullCalendarEvent[] = response.data.map((data : any) => {
    const customEvent : FullCalendarEvent = {
      id : data.id.toString(),
      title : data.title,
      start : data.studyTimeStart,
      end : data.studyTimeEnd,
      color : data.color,
      divide: "customEvent"
    }
    return customEvent;
  });
  return customEventData;
};

// TODO : 개인 커스텀 일정 삭제
export const deleteCustomEvents = async (isLoggedIn: boolean, id: number) => {
  if (!isLoggedIn) throw new Error("로그인이 필요합니다.");

  const response = await tokenRequestApi.delete(`/calendars/${id}/members`);
  return response;
};

// TODO : 개인 커스텀 일정 상세 조회
export interface Schedule {
  studyTimeStart: string;
  studyTimeEnd: string;
}

export interface EventData {
  calendarId: number;
  title: string;
  schedule: Schedule;
  description: string;
  overlap: boolean;
  color: string;
}

export const getCustomEvents = async (isLoggedIn: boolean, id: number): Promise<EventData> => {
  if (!isLoggedIn) throw new Error("로그인이 필요합니다.");

  const response: AxiosResponse<EventData> = await tokenRequestApi.get(`/calendars/${id}/members`);
  return response.data;
};
