import { ChangeEvent, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { updateUserNickname } from "../../apis/MemberApi";
import { LogInState } from "../../recoil/atoms/LogInState";
import { useRecoilValue } from "recoil";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface UserInfoEditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  userNickname: string | undefined;
}

const UserInfoEditModal = ({
  isOpen,
  closeModal,
  userNickname,
}: UserInfoEditModalProps) => {
  const isLoggedIn = useRecoilValue(LogInState);
  const [modalState, setModalState] = useState({
    nickname: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setModalState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    if (modalState.nickname === "") {
      alert("입력되지 않은 정보가 있습니다.");
    } else if (modalState.nickname.length < 2) {
      alert("닉네임은 2자리 이상이어야 합니다.");
    } else {
      try {
        await updateUserNickname(isLoggedIn, modalState.nickname);
        closeModal();
      } catch (error: any) {
        alert(error.response.data.message);
      }
    }
  };

  const handleCancelClick = () => {
    closeModal();
    setModalState({
      nickname: "",
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="NicknameEditModal"
      >
        <form>
          <ModalExplain>변경할 Nickname</ModalExplain>
          <UserInfoEditInput
            name="nickname"
            value={modalState.nickname}
            onChange={handleInputChange}
            placeholder={userNickname}
            required
          />
          <ModalButton type="button" onClick={handleSaveClick}>
            저장
          </ModalButton>
          <ModalButton type="button" onClick={handleCancelClick}>
            취소
          </ModalButton>
        </form>
      </Modal>
    </>
  );
};

export default UserInfoEditModal;

const ModalExplain = styled.div``;
const UserInfoEditInput = styled.input``;
const ModalButton = styled.button``;
