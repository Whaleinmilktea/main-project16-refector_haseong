import { useQuery } from "@tanstack/react-query";
import { getOtherMemberInfo } from "../apis/MemberApi";
import styled from "styled-components";

interface OtherMemberInfoProps {
  OtherMember: {
    nickName: string;
    isView: boolean;
  };
}

const OtherMemberInfo = ( { OtherMember } : OtherMemberInfoProps ) => {
  const { data, error, isLoading } = useQuery(
    ["otherMemberInfo", OtherMember.nickName],
    () => getOtherMemberInfo(OtherMember.nickName)
  );
  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!data) return <div>데이터가 없습니다.</div>;
  return (
    <Container>
      <div>{data.nickName}</div>
      <div>{data.aboutMe}</div>
    </Container>
  );
};

export default OtherMemberInfo;

const Container = styled.div`
  display: flex;
  width: 95%;
  justify-content: space-between;
  font-size: 13px;
  background-color: #f2f2f2;
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px; /* 둥근 테두리 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  :hover {
    // 만약, 향후 다른 유저 정보를 보여주는 페이지가 설계될 경우 해당 hover 이벤트로 유저에게 특정한 이벤트를 피드백할 수 있습니다.
    background-color: #e9e9e9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.01);
    transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  :first-child {
    border-top: solid #e9e9e9;
    margin-left: 20px;
  }

  :last-child {
    line-height: 20px;
  }
`;
