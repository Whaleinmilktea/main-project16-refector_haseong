import styled from "styled-components";

interface Props {
  textContent: string;
}

const Divider = ({ textContent }: Props) => {
  return <Wrapper>{textContent}</Wrapper>;
};

export default Divider;

const Wrapper = styled.div`
  font-size: 20px;
  color: #544b3d;
  display: flex;
  align-items: center;
  ::after,
  ::before {
    flex: 1;
    content: "";
    padding: 1px;
    background-color: #544b3d;
    margin: 10px;
  }
`;
