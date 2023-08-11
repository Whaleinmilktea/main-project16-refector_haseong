import tokenRequestApi from "./TokenRequestApi";
import { baseApi } from "./EduApi";
import {
  MyStudyData,
  StudyGroupCreateDto,
  StudyGroupListDto,
  StudyGroupMemberList,
  StudyGroupRecruitmentStatusUpdateDto,
  StudyGroupUpdateDto,
  StudyInfoDto,
  StudyListOrderDto,
} from "../types/StudyGroupApiInterfaces";
import { encodedUrl } from "../pages/utils/EncodeUrl";

export const createStudyGroup = async (
  data: StudyGroupCreateDto,
  isLoggedIn: boolean
) => {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  await tokenRequestApi.post(`/study`, data);
  alert("스터디가 생성되었습니다");
};

export const getStudyGroupList = async (
  currentPage: number
): Promise<StudyGroupListDto> => {
  const response = await tokenRequestApi.get<StudyGroupListDto>(
    `/study/list?p=${encodedUrl(currentPage)}&s=${encodedUrl(6)}`
  );
  return response.data;
};

export async function getStudyGroupInfo(id: number) {
  const response = await tokenRequestApi.get<StudyInfoDto>(
    `/study/${encodedUrl(id)}`
  );
  const studyInfo = response.data;
  return studyInfo;
  3;
}

export const updateLikeStatus = async (studygroupId: number | undefined) => {
  if (studygroupId === undefined) {
    alert("스터디 경로가 전달되지 않습니다. 스터디의 개설 상태를 확인해주세요");
  } else {
    const response = await tokenRequestApi.patch(
      `/study/${encodedUrl(studygroupId)}/likes`
    );
    return response.data;
  }
};

export const applyStudy = async (studygroupId: number | undefined) => {
  if (studygroupId === undefined) {
    alert("스터디 경로가 전달되지 않습니다. 스터디의 개설 상태를 확인해주세요");
  } else {
    try {
      await tokenRequestApi.post(`/join/${encodedUrl(studygroupId)}`);
      alert("스터디 신청이 완료되었습니다.");
    } catch (error) {
      alert("이미 가입신청을 하셨습니다");
    }
  }
};

export const getLeaderRoleStduies = async () => {
  const response = await tokenRequestApi.get<MyStudyData>("/study/leader/list");
  return response.data;
};

export const getMemberRoleStduies = async () => {
  const response = await tokenRequestApi.get<MyStudyData>(
    `/study/join/list?m=${encodedUrl(true)}`
  );
  return response.data;
};

export const getWaitingStudyGroupList = async () => {
  const response = await tokenRequestApi.get<MyStudyData>(
    `/study/join/list?m=${encodedUrl(false)}`
  );
  return response.data;
};

export async function cancelStudyGroupApplication(
  id: number,
  isLoggedIn: boolean
) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인하세요");
  await tokenRequestApi.delete(`/studygroup/${id}/join`);
  alert("해당 그룹에 가입신청을 철회합니다");
}

export async function updateStudyGroup(
  data: StudyGroupCreateDto, // 업데이트와 생성 데이터가 동일
  isLoggedIn: boolean,
  studygroupId: number
) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  const response = await tokenRequestApi.patch(
    `/study/${encodedUrl(studygroupId)}`,
    data
  );
  return response;
}

export async function updateStudyGroupContentsInfo(
  data: StudyGroupUpdateDto,
  isLoggedIn: boolean,
  studygroupId: number
) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  const formattedData = {
    ...data,
  };
  await tokenRequestApi.patch(`/studygroup/${studygroupId}`, formattedData);
  alert("성공적으로 스터디 정보를 업데이트 했습니다");
}

export async function deleteStudyGroupInfo(studygroupId: number, isLoggedIn: boolean) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  await tokenRequestApi.delete(`/study/${encodedUrl(studygroupId)}`);
  alert("스터디가 삭제되었습니다.");
}

export async function updateStudyGroupRecruitmentStatus(
  id: number,
  data: StudyGroupRecruitmentStatusUpdateDto,
  isLoggedIn: boolean
) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  await tokenRequestApi.patch(`/studygroup/${id}`, data);
  alert("스터디 모집 상태를 최신화하는데 성공했습니다");
}

export async function getCandidateMembers(id: number, isLoggedIn: boolean) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  const response = await tokenRequestApi.get<StudyGroupMemberList>(
    `/members/list?s=${encodedUrl(id)}&m=${encodedUrl(false)}`
  );
  return response.data;
}

export async function getGroupMembers(id: number, isLoggedIn: boolean) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  const response = await tokenRequestApi.get<StudyGroupMemberList>(
    `/members/list?s=${encodedUrl(id)}&m=${encodedUrl(true)}`
  );
  if (response === undefined) return;
  return response.data;
}

export async function approveStudyGroupApplication(
  studygroupId: number,
  nickname: string,
  isLoggedIn: boolean
) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  await tokenRequestApi.patch(`/join/${encodedUrl(studygroupId)}/apply`, {
    nickName: nickname,
  });
  alert("해당 회원의 가입을 허가합니다");
}

export async function rejectStudyGroupApplication(
  studygroupId: number,
  nickname: string
) {
  await tokenRequestApi.delete(`/join/${encodedUrl(studygroupId)}/reject`, {
    data: { nickName: nickname },
  });
  alert("가입이 거절됐습니다");
}

export async function forceKickStudyGroup(
  studygroupId: number,
  nickname: string
) {
  const response = await tokenRequestApi.delete(`/join/${encodedUrl(studygroupId)}/kick`, {
    data: { nickName: nickname },
  });
  return response;
}

export async function ChangeStudyGroupLeader(
  studygroupId: number,
  data: string
) {
  const response = await tokenRequestApi.patch(
    `/study/${encodedUrl(studygroupId)}/leader`,
    data
  );
  return response.data;
}

export async function exitStudyGroup(studygroupId: number, isLoggedIn: boolean) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  const response = await tokenRequestApi.delete(`/join/${encodedUrl(studygroupId)}`);
  return response.data;
}

export async function changeStudyGroupRecruitmentStatus(
  studygroupId: number,
  isLoggedIn: boolean
) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  await tokenRequestApi.patch(`/study/${encodedUrl(studygroupId)}/status`, );
  alert("스터디 모집 상태를 변경했습니다");
}

export async function getStudyListOrder(order: string, isAscending: boolean) {
  const response = await baseApi.get<StudyListOrderDto>(
    `/studygroups/order?page=1&size=3&order=${order}&isAscending=${isAscending}`
  );
  return response.data.data;
}
