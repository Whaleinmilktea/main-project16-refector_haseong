import styled from "styled-components";
import ProfileImg from "../components/ProfileImg";
import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { RenderingState } from "../recoil/atoms/RenderingState";
import { LogInState } from "../recoil/atoms/LogInState";
import tokenRequestApi from "../apis/TokenRequestApi";
import { removeTokens } from "./utils/Auth";
import CheckPasswordModal from "../components/modal/CheckPasswordModal";
import {
  getMemberInfo,
  updateMemberDetail,
  checkOauth2Member,
  leaveMembership,
} from "../apis/MemberApi";
import {
  MemberDetailDto,
  MemberInfoResponseDto,
} from "../types/MemberApiInterfaces";
import NicknameEditModal from "../components/modal/NicknameEditModal";
import PasswordEditModal from "../components/modal/PasswordEditModal";

const ProfileInfo = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LogInState);
  const [editingMode, setEditingMode] = useState<string>("")
  const isRendering = useRecoilValue(RenderingState);
  const [isPasswordEditModalOpen, setIsPasswordEditModalOpen] = useState<boolean>(false);
  const [isNicknameEditModalOpen, setIsNicknameEditModalOpen] =
    useState<boolean>(false);
  const [memberInfo, setMemberInfo] = useState<MemberInfoResponseDto | null>(
    null
  );
  const [introduceInfo, setIntroduceInfo] = useState<MemberDetailDto>({
    aboutMe: memberInfo?.aboutMe || "",
  });
  const [isIntroduceEdit, setIsIntroduceEdit] = useState<boolean>(false);
  const [passowrdCheckModalOpen, setPasswordCheckModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    const fetchMemberInfo = async () => {
      try {
        const info = await getMemberInfo(isLoggedIn);
        setMemberInfo(info);
        setIntroduceInfo({ aboutMe: info.aboutMe });
      } catch (error) {}
    };
    fetchMemberInfo();
  }, [isRendering]);

  const handleNicknameEditClick = async () => {
    const data = await checkOauth2Member(isLoggedIn);
    if (data.provider !== "LOCAL") {
      alert("소셜 로그인 유저는 개인정보를 수정할 수 없습니다.");
    } else {
      setEditingMode("nickname")
      setPasswordCheckModalOpen(true);
    }
  };

  const handlePasswordEditClick = async () => {
    const data = await checkOauth2Member(isLoggedIn);
    if (data.provider !== "LOCAL") {
      alert("소셜 로그인 유저는 개인정보를 수정할 수 없습니다.");
    } else {
      setEditingMode("password")
      setPasswordCheckModalOpen(true);
    }
  };

  const handleIntroduceEditClick = () => {
    setIsIntroduceEdit(true);
  };

  const handleIntroduceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIntroduceInfo((prevIntroduceInfo) => ({
      ...prevIntroduceInfo,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const memberDetailDto: MemberDetailDto = {
        aboutMe: introduceInfo?.aboutMe,
      };
      await updateMemberDetail(memberDetailDto);
      setIsIntroduceEdit(false);
      location.reload();
    } catch (error) {
      setIsIntroduceEdit(false);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const confirmed = window.confirm(
        `정말로 회원탈퇴하시겠습니까?

(소셜 로그인 회원의 경우, 탈퇴 후 재로그인시 자동으로 계정이 복구됩니다.)`
      );
      if (confirmed) {
        navigate("/");
        await leaveMembership();
        alert("회원탈퇴가 완료되었습니다.");
        tokenRequestApi.setAccessToken(null);
        removeTokens();
        setIsLoggedIn(false);
      } else {
        alert("회원탈퇴가 취소되었습니다.");
      }
    } catch (error) {}
  };
  return (
    <ProfileInfoContainer>
      <ProfileBaseWrapper>
        <ProfileImage>
          <ProfileImg profileImage={memberInfo?.image} />
        </ProfileImage>
        <ProfileBaseInfo>
          <ProfileInput
            className="nickname-input"
            disabled
            value={memberInfo?.nickName || ""}
          />
          <ProfileInput disabled value={memberInfo?.email || ""} />
          <ProfileInput disabled value={memberInfo?.roles || ""} />
          <EditButtonWrapper>
            <EditButton onClick={handleNicknameEditClick}>닉네임 변경</EditButton>
            <EditButton onClick={handlePasswordEditClick}>비밀번호 변경</EditButton>
          </EditButtonWrapper>
        </ProfileBaseInfo>
      </ProfileBaseWrapper>
      <IntroduceWrapper>
        {!isIntroduceEdit ? (
          <>
            <h4>자기소개</h4>
            <IntroduceTextarea value={memberInfo?.aboutMe} disabled />
          </>
        ) : (
          <>
            <h4>자기소개</h4>
            <IntroduceTextarea
              name="aboutMe"
              placeholder="자기소개를 입력해주세요"
              onChange={handleIntroduceChange}
            />
          </>
        )}
        <ButtonWrapper>
          <ExitEditButton onClick={handleDeleteClick}>회원탈퇴</ExitEditButton>
          {!isIntroduceEdit ? (
            <EditButton
              id="introduceEditButton"
              onClick={handleIntroduceEditClick}
            >
              Edit
            </EditButton>
          ) : (
            <EditButton id="introduceSaveButton" onClick={handleSaveClick}>
              Save
            </EditButton>
          )}
        </ButtonWrapper>
      </IntroduceWrapper>
      <PasswordEditModal
        isOpen={isPasswordEditModalOpen}
        closeModal={() => setIsPasswordEditModalOpen(false)}
      />
      <NicknameEditModal
        isOpen={isNicknameEditModalOpen}
        closeModal={() => setIsNicknameEditModalOpen(false)}
        userNickname={memberInfo?.nickName}
        />
      <CheckPasswordModal
        isOpen={passowrdCheckModalOpen}
        closeModal={() => setPasswordCheckModalOpen(false)}
        setIsPasswordEditModalOpen={setIsPasswordEditModalOpen}
        setIsNicknameEditModalOpen={setIsNicknameEditModalOpen}
        editingMode={editingMode}
      />
    </ProfileInfoContainer>
  );
};

export default ProfileInfo;

const ProfileInfoContainer = styled.div`
  width: 900px;
  height: 100%;
  padding: 100px 0 0 50px;
`;

const ProfileBaseWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ProfileImage = styled.div`
  margin-right: 20px;
`;

const ProfileInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 90%;
  height: 36px;
`;

const ProfileBaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;

  .nickname-input {
    border: solid 0px #ccc;
    background-color: transparent;
    color: #2759a2;
    font-size: 24px;
    font-weight: 700;
    padding: 0 0 15px;
  }
`;

const EditButtonWrapper = styled.div``;

const EditButton = styled.button`
  width: 100px;
  height: 40px;
  margin-bottom: 10px;
  margin-left: 10px;
  padding: 2px 6px;
  background-color: ${(props) =>
    props.id === "introduceEditButton"
      ? "#4d74b1"
      : props.id === "introduceSaveButton"
      ? "#868DAA"
      : "#4d74b1"};
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.id === "introduceEditButton"
        ? "#4d74b1"
        : props.id === "introduceSaveButton"
        ? "#868DAA"
        : "#4d74b1"};
  }
`;

const IntroduceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 900px;

  h4 {
    width: 90%;
    text-align: left;
    color: #2759a2;
    font-size: 21px;
    font-weight: 700;
    margin: 12px 0;
  }
`;

const IntroduceTextarea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  width: 90%;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f5f5f5;
  transition: all 0.3s;

  &:disabled {
    background-color: #fff;
  }

  &:focus {
    outline: none;
    border-color: #4d74b1;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const ExitEditButton = styled.button`
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: #666;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #5a0202;
  }
`;
