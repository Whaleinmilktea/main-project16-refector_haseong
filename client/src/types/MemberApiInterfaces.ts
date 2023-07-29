export interface MemberInfoResponseDto {
  email: string;
  image: string;
  nickName: string;
  aboutMe: string;
  roles: string[];
}

export interface EditPasswordDto {
  password: string;
}

export interface EditNicknameDto {
  nickName: string;
}

export interface MemberProfileUpdateImageDto {
  image: File | undefined;
}

export interface MemberDetailDto {
  aboutMe: string;
}

export interface MemberPasswordCheckDto {
  password: string;
}

export interface Oauth2MemberCheckDto {
  provider: string;
}

export interface OtherMemberInfo {
  nickName: string;
  aboutMe: string;
  image: string;
}

// 리팩토링 이후 더 이상 사용하지 않는 코드
// export interface MemberUpdateDto {
//   nickName: string;
//   password: string;
// }

