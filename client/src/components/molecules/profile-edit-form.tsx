import styled from "styled-components";
import UserImg from "../atoms/user-img";
import Input from "../atoms/Input";
import Divider from "../atoms/Divider";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserInfoState } from "../../recoil/atoms/UserInfoState";

interface ButtonProps {
  backgroundColor?: string;
}

const ProfileEditForm = () => {
  const userInfo = useRecoilValue(UserInfoState);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: userInfo.nickName,
    photoUl: userInfo.photoUrl,
  });
  const [reference, setReference] = useState<string[]>([]);

  const saveProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <CredentialContainer>
        <UserImg />
        <Input type={"text"} disabled={true} />
        <Input type={"text"} disabled={true} />
      </CredentialContainer>
      <Divider textContent={"Reference"}></Divider>
      <RefernceContainer>
        {/* 동적 렌더링 예정 */}
        <Input type={"text"} disabled={true} />
      </RefernceContainer>
      <ButtonContainer>
        <BtnForm onSubmit={saveProfile}>
          <Button textContent={"저장"} />
        </BtnForm>
      </ButtonContainer>
    </Wrapper>
  );
};

export default ProfileEditForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 600px;
  height: 100%;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* 그림자 효과 추가 */
`;

const CredentialContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  img {
    width: 175px;
    height: 175px;
  }
  input {
    margin: 20px 0px 10px 0;
    padding: 10px;
    width: 120%;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;

    &:focus {
      outline: none;
      box-shadow: 0 0 8px rgba(77, 116, 177, 0.6);
    }
  }
`;

const RefernceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  input {
    margin: 10px 0px 10px 0;
    padding: 10px;
    width: 120%;
    height: 36px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;

    &:focus {
      outline: none;
      box-shadow: 0 0 8px rgba(77, 116, 177, 0.6);
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnForm = styled.form<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    width: 100%;
    height: 45px;
    padding: 10px;
    margin: 30px;
    background-color: ${(props) =>
      props.backgroundColor ||
      "#DBE7C9"}; /* 색상을 인자로 받아 배경색으로 사용 */
    border: none;
    border-radius: 5px; /* 모서리를 둥글게 만들기 위한 속성 추가 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
    transition: transform 0.2s ease-in-out; /* 애니메이션을 위한 트랜지션 속성 추가 */

    &:hover {
      transform: scale(1.05); /* Hover 시 약간 확대되는 효과 */
    }
  }
`;
