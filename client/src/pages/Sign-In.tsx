import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/edusync-logo.png";
import LoginForm from "../components/molecules/sign-in-form";
import { useLoginCheck } from "../hooks/useCheckLoginState";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import GoogleLoginBtn from "../components/atoms/google-login-btn";
import GithubLoginBtn from "../components/atoms/github-login-btn";

const SignIn = () => {
  const isLoggedIn = useRecoilValue(LogInState);
  useLoginCheck(isLoggedIn, "/", "이미 로그인이 되어 있습니다");

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
      <SocialLoginDiv>
        <GoogleLoginBtn />
        <GithubLoginBtn />
      </SocialLoginDiv>
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

const SocialLoginDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SignIn;
