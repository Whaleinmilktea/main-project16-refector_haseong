import { useState } from "react";
import styled from "styled-components";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { passwordTest } from "../tools/validator";

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
  const [_formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);

  const handleFormData = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    const updatedPassword = passwordTest(value);

    if (updatedPassword== null) {
      setIsPasswordValid(null)
    } else if (updatedPassword === true) {
      setIsPasswordValid(true)
    } else {
      setIsPasswordValid(false)
    }
  };

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

  return (
    <Container>
      <form>
        <Input
          type="text"
          placeholder="Nickname"
          onChange={(val) => handleFormData("nickname", val)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(val) => handleFormData("email", val)}
          required
        />
        <>
          <Input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={(val) => handleFormData("password", val)}
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
