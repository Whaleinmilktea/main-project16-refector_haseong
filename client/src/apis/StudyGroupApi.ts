import axios from "axios";
import tokenRequestApi from "./TokenRequestApi";
import { baseApi } from "./EduApi";
import { Base64 } from "js-base64";
import {
  StudyGroupCreateDto,
  StudyGroupListDto,
  StudyGroupMemberApprovalDto,
  StudyGroupMemberListDto,
  StudyGroupMemberWaitingListDto,
  StudyGroupRecruitmentStatusUpdateDto,
  StudyGroupUpdateDto,
  StudyInfoDto,
  StudyListOrderDto,
} from "../types/StudyGroupApiInterfaces";

export const createStudyGroup = async (
  data: StudyGroupCreateDto,
  isLoggedIn: boolean
) => {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  await tokenRequestApi.post(`${import.meta.env.VITE_APP_API_URL}/study`, data);
  alert("스터디가 생성되었습니다");
};

export const getStudyGroupList = async (
  currentPage: number
): Promise<StudyGroupListDto> => {
  const response = await tokenRequestApi.get<StudyGroupListDto>(
    `/study/list?p=${Base64.encode(currentPage.toString())}&s=${Base64.encode(
      "6"
    )}`
  );
  return response.data;
};

export async function getStudyGroupInfo(id: number) {
  const response = await tokenRequestApi.get<StudyInfoDto>(
    `/study/${Base64.encode(id.toString())}`
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
      `/study/${Base64.encode(studygroupId?.toString())}/likes`
    );
    return response.data;
  }
};

export const applyStudy = async (studygroupId: number | undefined) => {
  if (studygroupId === undefined) {
    alert("스터디 경로가 전달되지 않습니다. 스터디의 개설 상태를 확인해주세요");
  } else {
    try {
      await tokenRequestApi.post(
        `/join/${Base64.encode(studygroupId.toString())}`
      );
    } catch (error) {
      alert("이미 가입신청을 하셨습니다");
    }
  }
};

export const getLeaderRoleStduies = async () => {
  // https://{{local}}/study/leader/list
  const response = await axios.get<StudyGroupListDto[]>(
    "http://localhost:3000/leaderStudies"
  );
  return response;
};

export const getMemberRoleStduies = async () => {
  // https://{{local}}/study/leader/list
  const response = await axios.get<StudyGroupListDto[]>(
    "http://localhost:3000/memberStudies"
  );
  return response;
};

export const getWaitingStudyGroupList = async () => {
  const response = await axios.get<StudyGroupListDto[]>(
    `http://localhost:3000/waitingStudyGroupList`
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

export async function updateStudyGroupInfo(
  data: StudyGroupUpdateDto,
  isLoggedIn: boolean,
  id: number
) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  const formattedData = {
    ...data,
    studyPeriodStart: `${data.studyPeriodStart}T${data.studyTimeStart}:00`,
    studyPeriodEnd: `${data.studyPeriodEnd}T${data.studyTimeEnd}:00`,
    studyTimeStart: `${data.studyPeriodStart}T${data.studyTimeStart}:00`,
    studyTimeEnd: `${data.studyPeriodEnd}T${data.studyTimeEnd}:00`,
  };
  const response = await tokenRequestApi.patch(
    `/studygroup/${id}`,
    formattedData
  );
  return response;
}

export async function updateStudyGroupContentsInfo(
  data: StudyGroupUpdateDto,
  isLoggedIn: boolean,
  id: number
) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  const formattedData = {
    ...data,
  };
  await tokenRequestApi.patch(`/studygroup/${id}`, formattedData);
  alert("성공적으로 스터디 정보를 업데이트 했습니다");
}

export async function deleteStudyGroupInfo(id: number, isLoggedIn: boolean) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  await tokenRequestApi.delete(`/studygroup/${id}`);
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

export async function approveStudyGroupApplication(
  id: number,
  nickname: string,
  isLoggedIn: boolean
) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");
  const data: StudyGroupMemberApprovalDto = {
    nickName: nickname,
  };
  await tokenRequestApi.post(`/studygroup/${id}/candidate`, data);
  alert("해당 회원의 가입을 허가합니다");
}

export async function rejectStudyGroupApplication(
  id: number,
  nickname: string
) {
  const data: StudyGroupMemberApprovalDto = {
    nickName: nickname,
  };
  const config = {
    data,
  };
  await tokenRequestApi.delete(`/studygroup/${id}/candidate`, config);
  alert("가입이 거절됐습니다");
}

export async function forceExitStudyGroup(
  id: number,
  data: StudyGroupMemberApprovalDto
) {
  const config = {
    data,
  };
  const response = await tokenRequestApi.delete(
    `/studygroup/${id}/kick`,
    config
  );
  return response;
}

export async function delegateStudyGroupLeader(
  id: number,
  data: StudyGroupMemberApprovalDto
) {
  const response = await tokenRequestApi.patch(
    `/studygroup/${id}/privileges`,
    data
  );
  return response;
}

export async function getStudyGroupMemberWaitingList(
  id: number,
  isLoggedIn: boolean
) {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요");

  const response = await tokenRequestApi.get<StudyGroupMemberWaitingListDto>(
    `/studygroup/${id}/member?join=false`
  );
  return response.data;
}

export async function getStudyGroupMemberList(id: number, isLoggedIn: boolean) {
  if (!isLoggedIn) throw new Error("Access token is not defined.");
  const response = await axios.get<StudyGroupMemberListDto>(
    `${import.meta.env.VITE_APP_API_URL}/studygroup/${id}/member?join=true`
  );
  if (response === undefined) return;
  return response.data as StudyGroupMemberListDto;
}

export async function exitStudyGroup(id: number, isLoggedIn: boolean) {
  if (!isLoggedIn) throw new Error("Access token is not defined.");
  const response = await tokenRequestApi.delete(`/studygroup/${id}/member`);
  return response.data;
}

export async function changeStudyGroupRecruitmentStatus(
  id: number,
  isLoggedIn: boolean
) {
  if (!isLoggedIn) throw new Error("Access token is not defined.");
  const config = {
    status: false,
  };
  await tokenRequestApi.patch(`/studygroup/${id}/status`, config);
  alert("스터디 모집 상태를 변경했습니다");
}

export async function getStudyListOrder(order: string, isAscending: boolean) {
  const response = await baseApi.get<StudyListOrderDto>(
    `/studygroups/order?page=1&size=3&order=${order}&isAscending=${isAscending}`
  );
  return response.data.data;
}
