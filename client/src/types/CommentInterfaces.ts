export interface CommentList {
  id: number;
  nickName: string;
  content: string;
  isMyComment: boolean;
}

export interface CommentPageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface CommentData {
  comment: CommentList[];
  pageInfo: CommentPageInfo;
}
