import { FormEvent, useState } from "react";
import styled from "styled-components";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { passwordTest } from "../../service/validator";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";
import { useRecoilState } from "recoil";
import { LogInState } from "../../recoil/atoms/LogInState";
import { useNavigate } from "react-router-dom";
import { UserInfoState } from "../../recoil/atoms/UserInfoState";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [_isLoggedIn, setIsLoggedIn] = useRecoilState(LogInState);
  const [_userInfo, setUserInfo] = useRecoilState(UserInfoState);

  const handleFormData = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    if (field == "password") {
      const updatedPassword = passwordTest(value);
      if (updatedPassword == null) {
        setIsPasswordValid(null);
      } else if (updatedPassword === true) {
        setIsPasswordValid(true);
      } else {
        setIsPasswordValid(false);
      }
    }
  };

  // ! 비슷한 안내메세지가 많으면, 컴포넌트 분리 예정
  const renderMessage = () => {
    if (isPasswordValid === false) {
      return (
        <p
          style={{
            marginTop: "10px",
            fontSize: "12px",
            color: "#C51605",
          }}
        >
          비밀번호는 8~25자리의 영문, 숫자, 특수문자 조합이어야 합니다
        </p>
      );
    } else if (isPasswordValid === true) {
      return (
        <p
          style={{
            marginTop: "10px",
            fontSize: "12px",
            color: "#4682A9",
          }}
        >
          사용할 수 있는 비밀번호입니다
        </p>
      );
    } else {
      return null;
    }
  };

  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = auth.currentUser;
      if (user) {
        setUserInfo({
          nickName: user.displayName,
          photoURL: user.photoURL,
        });
      }
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Container>
      <form onSubmit={signIn}>
        <Input
          type="email"
          placeholder="Email"
          onChange={(val) => handleFormData("email", val)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          onChange={(val) => handleFormData("password", val)}
          required
        />
        {renderMessage()}
        <ButtonDiv>
          <Button type="submit" textContent="Sign Up" />
        </ButtonDiv>
      </form>
    </Container>
  );
};

export default LoginForm;

const Container = styled.div`
  width: 75%;
  margin: 15px;
  input {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ButtonDiv = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    width: 100%;
    height: 45px;
  }
`;
