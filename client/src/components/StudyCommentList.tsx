import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteComment, getComments, patchComment } from "../apis/CommentApi";
import { validateEmptyInput } from "../pages/utils/loginUtils";
import { useNavigate } from "react-router-dom";
import { CommentList, CommentPageInfo } from "../types/CommentInterfaces";
import Pagenation from "./Pagenation";
import OtherMemberInfo from "./ViewOtherMemberInfo";

const StudyCommentList = ({
  isLeader,
  studyGroupId,
  commentsList,
  setCommentsList,
}: {
  isLeader: boolean;
  studyGroupId: number;
  commentsList: CommentList[];
  setCommentsList: React.Dispatch<React.SetStateAction<CommentList[]>>;
}) => {
  const isLoggedIn = useRecoilValue(LogInState);
  const navigate = useNavigate();
  const [inputComment, setInputComment] = useState("");
  const [commentId, setCommentId] = useState<number | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const [isViewOtherMember, setIsViewOtherMember] = useState({
    nickName: "",
    isView: false,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [commentPageInfo, setCommentPageInfo] = useState<CommentPageInfo>({
    page: 1,
    size: 10,
    totalElements: 1,
    totalPages: 1
  });

  const fetchCommentsData = async () => {
    const commentData = await getComments(studyGroupId, currentPage);
    const commentList = commentData.comment
    setCommentsList(commentList);
    setCommentPageInfo(commentData.pageInfo);
  };

  useEffect(() => {
    fetchCommentsData();
  }, [!isUpdateMode, currentPage]);

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
    setCommentId(id);
    setInputComment(content);
  };

  const handleUpdateButton = async () => {
    if (!isLoggedIn) navigate("/login");
    if (validateEmptyInput(inputComment)) {
      alert("댓글 내용을 입력해주세요.");
    } else {
      try {
        if (commentId) {
          await patchComment(studyGroupId, commentId, inputComment);
          setIsUpdateMode(false);
          setCommentId(null);
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

  const ClickCommentNickName = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const nickName = e.currentTarget.innerText;
    setIsViewOtherMember({
      nickName: nickName,
      isView: true,
    });
  };

  return (
    <>
      <ul>
        {commentsList.map((commentsList) => {
          return (
            <CommentItemWrapper key={commentsList.id}>
              <CommentItemDiv>
                <ContentItem>
                  <p onClick={ClickCommentNickName}>{commentsList.nickName}</p>
                  <>
                    {isUpdateMode && commentId === commentsList.id ? (
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
              {isViewOtherMember.isView &&
              isViewOtherMember.nickName === commentsList.nickName ? (
                <>
                  <OtherMemberInfo OtherMember={isViewOtherMember} />
                </>
              ) : (
                <></>
              )}
            </CommentItemWrapper>
          );
        })}
      </ul>
      <Pagenation
        totalPages={commentPageInfo.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        />
    </>
  );
};

const CommentItemWrapper = styled.div``;

const CommentItemDiv = styled.div`
  width: 100%;
  height: 70px;
  margin-top: 20px;
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
    :hover {
      cursor: pointer;
      transform: scale(1.05);
    }
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
