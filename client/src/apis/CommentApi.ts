import tokenRequestApi from "./TokenRequestApi";
import { CommentData } from "../types/CommentInterfaces";
import { Base64 } from "js-base64";

export const encodedUrl = (el : string | number | boolean) => {
  if (typeof el === "string") return Base64.encode(el);
  if (typeof el === "boolean") return Base64.encode(`${el}`)
  else return Base64.encode(el.toString());
}

export const postComment = async (studyGroupId: number, data: string) => {
  await tokenRequestApi.post(
    `comment/${encodedUrl(studyGroupId)}`,
    {
      content: data,
    }
  );
};

export const getComments = async (
  studyGroupId: number,
  page : number,
): Promise<CommentData> => {
  const response = await tokenRequestApi.get<CommentData>(
    `comment/${encodedUrl(studyGroupId)}?p=${encodedUrl(page)}&s=${encodedUrl(3)}`
  );
  return response.data;
};

// 500에러가 뜨네용? 댓글 수정 기능 확인부탁드립니다.
export const patchComment = async (commentId: number, data: string) => {
  await tokenRequestApi.patch(
    `comment/${encodedUrl(commentId)}`,
    { content: data }
  );
};

export const deleteComment = async (studyGroupId: number, commentId: number) => {
  try {
    await tokenRequestApi.delete(`/comment/${encodedUrl(studyGroupId)}/${encodedUrl(commentId)}`);
  } catch (error) {
    alert("댓글을 삭제하는데 실패했습니다. 권한을 확인하세요");
  }
};
