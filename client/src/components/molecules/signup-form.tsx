import { useState } from "react";
import styled from "styled-components";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const Container = styled.div`
  width: 75%;
  margin: 15px;
  input {
    width: 100%;
    margin-bottom: 10px;
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
`;

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  const [passwordValidation, setPasswordValidation] = useState<boolean | null>(
    null
  );

  // if (info.password == "") {
  //   setPasswordValidation(true)
  // } else {
  //   setPasswordValidation(false)
  // }

  const handleFormData = (field : string, value : string) => {
    setFormData((prevData) => ({
        ...prevData,
        [field] : value
      }))
  }

  const renderMessage = () => {
    switch (passwordValidation) {
      case false:
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
      case true:
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
      default:
        return null;
    }
  };

  return (
    <Container>
      <form>
        <Input
          type="text"
          placeholder="Nickname"
          onChange={(val) => handleFormData("nickname", val)}
          value={formData.nickname}
          required
        />
        <Input type="email" placeholder="Email" required />
        <>
          <Input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            required
          />
          {renderMessage()}
        </>
        <ButtonDiv>
          <Button type="submit" textContent="Sign Up" />
        </ButtonDiv>
      </form>
    </Container>
  );
};

export default SignUpForm;
