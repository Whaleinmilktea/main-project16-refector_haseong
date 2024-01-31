import { useNoLoginCheck } from "../hooks/useCheckLoginState";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import ProfileForm from "../components/molecules/profile-form";
import styled from "styled-components";

const ProfilePage = () => {
  const isLoggedIn = useRecoilValue(LogInState);
  useNoLoginCheck(isLoggedIn, "/signin", "로그인이 필요합니다");

  return (
    <Wrapper>
      <ProfileForm />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin-top: 50px;
  background: linear-gradient(to right, #ffffff, #f2f2f2); /* 그라디언트 배경 색상 */
`;

export default ProfilePage;
