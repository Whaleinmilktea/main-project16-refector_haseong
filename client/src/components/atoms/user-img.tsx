import avator from "../../assets/default-avator.svg";

interface Props {
  profileImage: string;
}

const UserImg = ({ profileImage }: Props) => {
  if (profileImage === "default") {
    profileImage = avator;
  }

  return (
    <div>
      <img src={profileImage} alt="Profile Avatar" />
    </div>
  );
};

export default UserImg;
