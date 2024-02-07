import styled from "styled-components";
import UserImg from "../atoms/user-img";
import Input from "../atoms/Input";
import Divider from "../atoms/divider";
import Button from "../atoms/Button";
import { FormEvent, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserInfoState } from "../../recoil/atoms/UserInfoState";
import { doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Loading from "../atoms/loading";
import { getReference } from "../../apis/MemberApi";
import { useDocQuery } from "../../hooks/useDocQuery";

interface ButtonProps {
  backgroundColor?: string;
}

const ProfileEditForm = () => {
  const userInfo = useRecoilValue(UserInfoState);
  const user = auth.currentUser;
  const [formData, setFormData] = useState({
    nickName: userInfo.nickName,
    photoUrl: userInfo.photoUrl,
  });
  const [reference, setReference] = useState<string[]>([]);
  const docRef = doc(db, "users", `${user?.uid}`);
  const { data, isLoading, isError } = useDocQuery(
    "reference",
    getReference(docRef)
  );

  if (isError) {
    isError.valueOf();
  }

  useEffect(() => {
    if (data) {
      setReference(data.reference);
    } else {
      setReference([""]);
    }
  }, [data]);

  const renderReference = () => {
    if (reference == null) {
      return <Input type={"text"} value={"참여 중인 스터디가 없습니다"} />;
    } else {
      return reference.map((ref, index) => {
        return <Input key={index} type={"text"} value={ref} />;
      });
    }
  };

  const handleFormData = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const saveProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      {isLoading && <Loading />}
      <CredentialContainer>
        <UserImg profileImage={formData.photoUrl} />
        <Input
          type={"text"}
          value={formData.nickName}
          onChange={(val) => handleFormData("nickName", val)}
          disabled={false}
        />
        <Input type={"text"} value={"비밀번호 변경"} disabled={true} />
      </CredentialContainer>
      <Divider textContent={"Reference"}></Divider>
      <RefernceContainer>{renderReference()}</RefernceContainer>
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
  margin: 50px 0px 30px 0px;
  img {
    width: 100px;
    height: 100px;
  }
  input {
    margin: 20px 0px 0px 0px;
    padding: 10px;
    width: 120%;
    height: 36px;

    :nth-child(3) {
      :hover {
        cursor: pointer;
      }
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
    &:hover {
      transform: scale(1.05); /* Hover 시 약간 확대되는 효과 */
    }
  }
`;
