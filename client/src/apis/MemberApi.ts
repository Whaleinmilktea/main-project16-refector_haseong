import { AxiosResponse } from "axios";
import tokenRequestApi from "./TokenRequestApi";
import {
  MemberDetailDto,
  MemberInfoResponseDto,
  MemberPasswordCheckDto,
  MemberProfileUpdateImageDto,
  MemberUpdateDto,
  Oauth2MemberCheckDto,
} from "../types/MemberApiInterfaces";
// * recoil에서 전역 LogInState를 가져와서 isLogin 변수에 할당

// TODO: 유저정보 get 요청하는 axios 코드
export const getMemberInfo = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요.");
  const response = await tokenRequestApi.get<MemberInfoResponseDto>("/members");
  const data = response.data;
  return data; // 데이터 반환
};

export const updateMember = async (
  isLoggedIn: boolean,
  data: MemberUpdateDto
) => {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요.");
  if (!data) throw new Error("입력값을 확인해주세요.");
  await tokenRequestApi.patch("/members", data);
};

export const updateMemberProfileImage = async (
  image: MemberProfileUpdateImageDto
) => {
  if (!image.image) throw new Error("이미지를 확인해주세요.");
  const formData = new FormData();
  formData.append("image", image.image);
  await tokenRequestApi.patch("/members/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateMemberDetail = async (memberDetailDto: MemberDetailDto) => {
  await tokenRequestApi.patch("/members/detail", memberDetailDto);
};

export const leaveMembership = async () => {
  await tokenRequestApi.delete("/members");
};

export const checkMemberPassword = async (
  memberPasswordCheckDto: MemberPasswordCheckDto
) => {
  try {
    const response: AxiosResponse = await tokenRequestApi.post(
      "/members/password",
      memberPasswordCheckDto
    );
    if (response.status <= 299) return true;
    else return false;
  } catch (error) {}
};

export const checkOauth2Member = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요.");
  const response = await tokenRequestApi.get<Oauth2MemberCheckDto>(
    "/members/provider"
  );
  const data = response.data;
  return data;
};
