import styled from "styled-components";
import Search from "../components/molecules/search";
import Card from "../components/atoms/card";

const StudyList = () => {
  return (
    <Wrapper>
      <Body>
        <Top>
          <div>
            <h3>Searching Study!</h3>
          </div>
        </Top>
        <Search />
        <List>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </List>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  width: 960px;
  height: 100%;
  margin-top: 50px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* 추가된 그림자 효과 */
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 20px 0px;
  div {
    text-align: start;
    width: 90%;
    padding: 10px;
    border-bottom: 1px solid #e1e4e8;
  }
  h3 {
    font-family: "Noto Sans KR", sans-serif;
    text-align: left;
    font-size: 1.75rem;
    font-weight: 800;
    color: #2759a2;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 95%;
  padding: 10px;
  gap: 10px;
  div {
    width: 100%;
  }
`;

export default StudyList;
