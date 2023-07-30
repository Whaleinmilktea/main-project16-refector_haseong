import { useState, useEffect } from "react";
import {
  changeStudyGroupRecruitmentStatus,
  deleteStudyGroupInfo,
  exitStudyGroup,
  getStudyGroupInfo,
} from "../apis/StudyGroupApi";
import styled from "styled-components";
import StudyInfoEditModal from "../components/modal/StudyInfoEditModal";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import MemberManage from "../components/studyManage/MemberManage";
import CandidateManage from "../components/studyManage/CandidateManage";
import { getMemberInfo } from "../apis/MemberApi";
import { StudyInfoDto } from "../types/StudyGroupApiInterfaces";

const ProfileStudyManage = () => {
  const [studyInfo, setStudyInfo] = useState<StudyInfoDto | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [LoggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [dayOfWeekMap, setDayOfWeekMap] = useState<string[]>([]);
  const { id } = useParams();
  const parsedId = Number(id);
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(LogInState);
  const isRecruiting = studyInfo?.isRecruited;

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");

    const fetchStudyGroupInfo = async () => {
      if (isNaN(parsedId)) {
        alert("잘못된 접근입니다");
        navigate("/profile");
        return;
      }
      try {
        const data = await getStudyGroupInfo(parsedId, isLoggedIn);
        dayOfWeekMapFunc(data.dayOfWeek);
        setStudyInfo(data);
      } catch (error) {}
    };

    // getMemberInfo(isLoggedIn).then((data) => {
    //   if (data) {
    //     setLoggedInUser(data.nickName);
    //   } else {
    //     setLoggedInUser(null);
    //   }
    // });
    fetchStudyGroupInfo();
  }, [parsedId]);

  const handleEditClick = () => {
    if (LoggedInUser !== studyInfo?.leaderNickName) {
      alert("스터디장만 스터디를 수정할 수 있습니다");
      return;
    }
    setModalOpen(true);
  };

  const handleDeleteClick = async () => {
    if (LoggedInUser !== studyInfo?.leaderNickName) {
      alert("선넘네...?");
      return;
    }
    if (!window.confirm("정말로 스터디를 삭제하시겠습니까?")) return;
    await deleteStudyGroupInfo(parsedId, isLoggedIn);
    navigate("/profile/manage-group");
  };

  const handleExitClick = async () => {
    if (LoggedInUser === studyInfo?.leaderNickName) {
      alert("스터디장은 스터디에서 탈퇴할 수 없습니다");
      return;
    }
    if (!window.confirm("정말로 스터디를 탈퇴하시겠습니까?")) return;
    exitStudyGroup(parsedId, isLoggedIn);
    navigate("/profile/manage-group");
    window.location.reload(); // 페이지를 새로고침
  };

  const handleRecuitCloseClick = async () => {
    getMemberInfo(isLoggedIn).then((data) => {
      if (data.nickName !== studyInfo?.leaderNickName) {
        alert("스터디장만 스터디의 모집 상태를 수정할 수 있습니다");
        return;
      }
    });
    await changeStudyGroupRecruitmentStatus(parsedId, isLoggedIn);
    location.reload();
  };

  const removeHtmlTag = (str: string | undefined) => {
    if (str === undefined) return str;
    return str.replace(/(<([^>]+)>)/gi, "");
  };

  const dayOfWeekMapFunc = (dayOfWeek: number[]) => {
    interface DayOfWeekMap {
      [key: number]: string;
    }
    const dayOfWeekMap: DayOfWeekMap = {
      0: "월",
      1: "화",
      2: "수",
      3: "목",
      4: "금",
      5: "토",
      6: "일",
    };
    const dayOfWeekArr = [];
    for (let i = 0; i < dayOfWeek.length; i++) {
      if (dayOfWeek[i] === 1) {
        dayOfWeekArr.push(dayOfWeekMap[i]);
      }
    }
    setDayOfWeekMap(dayOfWeekArr);
  };

  return (
    <StudyManageContainer imageUrl={studyInfo?.image}>
      <StudyManageBody>
        <ManageTitle>
          <h2>{studyInfo?.studyName}</h2>
        </ManageTitle>
        <ManageInfo>
          {" "}
          <ManageSpan>모집 상태</ManageSpan>
          {!isRecruiting ? (
            <button
              type="button"
              className="recruit-close-button"
              onClick={handleRecuitCloseClick}
            >
              완료하기
            </button>
          ) : (
            <div>
              <strong>모집 완료</strong>
            </div>
          )}
        </ManageInfo>

        <ManageInfo>
          <ManageSpan>스터디장</ManageSpan>{" "}
          <strong>{studyInfo?.leaderNickName}</strong>
        </ManageInfo>
        <ManageInfo>
          <ManageSpan>현재 인원</ManageSpan> {studyInfo?.memberCnt}
        </ManageInfo>
        <ManageInfo>
          <ManageSpan>플랫폼</ManageSpan> {studyInfo?.platform}
        </ManageInfo>
        <ManageInfo>
          <ManageSpan>기간</ManageSpan> {studyInfo?.startDate} ~{" "}
          {studyInfo?.endDate}
        </ManageInfo>
        <ManageInfo>
          <ManageSpan>태그</ManageSpan>
          <ManageTag>
            {studyInfo?.tags && (
              <>
                {studyInfo?.tags.map((tag, index) => (
                  <div key={index}>{tag}</div>
                ))}
              </>
            )}
          </ManageTag>
        </ManageInfo>
        <ManageInfo>
          <ManageSpan>일정</ManageSpan> 매주{" "}
          {`${dayOfWeekMap} ${studyInfo?.startTime} ${" "}
        ~ ${studyInfo?.endTime}`}
        </ManageInfo>
        <ManageIntro>{removeHtmlTag(studyInfo?.introduction)}</ManageIntro>
        <ManageButtonContainer>
          <button type="button" onClick={handleEditClick}>
            스터디 정보 수정
          </button>
        </ManageButtonContainer>
        {isModalOpen && (
          <StudyInfoEditModal
            isOpen={isModalOpen}
            closeModal={() => setModalOpen(false)}
            studyInfo={studyInfo}
          />
        )}
        {/* <MemberManage studyLeader={studyInfo?.leaderNickName} />
      <CandidateManage studyLeader={studyInfo?.leaderNickName} /> */}
        <ManageButtonContainer>
          <button
            type="button"
            className="delete-exit-button"
            onClick={handleDeleteClick}
          >
            스터디 삭제
          </button>
          <button
            type="button"
            className="delete-exit-button"
            onClick={handleExitClick}
          >
            스터디 탈퇴
          </button>
        </ManageButtonContainer>
      </StudyManageBody>
    </StudyManageContainer>
  );
};

export default ProfileStudyManage;

const StudyManageContainer = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  position: relative;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  background-size: cover;
  background-position: center;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(
      255,
      255,
      255,
      0.95
    ); // Adjust the last value to change the opacity
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const StudyManageBody = styled.div`
  width: 960px;
  height: 100%;
  padding: 40px 0 200px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.3s ease-in-out;
`;

const ManageTitle = styled.div`
  width: 850px;
  margin: 0 0 30px 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  h2 {
    width: 700px;
    text-align: left;
    font-size: 24px;
    font-weight: 700;
    color: #1f1f1f;
  }
`;

const ManageInfo = styled.div`
  width: 850px;
  margin: 0 0 20px 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  strong {
    color: #1f1f1f;
  }

  .recruit-close-button {
    width: 100px;
    height: 30px;
    font-size: 14px;
    color: #ffffff;
    background-color: #47c4c9;

    &:hover {
      opacity: 85%;
    }
    &:active {
      opacity: 100%;
    }
  }

  div {
    text-align: left;
    font-size: 16px;
    font-weight: 300;
    color: #666;
  }

  &:hover {
    opacity: 85%;
    transform: scale(1.01);
    transition: transform 0.1s ease-in-out;
  }
  &:active {
    opacity: 100%;
  }
`;

const ManageSpan = styled.span`
  width: 100px;
  text-align: left;
  font-size: 18px;
  font-weight: 700;
  color: #2759a2;
  margin-right: 20px;
`;

const ManageTag = styled.div`
  width: 240px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;

  div {
    height: 22px;
    color: #39739d;
    font-size: 13px;
    border-radius: 4px;
    background-color: #e1ecf4;
    padding: 4.8px 6px;
    margin: 0 4px 4px 0;
    cursor: pointer;
  }
`;

const ManageIntro = styled.p`
  width: 90%;
  margin: 20px 40px;
  padding-top: 15px;
  text-align: left;
  font-size: 15px;
  font-weight: 300;
  color: #1f1f1f;
  border-top: 1px solid #ccc;
`;

const ManageButtonContainer = styled.div`
  width: 750px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    width: 170px;
    height: 42px;
    margin: 30px 10px 0;
    font-size: 18px;
    color: #ffffff;
    background-color: #4994da;

    &:hover {
      opacity: 85%;
      transform: scale(1.05);
      transition: transform 0.1s ease-in-out;
    }
    &:active {
      opacity: 100%;
    }
  }

  .delete-exit-button {
    width: 120px;
    font-size: 16px;
    background-color: #666;
    margin-right: 10px;

    &:hover {
      background-color: #5a0202;
      transform: scale(1.05);
      transition: transform 0.1s ease-in-out;
    }
  }
`;
