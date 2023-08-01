import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { LogInState } from "../../recoil/atoms/LogInState";
import { useParams } from "react-router-dom";
import {
  ChangeStudyGroupLeader,
  forceKickStudyGroup,
  getGroupMembers,
} from "../../apis/StudyGroupApi";
import { AiOutlineCrown, AiOutlineUserDelete } from "react-icons/ai";
import { getMemberInfo } from "../../apis/MemberApi";
import { StudyGroupMemberList } from "../../types/StudyGroupApiInterfaces";
import OtherMemberInfo from "../ViewOtherMemberInfo";

interface MemberManageProps {
  studyLeader: string | undefined;
}

const MemberManage = ({ studyLeader }: MemberManageProps) => {
  const isLoggedIn = useRecoilValue(LogInState);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [memberList, setMemberList] = useState<StudyGroupMemberList | null>(
    null
  );
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [isViewOtherMember, setIsViewOtherMember] = useState({
    nickName: "",
    isView: false,
  });

  useEffect(() => {
    fetchMemberList();
    getMemberInfo(isLoggedIn).then((response) => {
      if (response) {
        setLoggedInUser(response.nickName);
      } else {
        setLoggedInUser(null);
      }
    });
  }, []);

  const fetchMemberList = async () => {
    try {
      const response = await getGroupMembers(Number(id), isLoggedIn);
      if (response) {
        setMemberList(response);
      } else {
        setMemberList(null);
      }
    } catch (error) {
      alert("멤버 목록을 불러오는데 실패했습니다");
    }
  };

  const handleLeaderChange = async (nickname: string) => {
    if (loggedInUser === nickname) {
      alert("스터디장은 스스로 스터디 그룹장의 권한을 위임할 수 없습니다");
    }
    if (loggedInUser !== studyLeader) {
      alert("스터디 그룹장만 권한을 위임할 수 있습니다");
    }
    await ChangeStudyGroupLeader(Number(id), nickname);
    alert("권한 위임에 성공했습니다");
    navigate("/profile/manage-group");
    location.reload();
  };

  const handleForcedKicked = async (nickname: string) => {
    if (nickname === studyLeader && loggedInUser === studyLeader) {
      alert("스터디장은 스터디 그룹에서 강제로 퇴출할 수 없습니다");
    }
    if (nickname === studyLeader && loggedInUser !== studyLeader) {
      alert("스터디원 따위가 감히?!");
    }
    if (loggedInUser !== studyLeader) {
      alert("스터디 그룹장만 그룹원을 강제로 퇴출할 수 있습니다");
    }
    await forceKickStudyGroup(Number(id), nickname);
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
        <h3>회원 목록</h3>
      </MemberManageTitle>
      <>
        {memberList &&
          memberList.nickName.map((nickname, index) => (
            <MemberList key={index}>
              <div onClick={ClickCommentNickName}>{nickname}</div>
              <MemberButton>
                <button onClick={() => handleLeaderChange(nickname)}>
                  <AiOutlineCrown
                    size="24"
                    color="#89920f"
                    title="스터디장 위임"
                  />
                </button>
                <button onClick={() => handleForcedKicked(nickname)}>
                  <AiOutlineUserDelete
                    size="24"
                    color="#bb2727"
                    title="회원 강제퇴장"
                  />
                </button>
              </MemberButton>
            </MemberList>
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

export default MemberManage;

export const Container = styled.div`
  margin: 30px 0px 20px 0px;
`;

export const MemberManageTitle = styled.div`
  width: 800px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  h3 {
    width: 650px;
    text-align: left;
    font-size: 18px;
    font-weight: 700;
    color: #2759a2;
    margin-bottom: 20px;
  }
`;

const MemberList = styled.div`
  width: 95%;
  height: 50px;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
  padding: 20px 30px;
  margin-bottom: 10px;
  color: #2759a2;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    box-shadow: rgba(99, 99, 99, 0.4) 0px 4px 12px 0px;
  }
`;

const MemberButton = styled.div`
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
