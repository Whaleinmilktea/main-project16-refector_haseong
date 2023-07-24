export interface GetCommentDto {
  id : number;
  nickName: string;
  content: string;
  isMyComment: boolean
}

export interface PatchCommentDto {
  id : number;
  content: string;
}

