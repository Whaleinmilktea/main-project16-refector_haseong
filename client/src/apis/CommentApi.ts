import tokenRequestApi from "./TokenRequestApi";
import { CommentData } from "../types/CommentInterfaces";
import { Base64 } from "js-base64";

const encodedUrl = (el : string | number) => {
  if (typeof el === "string") return Base64.encode(el);
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

export const patchComment = async (studyGroupId: number, data: string) => {
  await tokenRequestApi.post(
    `comment/${Base64.encode(studyGroupId.toString())}`,
    { content: data }
  );
};

export const deleteComment = async (studyGroupId: number, patchId: number) => {
  try {
    await tokenRequestApi.delete(`/comment/${studyGroupId}/${patchId}`);
  } catch (error) {
    alert("댓글을 삭제하는데 실패했습니다. 권한을 확인하세요");
  }
};
