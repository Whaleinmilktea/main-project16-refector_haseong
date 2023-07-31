import { AxiosResponse } from "axios";
import tokenRequestApi from "./TokenRequestApi";
import {
  MemberDetailDto,
  MemberInfoResponseDto,
  MemberPasswordCheckDto,
  MemberProfileUpdateImageDto,
  Oauth2MemberCheckDto,
  OtherMemberInfo,
} from "../types/MemberApiInterfaces";
import { encodedUrl } from "./CommentApi";
// * recoil에서 전역 LogInState를 가져와서 isLogin 변수에 할당

export const getMemberInfo = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요.");
  const response = await tokenRequestApi.get<MemberInfoResponseDto>("/members");
  return response.data;
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

export const checkMemberPassword = async (
  memberPasswordCheckDto: MemberPasswordCheckDto
) => {
  try {
    const response: AxiosResponse = await tokenRequestApi.post(
      "/members/pass-auth",
      memberPasswordCheckDto
    );
    if (response.status <= 299) return true;
    if (response.status === 400) return false;
  } catch (error) {
    return false;
  }
};

export const checkOauth2Member = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요.");
  const response = await tokenRequestApi.get<Oauth2MemberCheckDto>(
    "/members/provider"
  );
  const data = response.data;
  return data;
};

// refector 이후 코드
export const updateUserNickname = async (isLoggedIn : boolean, nickname: string) => {
  if(!isLoggedIn) throw new Error("로그인 상태를 확인해주세요.");
  await tokenRequestApi.patch("/members/name", nickname);
};

export const updateUserPassword = async (isLoggedIn : boolean, password: string) => {
  if(!isLoggedIn) throw new Error("로그인 상태를 확인해주세요.");
  await tokenRequestApi.patch("/members/pass", password );
}

export const updateMemberDetail = async (memberDetailDto: MemberDetailDto) => {
  await tokenRequestApi.patch("/members/aboutme", memberDetailDto);
};

export const leaveMembership = async () => {
  await tokenRequestApi.delete("/members");
};

// 리팩토링 이후 더 이상 사용하지 않는 코드
// export const updateMember = async (
//   isLoggedIn: boolean,
//   data: MemberUpdateDto
// ) => {
//   if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요.");
//   if (!data) throw new Error("입력값을 확인해주세요.");
//   await tokenRequestApi.patch("/members", data);
// };

export const getOtherMemberInfo = async (nickname: string) => {
  const response = await tokenRequestApi.get<OtherMemberInfo>(
    `/members/${encodedUrl(nickname)}`
  );
  if (response.status !== 200) throw new Error("존재하지 않는 사용자입니다.");
  if (response.data.aboutMe === null) response.data.aboutMe = "아직 자기소개가 없습니다."
  return response.data;
}
