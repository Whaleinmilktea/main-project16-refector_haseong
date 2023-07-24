import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import { useState } from "react";
import { PostCommentDto } from "../types/CommentInterfaces";
import { validateEmptyInput } from "../pages/utils/loginUtils";
import { postComment } from "../apis/CommentApi";
import { useNavigate } from "react-router-dom";

const StudyComment = ({
  studyGroupId,
  setComments,
}: {
  studyGroupId: number;
  setComments: React.Dispatch<React.SetStateAction<PostCommentDto>>;
}) => {
  const isLoggedIn = useRecoilValue(LogInState);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
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
    setComment(e.target.value);
  };

  const handleCommentButton = async () => {
    if (!isLoggedIn) navigate("/login");
    else if (validateEmptyInput(comment)) {
      alert("댓글 내용을 입력해주세요");
    } else {
      try {
        await postComment(studyGroupId, comment);
        setComment("");
        const fetchData = async () => {
          try {
            const newComment = await getComments(studyGroupId);
            setComments(newComment);
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
          value={comment}
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
