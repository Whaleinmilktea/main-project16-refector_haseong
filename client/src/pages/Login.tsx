import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/edusync-logo.png";
import GoogleButton from "../components/atoms/SocialLoginButton";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";

const Login = () => {
  return (
    <Container>
      {/* <LoginDiv onKeyDown={handleKeyDown}> */}
      <LoginDiv>
        <LogoDiv>
          <img src={logo} />
        </LogoDiv>
        <LoginForm>
          <Input type="email" placeholder="Email" required />
        </LoginForm>
        <LoginForm>
          <Input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            required
          />
        </LoginForm>
        <ButtonDiv>
          <Button textContents={"Log In"}/>
        </ButtonDiv>
      </LoginDiv>

      {/* <MemberRestoreModal
        isOpen={memberRestoreModalOpen}
        closeModal={() => setMemberRestoreModalOpen(false)}
        email={email}
      /> */}
      <SignUpLink to="/signup">회원가입하러 가기</SignUpLink>
      <SocialLoginDiv>
        <GoogleButton />
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
  height: 20rem;
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
const LoginForm = styled.form`
  width: 75%;
  margin: 15px;
  input {
    width: 100%;
    padding: 10px;
  }
`;
const ButtonDiv = styled.div`
  margin-top: 1rem;
  width: 75%;
  display: flex;
  justify-content: space-between;
  button {
    width: 100%;
    height: 45px;
  }
  img {
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

export default Login;
