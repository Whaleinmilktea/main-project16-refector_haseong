import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  getWaitingStudyGroupList,
  cancelStudyGroupApplication,
} from "../apis/StudyGroupApi";
import { FiDelete } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import { StudyGroupListDto } from "../types/StudyGroupApiInterfaces";

const WaitingList = () => {
  const [isData, setIsData] = useState<boolean>(true);
  const [waitingList, setWaitingList] = useState<StudyGroupListDto[]>([]);
  const isLoggedIn = useRecoilValue(LogInState);

  useEffect(() => {
    const fetchWaitingList = async () => {
      try {
        const data = await getWaitingStudyGroupList();
        if (data === null) {
          setIsData(false);
        }
        setWaitingList(data);
      } catch (error) {
        alert("스터디 그룹 리스트를 불러오는데 실패했습니다.");
      }
    };
    fetchWaitingList();
  }, []);

  const handleCancelButton = async (id: number | undefined) => {
    if (id === undefined) return alert("잘못된 접근입니다");
    try {
      await cancelStudyGroupApplication(id, isLoggedIn);
      setWaitingList(waitingList.filter((study) => study.id !== id));
    } catch (error) {
      alert("가입 신청 철회에 실패했습니다");
    }
  };

  const WaitingStudyGroupItem = ({
    id,
    title,
    views,
    tags,
    likes,
    image,
  }: StudyGroupListDto) => {
    return (
      <ItemWrapper key={id}>
        <ItemTitle>{title}</ItemTitle>
        <CancelButton onClick={() => handleCancelButton(id)}>
          <FiDelete size="21" />
        </CancelButton>
      </ItemWrapper>
    );
  };

  return (
    <WaitingListWrapper>
      <WaitingListTitle>대기중인 가입 신청</WaitingListTitle>
      <ItemList>
        {waitingList.map((study) => (
          <WaitingStudyGroupItem
            key={study.id}
            id={study.id}
            image={study.image}
            title={study.title}
            views={study.views}
            tags={study.tags}
            likes={study.likes}
          />
        ))}
      </ItemList>
    </WaitingListWrapper>
  );
};

export default WaitingList;

const WaitingListWrapper = styled.div`
  margin-left: 15px;
  padding-left: 20px;
`;

const WaitingListTitle = styled.h2`
  width: 900px;
  margin: 24px 0 20px;
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  color: #2759a2;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

const ItemWrapper = styled.div`
  width: 95%;
  height: 60px;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
  padding: 20px 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    box-shadow: rgba(99, 99, 99, 0.4) 0px 4px 12px 0px;
    transform: scale(1.01);
  }
`;

const ItemTitle = styled.div`
  margin-bottom: 5px;
  color: #1f1f1f;
  font-size: 18px;
  font-weight: 700;
  text-align: left;
`;

const CancelButton = styled.button`
  width: 27px;
  height: 27px;
  background-color: #999;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    transform: scale(1.1);
    background-color: #c51605;
  }
`;
