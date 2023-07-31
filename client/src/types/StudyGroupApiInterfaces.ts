export interface StudyGroupCreateDto {
  studyName: string;
  startDate: string;
  endDate: string;
  dayOfWeek: number[];
  startTime: string;
  endTime: string;
  memberMin: number;
  memberMax: number;
  platform: string;
  introduction: string;
  tags: string[];
}

export interface StudyGroupListDto {
  id?: number;
  title: string;
  image: string;
  tags: string[];
  views: number;
  likes: number;
}

export interface StudyInfoDto {
  id: number | string;
  studyName: string;
  image: string;
  memberMin: number;
  memberMax: number;
  memberCnt: number;
  platform: string;
  introduction: string;
  isRecruited: boolean;
  startDate: string;
  endDate: string;
  dayOfWeek: number[];
  startTime: string;
  endTime: string;
  tags: string[];
  leaderNickName: string;
  isLeader: boolean;
  views: number;
  likes: number;
  isLikes: boolean;
}

export interface StudyGroup {
  id: number;
  title: string;
  tagValues: string[];
}

export interface MyStudyGroupListDto {
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
  tags: [];
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
  tags: [];
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
