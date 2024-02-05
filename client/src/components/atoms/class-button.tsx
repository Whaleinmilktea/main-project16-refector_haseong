import { useState } from "react";
import styled from "styled-components";

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  textContent?: string;
  color?: string;
}

const ClassButton = ({ type, textContent }: Props) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <Wrapper>
      <button type={type} onClick={handleClick}>
        {textContent}
      </button>
    </Wrapper>
  );
};

export default ClassButton;

const Wrapper = styled.div<{ color?: string }>`
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.color || "#007acc"}; // color 속성 사용 또는 기본 값 설정
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  :hover {
    scale: 1.1;
  }
}
`;