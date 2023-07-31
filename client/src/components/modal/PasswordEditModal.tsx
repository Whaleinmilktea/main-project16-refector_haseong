import { ChangeEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { updateUserPassword } from "../../apis/MemberApi";
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

interface PasswordEditModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const UserInfoEditModal = ({ isOpen, closeModal }: PasswordEditModalProps) => {
  const isLoggedIn = useRecoilValue(LogInState);
  const [modalState, setModalState] = useState({
    password: "",
    passwordCheck: "",
  });
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [passwordCheckValidation, setPasswordCheckValidation] = useState(false);

  useEffect(() => {
    modalState.password === modalState.passwordCheck
      ? setPasswordCheckValidation(true)
      : setPasswordCheckValidation(false);
  }, [modalState]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setModalState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    passwordTest(modalState.password) === true
      ? setPasswordValidation(true)
      : setPasswordValidation(false);
  };

  const passwordTest = (data: string) => {
    return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/g.test(data);
  };

  const handleSaveClick = async () => {
    if (modalState.password === "" || modalState.passwordCheck === "") {
      alert("입력되지 않은 정보가 있습니다.");
    } else if (passwordTest(modalState.password) === false) {
      alert(
        "비밀번호는 8~25자리의 영문 대소문자, 숫자, 특수문자 조합이어야 합니다."
      );
    } else {
      if (modalState.password !== modalState.passwordCheck) {
        alert("새로운 비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.");
        return;
      }
      try {
        await updateUserPassword(isLoggedIn, modalState.password);
        closeModal();
      } catch (error: any) {
        alert(error.response.data.message);
      }
    }
  };

  const handleCancelClick = () => {
    closeModal();
    setModalState({
      password: "",
      passwordCheck: "",
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="PasswordEditModal"
      >
        <form>
          {passwordValidation ? (
            <>
              <ModalExplain>변경할 비밀번호</ModalExplain>
              <UserInfoEditInput
                name="password"
                type="password"
                autoComplete="new-password"
                value={modalState.password}
                onChange={handleInputChange}
                required
              />
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "12px",
                  color: "#4682A9",
                }}
              >
                사용가능한 비밀번호 입니다
              </p>
            </>
          ) : (
            <>
              <ModalExplain>변경할 비밀번호</ModalExplain>
              <UserInfoEditInput
                name="password"
                type="password"
                autoComplete="new-password"
                value={modalState.password}
                onChange={handleInputChange}
                required
              />
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "12px",
                  color: "#C51605",
                }}
              >
                비밀번호는 8~25자리의 영문 대소문자, <br></br>숫자, 특수문자
                조합이어야 합니다.
              </p>
            </>
          )}

          <ModalExplain>변경할 비밀번호 확인</ModalExplain>
          {passwordCheckValidation ? (
            <>
              {" "}
              <UserInfoEditInput
                name="passwordCheck"
                type="password"
                autoComplete="new-password"
                value={modalState.passwordCheck}
                onChange={handleInputChange}
                required
              />
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "12px",
                  color: "#4682A9",
                }}
              >
                비밀번호가 일치합니다
              </p>
            </>
          ) : (
            <>
              {" "}
              <UserInfoEditInput
                name="passwordCheck"
                type="password"
                autoComplete="new-password"
                value={modalState.passwordCheck}
                onChange={handleInputChange}
                required
              />
              <p
                style={{
                  marginBottom: "10px",
                  fontSize: "12px",
                  color: "#C51605",
                }}
              >
                비밀번호가 일치하지 않습니다
              </p>
            </>
          )}

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
