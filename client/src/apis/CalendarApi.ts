import { AxiosResponse } from "axios";
import tokenRequestApi from "./TokenRequestApi";
import {
  getMemberRoleStduies,
  getStudyGroupInfo,
} from "./StudyGroupApi";
import { StudyInfoDto } from "../types/StudyGroupApiInterfaces";
import { StudyEvent } from "../types/CalendarInterfaces";
import { DayOfWeekBinaryToNumber } from "../pages/utils/DaysOfWeekMap";

export const generateStudyEvents = async (): Promise<StudyEvent[]> => {
  const myStudyGroups = await getMemberRoleStduies(); // 멤버로 있는 모든 스터디 조회(리더 포함)
  const studyGroupIds: number[] = [];
  for (const study of myStudyGroups.study) {
    studyGroupIds.push(study.id);
  } // 스터디 아이디만 추출

  console.log("내가 속한 스터디 목록", myStudyGroups) // ok ===> 추후 vitest + msw 테스트코드화
  console.log("아이디만 추출한 목록", studyGroupIds); // ok ===> 추후 vitest + msw 테스트코드화

  const studyGroupInfos: StudyInfoDto[] = []; // 내가 속한 스터디 목록의 스터디 정보를 담을 배열
  for (const studyId of studyGroupIds) {
    const studyGroupInfo = await getStudyGroupInfo(studyId);
    studyGroupInfos.push(studyGroupInfo);
  }

  console.log("내가 속한 스터디 목록의 스터디 정보", studyGroupInfos); // ok ===> 추후 vitest + msw 테스트코드화

  const events: StudyEvent[] = studyGroupInfos.map(
    (studyGroupInfo: StudyInfoDto) => {
      const mappedDaysOfWeek: string[] = DayOfWeekBinaryToNumber(studyGroupInfo.dayOfWeek)

      const event: StudyEvent = {
        id: studyGroupInfo.id.toString(),
        title: studyGroupInfo.studyName,
        daysOfWeek: mappedDaysOfWeek,
        startTime: `${studyGroupInfo.startTime}:00`,
        endTime: `${studyGroupInfo.endTime}:00`,
        startRecur: studyGroupInfo.startDate,
        endRecur: studyGroupInfo.endDate,
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
