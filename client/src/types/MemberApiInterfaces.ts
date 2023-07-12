export interface MemberInfoResponseDto {
  email: string;
  image: string;
  nickName: string;
  aboutMe: string;
  roles: string[];
}

export interface MemberUpdateDto {
  nickName: string;
  password: string;
}

export interface EditPasswordDto {
  password: string;
}

export interface EditNicknameDto {
  nickName: string;
}


export interface MemberProfileUpdateImageDto {
  // image: FormData;
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
