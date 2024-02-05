import styled from "styled-components";
import UserImg from "../atoms/user-img";
import Input from "../atoms/Input";
import Divider from "../atoms/divider";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserInfoState } from "../../recoil/atoms/UserInfoState";
import { deleteUser } from "@firebase/auth";
import { auth, db } from "../../firebase";
import { doc } from "firebase/firestore";
import { useDocQuery } from "../../hooks/useDocQuery";
import { getReference } from "../../apis/MemberApi";
import Loading from "../atoms/loading";

interface ButtonProps {
  backgroundColor?: string;
}

const ProfileForm = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(UserInfoState);
  const user = auth.currentUser;
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
    return reference.map((ref, index) => {
      return <Input type={"text"} value={ref} disabled={true} key={index} />;
    });
  };

  const leaveService = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("정말로 탈퇴하시겠습니까?");
    try {
      if (user == null) throw new Error("유저 정보가 존재하지 않습니다");
      await deleteUser(user);
      navigate("/");
    } catch (error) {
      alert("예기치 못한 에러가 발생했습니다.");
    }
  };

  const editProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate("/profile/edit");
  };

  return (
    <Wrapper>
      {isLoading && <Loading />}
      <CredentialContainer>
        <UserImg profileImage={userInfo.photoUrl}/>
        <Input type={"text"} value={userInfo.nickName} disabled={true} />
      </CredentialContainer>
      <RefernceContainer>
        <Divider textContent={"Reference"}></Divider>
        {renderReference()}
      </RefernceContainer>
      <ButtonContainer>
        <BtnForm onSubmit={editProfile}>
          <Button textContent={"정보수정"} />
        </BtnForm>
        <BtnForm onSubmit={leaveService} backgroundColor="#C7C8CC">
          <Button textContent={"회원탈퇴"} />
        </BtnForm>
      </ButtonContainer>
    </Wrapper>
  );
};

export default ProfileForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 600px;
  height: 100%;
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
    margin: 20px 0px 10px 0;
    padding: 10px;
    width: 120%;
    height: 36px;
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
    font-size: 1rem;
    width: 100%;
    height: 40px;
    padding: 10px;
    margin: 30px;
    background-color: ${(props) =>
      props.backgroundColor ||
      "#DBE7C9"}; /* 색상을 인자로 받아 배경색으로 사용 */
    border: none;

    &:hover {
      transform: scale(1.05); /* Hover 시 약간 확대되는 효과 */
    }
  }
`;
