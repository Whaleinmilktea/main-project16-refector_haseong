export interface PostCommentDto {
  content: string;
}

export interface PatchCommentDto {
  id : number;
  content: string;
}

export interface GetCommentDto {
  id : number;
  nickName: string;
  content: string;
  isMyComment: boolean
}