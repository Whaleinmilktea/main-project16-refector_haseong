import tokenRequestApi from "./TokenRequestApi";
import { GetCommentDto } from "../types/CommentInterfaces";
import { Base64 } from "js-base64";

export const postComment = async (studyGroupId: number, data: string) => {
  await tokenRequestApi.post(`comment/${studyGroupId}/`, {
    content: data,
  });
  // await tokenRequestApi.post(`http://localhost:3000/${encodedurl}`, {
  //   content: data,
  // });
};

export const getComments = async (
  studyGroupId: number
): Promise<GetCommentDto[]> => {
    // const response = await tokenRequestApi.get<GetCommentDto[]>(
    //   `/comment/${studyGroupId}?page=1&size=10`
    // );
    const response = await tokenRequestApi.get<GetCommentDto[]>(
      `http://localhost:3000/comment/`
    );
    return response.data;
};

export const patchComment = async (
  patchId: number,
  data: string
) => {
    await tokenRequestApi.patch(`comment/${patchId}`,{ id : patchId, content: data });
    // await tokenRequestApi.patch(`http://localhost:3000/Y29tbWVudC8xP3BhZ2U9MSZzaXplPTEw/1`,{ id : patchId, content: data });
}

export const deleteComment = async (studyGroupId: number, patchId: number) => {
  try {
    await tokenRequestApi.delete(
      `/comment/${studyGroupId}/${patchId}`
    );
    // await tokenRequestApi.delete(`http://localhost:3000/Y29tbWVudC8xP3BhZ2U9MSZzaXplPTEw/1`);
  } catch (error) {
    alert("댓글을 삭제하는데 실패했습니다. 권한을 확인하세요");
  }
};