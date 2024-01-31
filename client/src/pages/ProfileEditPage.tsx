import { useNoLoginCheck } from "../hooks/useCheckLoginState";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import ProfileEditForm from "../components/molecules/profile-edit-form";


const ProfilePage = () => {
  const isLoggedIn = useRecoilValue(LogInState);
  useNoLoginCheck(isLoggedIn, "/signin", "로그인이 필요합니다");

  return (
    <>
      <ProfileEditForm />
    </>
  );
};

export default ProfilePage;

