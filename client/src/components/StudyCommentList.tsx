import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteComment, getComments, patchComment } from "../apis/CommentApi";
import { validateEmptyInput } from "../pages/utils/loginUtils";
import { useNavigate } from "react-router-dom";
import { CommentList, CommentPageInfo } from "../types/CommentInterfaces";
import { getOtherMemberInfo } from "../apis/MemberApi";
import { useQuery } from "@tanstack/react-query";
import Pagenation from "./Pagenation";

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
  const [patchId, setPatchId] = useState<number | null>(null);
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
          await patchComment(patchId, inputComment);
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

  const ClickCommentNickName = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const nickName = e.currentTarget.innerText;
    setIsViewOtherMember({
      nickName: nickName,
      isView: true,
    });
  };

  const OtherMemberInfo = () => {
    const { data, error, isLoading } = useQuery(
      ["otherMemberInfo", isViewOtherMember.nickName],
      () => getOtherMemberInfo(isViewOtherMember.nickName)
    );
    if (isLoading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다.</div>;
    if (!data) return <div>데이터가 없습니다.</div>;
    return (
      <OtherMemberInfoWrapper>
        <div>{data.nickName}</div>
        <div>{data.aboutMe}</div>
      </OtherMemberInfoWrapper>
    );
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
              {isViewOtherMember.isView &&
              isViewOtherMember.nickName === commentsList.nickName ? (
                <>
                  <OtherMemberInfo />
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

const OtherMemberInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  background-color: #f2f2f2;
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px; /* 둥근 테두리 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  :hover {
    // 만약, 향후 다른 유저 정보를 보여주는 페이지가 설계될 경우 해당 hover 이벤트로 유저에게 특정한 이벤트를 피드백할 수 있습니다.
    background-color: #d6e3ff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
    transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  :first-child {
    border-top: solid #e9e9e9;
    margin-left: 20px;
  }

  :last-child {
    line-height: 20px;
  }
`;

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
