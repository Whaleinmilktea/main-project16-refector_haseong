import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  deleteComment,
  getComments,
  patchComment,
} from "../apis/CommentApi";
import { validateEmptyInput } from "../pages/utils/loginUtils";
import { useNavigate } from "react-router-dom";
import { GetCommentDto } from "../types/CommentInterfaces";

const StudyCommentList = ({
  isLeader,
  studyGroupId,
  commentsList,
  setCommentsList,
}: {
  isLeader: boolean;
  studyGroupId: number;
  commentsList: GetCommentDto[];
  setCommentsList: React.Dispatch<React.SetStateAction<GetCommentDto[]>>;
}) => {
  const isLoggedIn = useRecoilValue(LogInState);
  const navigate = useNavigate();

  const [inputComment, setInputComment] = useState("");
  const [patchId, setPatchId] = useState<number | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isEnterPressed, setIsEnterPressed] = useState(false);

  const handleComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputComment(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isEnterPressed) {
      setIsEnterPressed(true);
      handleUpdateButton();
      setTimeout(() => {
        setIsEnterPressed(false);
      }, 1000); // enter로 입력시 발생하는 이중 입력 방지
    }
  };

  const handleUpdate = (id: number, content: string) => {
    if (!isLoggedIn) navigate("/login");
    setIsUpdateMode(!isUpdateMode);
    setPatchId(id);
    setInputComment(content);
  };

  const handleUpdateButton = async () => {
    if (!isLoggedIn) navigate("/login");
    if (validateEmptyInput(inputComment)) {
      alert("댓글 내용을 입력해주세요.");
    } else {
      try {
        if (patchId) {
          await patchComment(studyGroupId, patchId, inputComment);
          setIsUpdateMode(false);
          setPatchId(null);
          setInputComment("");
        }
      } catch (error) {
        alert("댓글 등록 실패했습니다.");
      }
    }
  };

  const handleDelete = async (patchId: number) => {
    if (!isLoggedIn) navigate("/login");
    try {
      await deleteComment(studyGroupId, patchId);
      fetchCommentsData();
    } catch (error) {
      alert("댓글 삭제 실패했습니다.");
    }
  };

  const fetchCommentsData = async () => {
    try {
      const newComment = await getComments(studyGroupId);
      setCommentsList(newComment);
    } catch (error) {}
  };
  useEffect(() => {
    fetchCommentsData();
  }, [!isUpdateMode]);
  return (
    <>
      <ul>
        {commentsList.map((commentsList) => {
          return (
            <CommentItemDiv key={commentsList.id}>
              <ContentItem>
                <p>{commentsList.nickName}</p>
                <>
                  {isUpdateMode && patchId === commentsList.id ? (
                    <>
                      <input
                        onKeyDown={handleEnter}
                        defaultValue={commentsList.content}
                        onChange={handleComment}
                      ></input>
                      <button onClick={handleUpdateButton}>완료</button>
                    </>
                  ) : (
                    <span>{commentsList.content}</span>
                  )}
                </>
              </ContentItem>
              <ButtonDiv>
                {commentsList.isMyComment && (
                  <>
                    <button
                      onClick={() =>
                        handleUpdate(commentsList.id, commentsList.content)
                      }
                    >
                      수정
                    </button>
                  </>
                )}

                {(isLeader || commentsList.isMyComment) && (
                  <button onClick={() => handleDelete(commentsList.id)}>
                    삭제
                  </button>
                )}
              </ButtonDiv>
            </CommentItemDiv>
          );
        })}
      </ul>
    </>
  );
};

const CommentItemDiv = styled.div`
  width: 80%;
  height: 70px;
  padding: 10px 10px 10px 10px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  border-bottom: solid #e9e9e9;
`;
const ContentItem = styled.div`
  text-align: left;
  button {
    margin-left: 10px;
    background-color: #858da8;
    font-size: 13px;
    padding: 3px;
    color: #ffffff;
  }
  p {
    font-size: 16px;
    font-weight: bold;
    color: #2759a2;
  }
  span {
    font-size: 12px;
  }
`;

const ButtonDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
  button {
    font-size: 12px;
    padding: 3px;
    color: #858da8;
  }
`;
export default StudyCommentList;
