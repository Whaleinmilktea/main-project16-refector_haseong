export interface MemberInfoResponseDto {
  uuid: string;
  email: string;
  profileImage: string;
  nickName: string;
  aboutMe: string;
  withMe: string;
  memberStatus: "MEMBER_ACTIVE" | "MEMBER_INACTIVE";
  roles: string[];
}

export interface MemberUpdateDto {
  nickName: string;
  password: string;
}

export interface MemberProfileUpdateImageDto {
  image: File | undefined;
}

export interface MemberDetailDto {
  aboutMe: string;
  withMe: string;
}

export interface MemberPasswordCheckDto {
  password: string;
}

export interface Oauth2MemberCheckDto {
  provider: string;
}