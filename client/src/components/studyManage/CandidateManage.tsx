import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LogInState } from "../../recoil/atoms/LogInState";
import {
  approveStudyGroupApplication,
  getCandidateMembers,
  rejectStudyGroupApplication,
} from "../../apis/StudyGroupApi";
import { useParams } from "react-router-dom";
import { BsCheckCircle, BsFillXCircleFill } from "react-icons/bs";
import { MemberManageTitle } from "./MemberManage";
import { StudyGroupMemberList } from "../../types/StudyGroupApiInterfaces";
import OtherMemberInfo from "../ViewOtherMemberInfo";

interface CandidateManageProps {
  studyLeader: string | undefined;
}

const CandidateManage = ({ studyLeader }: CandidateManageProps) => {
  const { id } = useParams<{ id: string }>(); // 스터디 그룹 id
  const isLoggedIn = useRecoilValue(LogInState);
  const [memberList, setMemberList] = useState<StudyGroupMemberList | null>(
    null
  );
  const [isViewOtherMember, setIsViewOtherMember] = useState({
    nickName: "",
    isView: false,
  });

  useEffect(() => {
    const fetchWaitingList = async () => {
      const data = await getCandidateMembers(Number(id), isLoggedIn);
      setMemberList(data);
    };
    fetchWaitingList();
  }, [id]);

  const handleApproveCandidate = async (nickname: string) => {
    if (nickname === studyLeader) {
      alert("스터디원은 새로운 스터디원의 허가여부를 결정할 수 없습니다");
    }
    await approveStudyGroupApplication(Number(id), nickname, isLoggedIn);
    location.reload();
  };

  const handleDenyCandidate = async (nickname: string) => {
    if (nickname === studyLeader) {
      alert("스터디원은 새로운 스터디원의 허가여부를 결정할 수 없습니다");
    }
    await rejectStudyGroupApplication(Number(id), nickname);
    location.reload();
  };

  const ClickCommentNickName = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const nickName = e.currentTarget.innerText;
    setIsViewOtherMember({
      nickName: nickName,
      isView: true,
    });
  };

  return (
    <Container>
      <MemberManageTitle>
        <h3>가입 신청 대기 리스트</h3>
      </MemberManageTitle>
      <>
        {memberList &&
          memberList.nickName.map((nickname, index) => (
            <WaitingList key={index}>
              <div onClick={ClickCommentNickName}>
              {nickname}
              </div>
              <WaitingButton>
                <button onClick={() => handleApproveCandidate(nickname)}>
                  <BsCheckCircle size="18" color="#0e9220" />
                </button>
                <button onClick={() => handleDenyCandidate(nickname)}>
                  <BsFillXCircleFill size="18" color="#bb2727" />
                </button>
              </WaitingButton>
            </WaitingList>
          ))}
        {isViewOtherMember.isView ? (
          <>
            <OtherMemberInfo OtherMember={isViewOtherMember} />
          </>
        ) : (
          <></>
        )}
      </>
    </Container>
  );
};

export default CandidateManage;

const Container = styled.div``;

const WaitingList = styled.div`
  width: 95%;
  height: 36px;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
  padding: 20px 30px;
  margin-bottom: 10px;
  color: #1f1f1f;
  font-size: 14px;
  font-weight: 300;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    box-shadow: rgba(99, 99, 99, 0.4) 0px 4px 12px 0px;
  }
`;

const WaitingButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1.2);
    }
  }
`;
