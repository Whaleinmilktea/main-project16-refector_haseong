import styled from "styled-components";
import ProfileImg from "../components/ProfileImg";
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
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
import { MemberDetailDto } from "../types/MemberApiInterfaces";
import NicknameEditModal from "../components/modal/NicknameEditModal";
import PasswordEditModal from "../components/modal/PasswordEditModal";
import { Tooltip } from "react-tooltip";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";

const ProfileInfo = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LogInState);
  const [editingMode, setEditingMode] = useState<string>("");
  const [isPasswordEditModalOpen, setIsPasswordEditModalOpen] =
    useState<boolean>(false);
  const [isNicknameEditModalOpen, setIsNicknameEditModalOpen] =
    useState<boolean>(false);
  const [introduceInfo, setIntroduceInfo] = useState<MemberDetailDto>({
    aboutMe: "",
  });
  const [isIntroduceEdit, setIsIntroduceEdit] = useState<boolean>(false);
  const [passowrdCheckModalOpen, setPasswordCheckModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery(["userInfo"], () => {
    return getMemberInfo(isLoggedIn);
  });

  useEffect(() => {
    refetch();
  }, [isNicknameEditModalOpen]);

  const userInfo = data;

  if (!isLoggedIn) navigate("/login");
  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const handleNicknameEditClick = async () => {
    const data = await checkOauth2Member(isLoggedIn);
    if (data.provider !== "LOCAL") {
      alert("소셜 로그인 유저는 개인정보를 수정할 수 없습니다.");
    } else {
      setEditingMode("nickname");
      setPasswordCheckModalOpen(true);
    }
  };

  const handlePasswordEditClick = async () => {
    const isApprove = await checkOauth2Member(isLoggedIn);
    if (isApprove.provider !== "LOCAL") {
      alert("소셜 로그인 유저는 개인정보를 수정할 수 없습니다.");
    } else {
      setEditingMode("password");
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
          <ProfileImg profileImage={userInfo?.image} />
        </ProfileImage>
        <ProfileBaseInfo>
          <ProfileInput
            className="nickname-input"
            disabled
            value={userInfo?.nickName}
          />
          <ProfileInput disabled value={userInfo?.email || ""} />
          <ProfileInput disabled value={userInfo?.roles || ""} />
          <EditButtonWrapper>
            <EditButton onClick={handleNicknameEditClick}>
              닉네임 변경
            </EditButton>
            <EditButton onClick={handlePasswordEditClick}>
              비밀번호 변경
            </EditButton>
          </EditButtonWrapper>
        </ProfileBaseInfo>
      </ProfileBaseWrapper>
      <IntroduceWrapper>
        {!isIntroduceEdit ? (
          <>
            <IntroduceTitleSection>
              <h4>자기소개</h4>
              <a data-tooltip-id="my-tooltip">
                <AiFillExclamationCircle color="#2759a2" />
              </a>
              <Tooltip id="my-tooltip" openOnClick>
                <ul>
                  <ol>1. 자신의 직무와 관심분야에 대해 작성해주세요.</ol>
                  <ol>2. 스터디 그룹에 기대하는 바에 대해 작성해주세요.</ol>
                  <ol>3. 스터디 그룹을 통해 얻고자 하는 바를 작성해주세요.</ol>
                </ul>
              </Tooltip>
            </IntroduceTitleSection>
            <IntroduceTextarea value={userInfo?.aboutMe} disabled />
          </>
        ) : (
          <>
            <IntroduceTitleSection>
              <h4>자기소개</h4>
              <a data-tooltip-id="my-tooltip">
                <AiFillExclamationCircle color="#2759a2" />
              </a>
              <Tooltip id="my-tooltip" openOnClick>
                <ul>
                  <ol>1. 자신의 직무와 관심분야에 대해 작성해주세요.</ol>
                  <ol>2. 스터디 그룹에 기대하는 바에 대해 작성해주세요.</ol>
                  <ol>3. 스터디 그룹을 통해 얻고자 하는 바를 작성해주세요.</ol>
                </ul>
              </Tooltip>
            </IntroduceTitleSection>
            <IntroduceTextarea
              name="aboutMe"
              placeholder="자기소개 옆의 느낌표 아이콘을 눌러서 자기소개에 대한 가이드를 확인해주세요."
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
        userNickname={userInfo?.nickName}
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
  width: 850px;
  height: 100%;
  margin-top: 50px;
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
  width: 90%;

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
`;

const IntroduceTitleSection = styled.div`
  display: flex;
  width: 90%;
  h4 {
    color: #2759a2;
    font-size: 21px;
    font-weight: 700;
  }
  a {
    margin-left: 5px;
  }
`;

const IntroduceTextarea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  width: 90%;
  height: 400px;
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
  justify-content: flex-end;
  width: 90%;
`;

const ExitEditButton = styled.button`
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: #d8d9da;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #5a0202;
  }
`;
