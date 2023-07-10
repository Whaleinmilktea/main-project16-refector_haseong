import tokenRequestApi from "./TokenRequestApi";
import {
  MemberDetailDto,
  MemberInfoResponseDto,
  MemberPasswordCheckDto,
  MemberProfileUpdateImageDto,
  MemberUpdateDto,
  Oauth2MemberCheckDto,
} from "../types/MemberInterfaces";

export const getMemberInfo = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요.");
  const response = await tokenRequestApi.get<MemberInfoResponseDto>("/members");
  return response.data;
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
    // onSuccess & onError는 react-query의 기능을 활용하여 컴포넌트 단에서 제어할 수 있도록 수정 필요
  });
};

export const updateMemberDetail = async (memberDetailDto: MemberDetailDto) => {
  await tokenRequestApi.patch("/members/detail", memberDetailDto);
};

export const requestWithdrawal = async () => {
  await tokenRequestApi.delete("/members");
};

export const checkMemberPassword = async (
  memberPasswordCheckDto: MemberPasswordCheckDto
) => {
  const response = await tokenRequestApi.post("/members/password", memberPasswordCheckDto);
  const data = response.data;
  return data;
};

export const checkOauth2Member = async (isLoggedIn: boolean) => {
  if (!isLoggedIn) throw new Error("로그인 상태를 확인해주세요.");
  const response = await tokenRequestApi.get<Oauth2MemberCheckDto>(
    "/members/provider"
  );
  const data = response.data;
  return data;
};