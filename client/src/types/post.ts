export interface CreatePostInterface {
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
  color: string;
}
