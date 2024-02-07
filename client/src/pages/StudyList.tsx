import styled from "styled-components";
import Search from "../components/molecules/search";

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
  width: 960px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 20px 0px 20px 0px;
  div {
    text-align: start;
    width: 100%;
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

export default StudyList;
