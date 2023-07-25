import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import { useState } from "react";
import { validateEmptyInput } from "../pages/utils/loginUtils";
import { postComment, getComments } from "../apis/CommentApi";
import { GetCommentDto } from "../types/CommentInterfaces";
import { useNavigate } from "react-router-dom";

const StudyComment = ({
  studyGroupId,
  setCommentsList,
}: {
  studyGroupId: number;
  setCommentsList: React.Dispatch<React.SetStateAction<GetCommentDto[]>>;
}) => {
  const isLoggedIn = useRecoilValue(LogInState);
  const navigate = useNavigate();
  const [inputComment, setInputComment] = useState("");
  const [isEnterPressed, setIsEnterPressed] = useState(false);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isEnterPressed) {
      setIsEnterPressed(true);
      handleCommentButton();
      setTimeout(() => {
        setIsEnterPressed(false);
      }, 1000);
    }
  };

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputComment(e.target.value);
  };

  const handleCommentButton = async () => {
    if (!isLoggedIn) navigate("/login");
    else if (validateEmptyInput(inputComment)) {
      alert("댓글 내용을 입력해주세요");
    } else {
      try {
        await postComment(studyGroupId, inputComment);
        setInputComment("");
        // 헷갈려서 구분한 코드 : 댓글 등록 후 댓글 목록을 다시 불러옴
        const fetchData = async () => {
          try {
            const newComment = await getComments(studyGroupId);
            setCommentsList(newComment);
          } catch (error) {}
        };
        fetchData();
      } catch (error) {
        alert("댓글 등록 실패했습니다.");
      }
    }
  };

  return (
    <StudyCommentContainer>
      <CommentInput>
        <input
          value={inputComment}
          onChange={handleComment}
          onKeyDown={handleEnter}
          type="text"
          placeholder="댓글을 입력하세요."
          required
        />
      </CommentInput>
      <CommentButtonWrapper>
        <CommentButton onClick={handleCommentButton}>댓글 작성</CommentButton>
      </CommentButtonWrapper>
    </StudyCommentContainer>
  );
};

const StudyCommentContainer = styled.div`
  width: 810px;
  height: 170px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: center;
  background-color: #F3F9FB;
`;

const CommentInput = styled.div`
  input {
    width: 720px;
    height: 45px;
    color: #1f1f1f;
    font-size: 16px;
    margin-top: 30px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    :focus {
      outline: none;
    }
  }
`;

const CommentButtonWrapper = styled.div`
  width: 720px;
  margin: 15px 0;
  display: flex;
  justify-content: flex-end;
`;

const CommentButton = styled.button`
  width: 130px;
  height: 42px;
  color: #1f1f1f;
  /* border-color: #4994da; */
  background-color: #F3F9FB;

  &:hover {
    color: #fff;
    background-color: #87C0CD;
    transition: 0.3;
    animation: ease-in;
  }
  &:active {
    opacity: 100%;
  }
`;

export default StudyComment;
