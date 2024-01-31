import styled from "styled-components";
import UserImg from "../atoms/user-img";
import Input from "../atoms/Input";
import Divider from "../atoms/Divider";
import Button from "../atoms/Button";

const ProfileForm = () => {
  return (
    <Wrapper>
      <UserImg />
      <CredentialContainer>
        <Input type={"text"} disabled={true} />
        <Input type={"text"} disabled={true} />
      </CredentialContainer>
      <Divider textContent={"Reference"}></Divider>
      <RefernceContainer>
        {/* 동적 렌더링 예정 */}
        <Input type={"text"} disabled={true} />
      </RefernceContainer>
      <Button textContent={"정보수정"}/>
      <Button textContent={"회원탈퇴"}/>
    </Wrapper>
  );
};

export default ProfileForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const CredentialContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    margin-bottom: 30px;
  }
`;

const RefernceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    margin-bottom: 30px;
  }
`;
