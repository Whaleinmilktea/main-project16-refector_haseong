import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import studyImage from "../assets/studyImage.webp";
import WaitingList from "../components/WaitingList";
import {
  getLeaderRoleStduies,
  getMemberRoleStduies,
} from "../apis/StudyGroupApi";
import { StudyGroupListDto } from "../types/StudyGroupApiInterfaces";

const ProfileStudyList = () => {
  const isLoggedIn = useRecoilValue(LogInState);
  const [leaderRoleStudies, setLeaderRoleStudies] = useState<
    StudyGroupListDto[]
  >([]);
  const [memberRoleStudies, setMemberRoleStudies] = useState<
    StudyGroupListDto[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    const fetchLeaderRoleStudies = async () => {
      const { data } = await getLeaderRoleStduies();
      setLeaderRoleStudies(data);
    };
    const fetchMemberRoleStudies = async () => {
      const { data } = await getMemberRoleStduies();
      setMemberRoleStudies(data);
    };
    fetchLeaderRoleStudies();
    fetchMemberRoleStudies();
  }, []);

  const StudyCard = ({ id, title, tags }: StudyGroupListDto) => {
    const handleClick = () => {
      navigate(`/profile/${id}`);
    };

    const tagElements = tags?.map((tag, index) => (
      <Tag key={index}>
        <div>{tag}</div>
      </Tag>
    ));

    return (
      <CardProfileStudyListContainer onClick={handleClick}>
        <Image />
        <Title>
          <h3>{title}</h3>
        </Title>
        <TagWrapper>{tagElements}</TagWrapper>
      </CardProfileStudyListContainer>
    );
  };
  return (
    <MyStudyListContainer>
      <WaitingList />
      <ListTitle>운영중인 스터디</ListTitle>
      <StudyCardContainer>
        {leaderRoleStudies.map((studies) => (
          <StudyCard
            key={studies.id}
            id={studies.id}
            image={studies.image}
            title={studies.title}
            tags={studies.tags}
            views={studies.views}
            likes={studies.likes}
          />
        ))}
      </StudyCardContainer>

      <ListTitle>가입된 스터디</ListTitle>
      <StudyCardContainer>
        {memberRoleStudies.map((studies) => (
          <StudyCard
            key={studies.id}
            id={studies.id}
            image={studies.image}
            title={studies.title}
            tags={studies.tags}
            views={studies.views}
            likes={studies.likes}
          />
        ))}
      </StudyCardContainer>
    </MyStudyListContainer>
  );
};

export default ProfileStudyList;

const MyStudyListContainer = styled.div`
  width: 960px;
  height: 100%;
  margin-top: 40px;
  padding: 40px 0 40px;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const StudyCardContainer = styled.div`
  width: 900px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`;

const ListTitle = styled.h2`
  width: 900px;
  padding-left: 20px;
  margin: 24px 0 20px;
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  color: #2759a2;
`;

const CardProfileStudyListContainer = styled.div`
  flex-basis: 260px;
  height: 320px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 2px 4px 10px 2px;
  margin: 10px 20px;
  padding: 5px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    box-shadow: rgba(99, 99, 99, 0.4) 0px 4px 12px 0px;
    transform: scale(1.05);
  }
`;

const Title = styled.div`
  width: 240px;
  padding: 10px 0;
  color: #1f1f1f;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  h3 {
    font-size: 16px;
    height: 32px;
    text-align: left;
    font-weight: 700;
  }
`;
const Image = styled.div`
  width: 240px;
  height: 180px;
  background-image: url(${studyImage});
  background-size: cover;
  background-color: aliceblue;
`;

const TagWrapper = styled.div`
display: flex;
width: 240px;
justify-content: flex-start;
align-items: flex-start;
`;

const Tag = styled.div`
  display: flex;

  div {
    height: 24px;
    color: #39739d;
    font-size: 0.8125rem;
    border-radius: 4px;
    background-color: #e1ecf4;
    padding: 4.8px 6px;
    margin: 0 7px 4px 0;
    cursor: pointer;
  }
`;
