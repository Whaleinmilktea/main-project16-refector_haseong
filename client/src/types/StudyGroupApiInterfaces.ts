export interface StudyGroupCreateDto {
  studyName: string;
  startDate: string;
  endDate: string;
  dayOfWeek: number[];
  startTime: string;
  endTime: string;
  color: string;
  memberMin: number;
  memberMax: number;
  platform: string;
  introduction: string;
  tags: string[];
}

export interface StudyInfoDto {
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
  color: string;
  tags: string[];
  leaderNickName: string;
  isLeader: boolean;
  views: number;
  likes: number;
  isLikes: boolean;
}

export interface MyStudyData {
  study: Study[];
}

export interface Study {
  id: number;
  title: string;
  image: string;
  tags: string[];
  views: number;
  likes: number;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface StudyGroupListDto {
  study: Study[];
  pageInfo: PageInfo;
}

export interface StudyListOrderDto {
  data: StudyGroup[];
}

export interface StudyGroup {
  id: number;
  title: string;
  tagValues: string[];
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

export interface StudyGroupRecruitmentStatusUpdateDto {
  state: boolean;
}

export interface StudyGroupMemberList {
  nickName: [string];
}

export interface MemberManageAction {
  nickName: string;
}
