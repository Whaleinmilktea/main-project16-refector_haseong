import { useEffect, useState } from "react";
import Modal from "react-modal";
import { getOtherMemberInfo } from "../../apis/MemberApi";
import { OtherMemberInfo } from "../../types/MemberApiInterfaces";
import { useQuery } from "@tanstack/react-query";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    heigth: "500px",
    maxWidth: "500px",
  },
};

const nicknameStyles = {
  marginLeft: "10px",
  fontSize: "24px",
};

const aboutMeStyles = {
  background: "#f1f1f1",
  width: "90%",
  padding: "10px",
  marginTop: "20px",
  marginLeft: "10px",
};

interface ViewOtherMemberProps {
  isOpen: boolean;
  closeModal: () => void;
  nickName: string;
}

const ViewOtherMember = ({
  isOpen,
  closeModal,
  nickName,
}: ViewOtherMemberProps) => {
  const [otherMemberInfo, setOtherMemberInfo] = useState<OtherMemberInfo>({
    nickName: "",
    aboutMe: "",
    image: "",
  });

  const { data, isLoading, error } = useQuery(["otherMemberInfo"], () => {
    return getOtherMemberInfo(nickName);
  });

  useEffect(() => {
    if (data?.aboutMe === null) {
      setOtherMemberInfo((prevInfo) => ({
        ...prevInfo,
        aboutMe: "아직 자기소개가 없습니다",
      }));
    }
  }, [data]);
  if (error) return alert("유저의 정보를 불러오는 도중 에러가 발생했습니다");

  console.log(data);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="ViewOtherMember Modal"
    >
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <>
          <h1 style={nicknameStyles}>{otherMemberInfo.nickName}</h1>
          <img
            src={otherMemberInfo.image}
            alt="프로필 이미지"
            style={{ width: "100%", maxWidth: "300px", margin: "10px" }}
          />
          <div style={aboutMeStyles}>{otherMemberInfo.aboutMe}</div>
        </>
      )}
    </Modal>
  );
};

export default ViewOtherMember;
