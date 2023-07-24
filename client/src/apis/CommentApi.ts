import tokenRequestApi from "./TokenRequestApi";
<<<<<<< HEAD

export const postComment = async (studyGroupId: number, data: string) => {
  try {
    await tokenRequestApi.post(`/comment/${studyGroupId}`, {
      content: data,
    });
  } catch (error) {
    throw new Error("댓글 등록 실패");
  }
=======
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
>>>>>>> cc96929547fd18692fc54161c0648b4705156713
};

export const patchComment = async (
  studyGroupId: number,
  patchId: number,
  data: string
) => {
  try {
    await tokenRequestApi.patch(`/comment/${studyGroupId}`, {
      id: patchId,
      content: data,
    });
  } catch (error) {
    throw new Error("댓글 수정 실패");
  }
};

export const deleteComment = async (studyGroupId: number, patchId: number) => {
  try {
    await tokenRequestApi.delete(`/comment/${studyGroupId}/${patchId}`);
  } catch (error) {
    alert("댓글을 삭제하는데 실패했습니다. 권한을 확인하세요");
  }
};
