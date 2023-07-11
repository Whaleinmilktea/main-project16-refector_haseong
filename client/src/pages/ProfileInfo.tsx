import styled from "styled-components";
import ProfileImg from "../components/ProfileImg";
import {
  getMemberInfo,
  MemberInfoResponseDto,
  updateMemberDetail,
  MemberDetailDto,
  deleteMember,
  checkOauth2Member,
} from "../apis/MemberApi";
import { useState, useEffect, ChangeEvent } from "react";
import UserInfoEditModal from "../components/modal/UserInfoEditModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import { useNavigate } from "react-router-dom";
import CheckPasswordModal from "../components/modal/CheckPasswordModal";
import tokenRequestApi from "../apis/TokenRequestApi";
import { removeTokens } from "./utils/Auth";
import { RenderingState } from "../recoil/atoms/RenderingState";

const ProfileInfo = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LogInState);
  const isRendering = useRecoilValue(RenderingState);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [memberInfo, setMemberInfo] = useState<MemberInfoResponseDto | null>(
    null
  ); // 멤버 정보의 조회 (서버 원천 데이터)
  const [introduceInfo, setIntroduceInfo] = useState<MemberDetailDto>({
    aboutMe: memberInfo?.aboutMe || "",
  });
  // 멤버 정보 수정 (클라이언트에서 수정된 데이터)
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
  }, [isModalOpen, isRendering]);

  // TODO Edit 버튼을 클릭 시, 유저의 닉네임, 비밀번호를 수정할 수 있도록 상태를 변경하는 코드
  // 현재 Modal 구현은 완료했으나 비동기 처리로 인해 계속된 오류 발생. 추가적인 최적화 작업 요함
  // Jest로 테스트할 필요! : why? 소셜 로그인은 자동으로 배포 서버로 리다이렉션 함!
  const handleEditClick = async () => {
    const data = await checkOauth2Member(isLoggedIn);
    if (data.provider !== "LOCAL") {
      alert("소셜 로그인 유저는 개인정보를 수정할 수 없습니다.");
    } else {
      setPasswordCheckModalOpen(true);
    }
  };

  // TODO Edit 버튼을 클릭 시, 유저의 자기소개, 원하는 동료상을 수정할 수 있도록 상태를 변경하는 코드
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

  // TODO Save 버튼을 클릭 시, 유저의 자기소개 및 원하는 동료상을 서버에 PATCH하는 코드
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

  // TODO DELETE 버튼을 클릭 시, 유저의 자기소개 및 원하는 동료상을 서버에서 DELETE하는 코드
  const handleDeleteClick = async () => {
    try {
      const confirmed = window.confirm(
        `정말로 회원탈퇴하시겠습니까?

(소셜 로그인 회원의 경우, 탈퇴 후 재로그인시 자동으로 계정이 복구됩니다.)`
      );
      if (confirmed) {
        navigate("/");
        await deleteMember();
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
          <EditButton onClick={handleEditClick}>Edit</EditButton>
        </ProfileBaseInfo>
      </ProfileBaseWrapper>
      <IntroduceAndDesired>
        {!isIntroduceEdit ? (
          <>
            <h4>자기소개</h4>
            <IntroduceAndDesiredTextarea value={memberInfo?.aboutMe} disabled />
          </>
        ) : (
          <>
            <h4>자기소개</h4>
            <IntroduceAndDesiredTextarea
              name="aboutMe"
              placeholder="자기소개를 입력해주세요"
              onChange={handleIntroduceChange}
            />
            <h4>함께하고 싶은 동료</h4>
            <IntroduceAndDesiredTextarea
              name="withMe"
              placeholder="함께하고 싶은 동료상을 입력해주세요"
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
      </IntroduceAndDesired>
      <UserInfoEditModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        userNickname={memberInfo?.nickName}
      />
      <CheckPasswordModal
        isOpen={passowrdCheckModalOpen}
        closeModal={() => setPasswordCheckModalOpen(false)}
        setIsModalOpen={setIsModalOpen}
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

const IntroduceAndDesired = styled.div`
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

const IntroduceAndDesiredTextarea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  width: 90%;
  height: 200px;
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

const EditButton = styled.button`
  width: 100px;
  height: 40px;
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: ${(props) =>
    props.id === "introduceEditButton"
      ? "#4d74b1"
      : props.id === "introduceSaveButton"
      ? "#868DAA"
      : "#4d74b1"};
  color: white;
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
