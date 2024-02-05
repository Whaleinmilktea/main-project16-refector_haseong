import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <p>Created by EduSync Team.</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: #e9e9e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 14px;
    font-weight: 300;
    color: #666;
  }
`;

export default Footer;
