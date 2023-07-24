import tokenRequestApi from "./TokenRequestApi";
import { PatchCommentDto, GetCommentDto } from "../types/CommentInterfaces";

export const postComment = async (studyGroupId: number, data: string) => {
  await tokenRequestApi.post(`/comment/${studyGroupId}`, {
    content: data,
  });
  // await tokenRequestApi.post(`http://localhost:3000/comment/${studyGroupId}`, {
  //   content: data,
  // });
};

export const getComments = async (
  studyGroupId: number
): Promise<GetCommentDto[]> => {
    const response = await tokenRequestApi.get<GetCommentDto[]>(
      `/comment/${studyGroupId}?page=1&size=10`
    );
    return response.data;
};

export const patchComment = async (
  studyGroupId: number,
  patchId: number,
  data: string
) => {
  try {
    await tokenRequestApi.patch(
      `/studygroup/${studyGroupId}/comment/${patchId}`,
      { content: data }
    );
  } catch (error) {
    throw new Error("댓글 수정 실패");
  }
};

export const deleteComment = async (studyGroupId: number, patchId: number) => {
  try {
    await tokenRequestApi.delete(
      `/studygroup/${studyGroupId}/comment/${patchId}`
    );
  } catch (error) {
    alert("댓글을 삭제하는데 실패했습니다. 권한을 확인하세요");
  }
};
