const UserImg = () => {
  // ! 추후에는 서버에서 받아오는 데이터로 변경
  const profileImage = ""
  return (
    <div>
      <img src={profileImage} alt="Profile Avatar" />
    </div>
  );
};

export default UserImg;
