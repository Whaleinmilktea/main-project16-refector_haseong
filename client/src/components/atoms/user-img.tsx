import { useRecoilValue } from "recoil";
import { UserInfoState } from "../../recoil/atoms/UserInfoState";
import avator from "../../assets/default-avator.svg";

const UserImg = () => {
  const userInfo = useRecoilValue(UserInfoState)
  // "../../assets/default-avator.svg"
  let profileImage = userInfo.photoURL

  if (profileImage === "default") {
    profileImage = avator
  }

  return (
    <div>
      <img src={profileImage} alt="Profile Avatar" />
    </div>
  );
};

export default UserImg;
