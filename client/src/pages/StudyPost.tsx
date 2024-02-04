import { useState } from "react";
import styled from "styled-components";
import CreatePost from "../components/molecules/create-post";

const StudyPost = () => {
  const [color, setColor] = useState<string>("");

  return (
    <Wrapper>
      <InnerBox>
        <CreatePost />
      </InnerBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin-top: 50px;
  background-color: #007acc;
`;

const InnerBox = styled.div`
  width: 960px;
  height: 100%;
  background-color: #ffffff;
`

export default StudyPost;
