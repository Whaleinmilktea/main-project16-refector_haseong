import { useEffect, useState } from "react";
import Modal from "react-modal";
import { getOtherMemberInfo } from "../../apis/MemberApi";
import { OtherMemberInfo } from "../../types/MemberApiInterfaces";
import { useQuery } from "@tanstack/react-query";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    maxWidth: "500px",
    maxHeight: "600px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
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
    if (data) setOtherMemberInfo(data);
  }, [data]);

  if (error) {
    alert("유저의 정보를 불러오는 도중 에러가 발생했습니다");
    return null;
  }

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
        <div>
        <div >
          <h1>{otherMemberInfo.nickName}</h1>
          <img
            src={otherMemberInfo.image}
            alt="프로필 이미지"
          />
          </div>
          <div>{otherMemberInfo.aboutMe}</div>
        </div>
      )}
    </Modal>
  );
};

export default ViewOtherMember;
