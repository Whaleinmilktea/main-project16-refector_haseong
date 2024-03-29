import { FormEvent, useState } from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth, db } from "../../firebase";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { passwordTest } from "../../service/validator";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { renderMessage } from "../atoms/password-vaild-render-msg";
import { v4 as uuidv4 } from "uuid";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(credential.user, {
        displayName: formData.nickname,
        photoURL: "default",
      });
      await setDoc(doc(db, "users", `${credential.user?.uid}`), {
        uuid : uuidv4(),
        reference: [""],
        participated: [""],
        master: [""],
      });
      alert("회원가입이 완료되었습니다");
      navigate("/signin");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("auth/email-already-in-use")) {
          alert("이미 사용중인 이메일입니다.");
        }
      }
    }
  };

  return (
    <Container>
      <form onSubmit={signUp}>
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
          {renderMessage(isPasswordValid)}
        </>
        <ButtonDiv>
          <Button type="submit" textContent="Sign Up" />
        </ButtonDiv>
      </form>
    </Container>
  );
};

export default SignUpForm;

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
  width: 75%;
  display: flex;
  justify-content: space-between;
  button {
    width: 100%;
    height: 45px;
  }
`;
