import { useNoLoginCheck } from "../hooks/useCheckLoginState";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import ProfileForm from "../components/molecules/profile-form";
import { Route, Routes } from "react-router-dom";
import ProfileEditPage from "./ProfileEditPage";

const ProfilePage = () => {
  const isLoggedIn = useRecoilValue(LogInState);
  useNoLoginCheck(isLoggedIn, "/signin", "로그인이 필요합니다");

  return (
    <>
      <>
        <ProfileForm />
        <p>새롭게 리팩토링된 페이지</p>
      </>
    </>
  );
};

export default ProfilePage;
