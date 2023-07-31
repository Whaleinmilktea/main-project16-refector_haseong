import styled from "styled-components";
import Modal from "react-modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { checkMemberPassword } from "../../apis/MemberApi";
import { MemberPasswordCheckDto } from "../../types/MemberApiInterfaces";

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

interface CheckPasswordModalProps {
  isOpen: boolean;
  closeModal: () => void;
  setIsPasswordEditModalOpen: (isOpen: boolean) => void;
  setIsNicknameEditModalOpen: (isOpen: boolean) => void;
  editingMode: string;
}

const CheckPasswordModal = ({
  isOpen,
  closeModal,
  setIsPasswordEditModalOpen,
  setIsNicknameEditModalOpen,
  editingMode,
}: CheckPasswordModalProps) => {
  const [passwordState, setPasswordState] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPasswordState(value);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passwordCheckResult: MemberPasswordCheckDto = {
      password: passwordState,
    };
    const result = await checkMemberPassword(passwordCheckResult);
    if (result === true) {
      if (editingMode === "nickname") {
        closeModal();
        setIsNicknameEditModalOpen(true);
      } if (editingMode === "password") {
        closeModal();
        setIsPasswordEditModalOpen(true);
      }
    }
    if (result === false) alert("비밀번호를 확인해주세요");
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="CheckPasswordModal"
      >
        <ModalExplain>개인정보 수정 전, 비밀번호를 재확인합니다.</ModalExplain>
        <form onSubmit={handleFormSubmit}>
          <ModalInput
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={handleInputChange}
            autoComplete="new-password"
          />
          <ModalButton type="submit">
            확인
          </ModalButton>
        </form>
      </Modal>
    </>
  );
};

export default CheckPasswordModal;

const ModalExplain = styled.div``;
const ModalInput = styled.input``;
const ModalButton = styled.button``;
