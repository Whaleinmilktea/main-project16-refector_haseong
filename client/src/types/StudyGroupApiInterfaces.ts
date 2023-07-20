export interface StudyGroup {
  id: number;
  title: string;
  tagValues: string[];
}

export interface StudyGroupListDto {
  leaders: StudyGroup[];
  members: StudyGroup[];
}

export interface WaitingStudyGroupItemDto {
  id: number;
  title: string;
}

export interface WaitingStudyGroupListDto {
  beStudys: WaitingStudyGroupItemDto[];
}

export interface StudyTags {
  [key: string]: string[];
}

export interface StudyGroupCreateDto {
  studyName: string;
  startDate: string;
  endDate: string;
  dayOfWeek: number[];
  startTime: string,
  endTime: string,
  memberMin: number,
  memberMax: number,
  platform: string,
  introduction: string,
}

export interface StudyInfoDto {
  id: number;
  studyName: string;
  studyPeriodStart: string;
  studyPeriodEnd: string;
  daysOfWeek: string[];
  studyTimeStart: string;
  studyTimeEnd: string;
  memberCountMin: number;
  memberCountMax: number;
  memberCountCurrent: number;
  platform: string;
  introduction: string;
  isRecruited: boolean;
  tags: StudyTags;
  leaderNickName: string;
  leader: boolean;
}

export interface StudyGroupUpdateDto {
  id?: number;
  studyName: string;
  studyPeriodStart: string;
  studyPeriodEnd: string;
  daysOfWeek: string[];
  studyTimeStart: string;
  studyTimeEnd: string;
  memberCountMin: number;
  memberCountMax: number;
  platform: string;
  introduction: string;
  tags: StudyTags;
}

export interface StudyGroupUpdateDto {
  id?: number;
  studyName: string;
  studyPeriodStart: string;
  studyPeriodEnd: string;
  daysOfWeek: string[];
  studyTimeStart: string;
  studyTimeEnd: string;
  memberCountMin: number;
  memberCountMax: number;
  platform: string;
  introduction: string;
  tags: StudyTags;
}

export interface StudyGroupRecruitmentStatusUpdateDto {
  state: boolean;
}

export interface StudyGroupMemberApprovalDto {
  nickName: string;
}

export interface StudyGroupMemberApprovalDto {
  nickName: string;
}

export interface StudyGroupMemberWaitingListDto {
  nickName: [string];
}

export interface StudyGroupMemberListDto {
  nickName: [string];
}

export interface StudyListOrderDto {
  data: StudyGroup[];
}