import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/edusync-logo.png";
import LoginForm from "../components/molecules/sign-in-form";
import { useCheckLoginStatus } from "../hooks/useCheckLoginState";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";

const SignIn = () => {
  const isLoggedIn = useRecoilValue(LogInState);
  useCheckLoginStatus(isLoggedIn, "/", "로그인 되어 있습니다");
  
  return (
    <Container>
      <LoginDiv>
        <LogoDiv>
          <img src={logo} />
        </LogoDiv>
        <LoginForm />
      </LoginDiv>
      {/* <MemberRestoreModal
        isOpen={memberRestoreModalOpen}
        closeModal={() => setMemberRestoreModalOpen(false)}
        email={email}
      /> */}
      <SignUpLink to="/signup">회원가입하러 가기</SignUpLink>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  background-color: #4994da;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoDiv = styled.div`
  img {
    width: 10rem;
  }
`;
const LoginDiv = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  width: 20rem;
  height: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  button {
    color: #ffffff;
    background-color: #2759a2;
    &:hover {
      opacity: 85%;
    }
    &:active {
      opacity: 100%;
    }
  }
`;

const SignUpLink = styled(Link)`
  text-decoration-line: none;
  color: #ffffff;
  font-size: 11px;
`;

export default SignIn;