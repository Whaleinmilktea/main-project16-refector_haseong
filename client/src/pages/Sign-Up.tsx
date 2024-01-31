import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/edusync-logo.png";
import SignUpForm from "../components/molecules/sign-up-form";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import { useLoginCheck } from "../hooks/useCheckLoginState";
import GithubLoginBtn from "../components/atoms/github-login-btn";
import GoogleLoginBtn from "../components/atoms/google-login-btn";

const SignUp = () => {
  // ! 아이디&비밀번호 찾기 기능은 별도의 페이지로 설계 : Modal은 단순 안내 혹은 경고에만 사용!
  const isLoggedIn = useRecoilValue(LogInState);
  useLoginCheck(isLoggedIn, "/", "로그인 되어 있습니다");

  return (
    <Container>
      <SignUpDiv>
        <LogoDiv>
          <img src={logo} />
        </LogoDiv>
        <SignUpForm />
      </SignUpDiv>
      {/* <MemberRestoreModal
      isOpen={memberRestoreModalOpen}
      closeModal={() => setMemberRestoreModalOpen(false)}
      email={email}
    /> */}
      <LoginLink to="/login">로그인하러 가기</LoginLink>
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
  margin-bottom: 1rem;
  img {
    width: 10rem;
  }
`;

const SignUpDiv = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  width: 20rem;
  height: 27rem;
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

const LoginLink = styled(Link)`
  text-decoration-line: none;
  color: #ffffff;
  font-size: 11px;
`;
const SocialLoginDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SignUp;
