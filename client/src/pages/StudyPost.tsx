import { useState } from "react";
import styled from "styled-components";
import CreatePost from "../components/molecules/create-post";
import { backgroundColor } from "../utils/bgColorPicker";

const StudyPost = () => {
  const [color, setColor] = useState<string>("");
  const bg = backgroundColor(color);

  return (
    <Wrapper bg={bg}>
      <InnerBox>
        <h1>Make Your Study!</h1>
        <CreatePost setColor={setColor} />
      </InnerBox>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ bg?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 50px;
  background-color: ${(props) => props.bg || "#F6F6F6"};
`;

const InnerBox = styled.div`
  width: 960px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2759a2;
    margin-top: 20px;
  }
`;

export default StudyPost;