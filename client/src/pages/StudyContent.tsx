import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import { getStudyGroupInfo } from "../apis/StudyGroupApi";
import StudyComment from "../components/StudyComment";
import tokenRequestApi from "../apis/TokenRequestApi";
import StudyCommentList from "../components/StudyCommentList";
import LoginAlertModal from "../components/modal/LoginAlertModal";
import { StudyInfoDto } from "../types/StudyGroupApiInterfaces";
import { GetCommentDto } from "../types/CommentInterfaces";
import { v4 as uuidv4 } from "uuid";

const StudyContent = () => {
  const initialState = {
    id: uuidv4(),
    studyName: "",
    image: "",
    memberMin: 2,
    memberMax: 2,
    memberCnt: 2,
    platform: "",
    introduction: "",
    isRecruited: true,
    startDate: "",
    endDate: "",
    dayOfWeek: [0, 0, 0, 0, 0, 0, 0],
    startTime: "",
    endTime: "",
    tags: [],
    leaderNickName: "",
    isLeader: true,
    views: 0,
    likes: 0,
    isLikes: false,
  };

  const [fetching, setFetching] = useState(true);
  const [commentsList, setCommentsList] = useState<GetCommentDto[]>([]);
  const [content, setContent] = useState<StudyInfoDto | null>(initialState);
  const [dayOfWeekMap, setDayOfWeekMap] = useState<string[]>([]);
  const [loginAlertModalOpen, setLoginAlertModalOpen] = useState(false);
  const { id } = useParams(); // App.tsx의 Route url에 :id로 명시하면 그걸 가져옴
  const parsedId = Number(id);
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(LogInState);
  const isRecruiting = content?.isRecruited;
  const convertIntroduction = `${content?.introduction}`;

  useEffect(() => {
    const fetchData = async () => {
      if (isNaN(parsedId)) {
        alert("잘못된 접근입니다");
        navigate("/studylist");
        return;
      }
      try {
        const content = await getStudyGroupInfo(parsedId, isLoggedIn);
        dayOfWeekMapFunc(content.dayOfWeek);
        setContent(content);
        setFetching(false);
      } catch (error) {
        if (!isLoggedIn) setLoginAlertModalOpen(true);
        else {
          alert("잘못된 접근입니다");
          navigate("/studylist");

          throw new Error("스터디 내용 로딩에 실패했습니다.");
        }
      }
    };
    fetchData();
  }, [parsedId]);

  const dayOfWeekMapFunc = (dayOfWeek: number[]) => {
    interface DayOfWeekMap {
      [key: number]: string;
    }
    const dayOfWeekMap: DayOfWeekMap = {
      0: "월",
      1: "화",
      2: "수",
      3: "목",
      4: "금",
      5: "토",
      6: "일",
    };
    const dayOfWeekArr = [];
    for (let i = 0; i < dayOfWeek.length; i++) {
      if (dayOfWeek[i] === 1) {
        dayOfWeekArr.push(dayOfWeekMap[i]);
      }
    }
    setDayOfWeekMap(dayOfWeekArr);
  };

  const handleJoinButton = async () => {
    try {
      await tokenRequestApi.post(`/studygroup/${parsedId}/join`);
      alert("스터디 신청이 완료되었습니다!");
    } catch (error) {
      alert("스터디 신청이 실패했습니다!");
    }
  };

  const markUp = (convertIntroduction: string) => {
    return { __html: convertIntroduction };
  };
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [setCommentsList]);

  return (
    <>
      <StudyContentContainer>
        <StudyContentBody>
          {!fetching && (
            <div key={content?.id}>
              <StudyContentTop>
                {!isRecruiting ? (
                  <span>모집중</span>
                ) : (
                  <span className="recruited">모집 완료</span>
                )}
                <StudyContentTitle>
                  <h2>{content?.studyName}</h2>
                  <div className="studylist-interest">
                    <div id="studylist-interest_likes">❤️ {content?.likes}</div>
                    <div id="studylist-interest_views">🧐 {content?.views}</div>
                  </div>
                </StudyContentTitle>
              </StudyContentTop>
              <StudyContentMain>
                <StudyContentInfo>
                  <div>날짜</div>
                  <span>{`${content?.startDate} ~ ${content?.endDate}`}</span>
                </StudyContentInfo>
                <StudyContentInfo>
                  <div>요일/시간</div>
                  <span>{`${dayOfWeekMap} ${content?.startTime} ~ ${content?.endTime}`}</span>
                </StudyContentInfo>
                <StudyContentInfo>
                  <div>인원</div>
                  <span>{`${content?.memberMin} ~ ${content?.memberMax}`}</span>
                </StudyContentInfo>
                <StudyContentInfo>
                  <div>플랫폼</div>
                  <span>{content?.platform}</span>
                </StudyContentInfo>
                <StudyContentTag>
                  {content?.tags && (
                    <>
                      {content?.tags.map((tag, index) => (
                        <div key={index}>{tag}</div>
                      ))}
                    </>
                  )}
                </StudyContentTag>
                <StudyContentText
                  dangerouslySetInnerHTML={markUp(convertIntroduction)}
                ></StudyContentText>

                <StudyContentProfileWrapper>
                  <StudyContentProfile>
                    <div className="profile-name">{`${content?.leaderNickName}`}</div>
                    <div>일반회원</div>
                  </StudyContentProfile>
                </StudyContentProfileWrapper>

                <StudyJoinButtonWrapper>
                  <StudyJoinButton type="button" onClick={handleJoinButton}>
                    스터디 신청!
                  </StudyJoinButton>
                </StudyJoinButtonWrapper>
              </StudyContentMain>
              <StudyComment
                studyGroupId={Number(id)}
                setCommentsList={setCommentsList}
              />
              {content && (
                <StudyCommentList
                  isLeader={content.isLeader}
                  studyGroupId={Number(id)}
                  commentsList={commentsList}
                  setCommentsList={setCommentsList}
                />
              )}
            </div>
          )}
        </StudyContentBody>
        <LoginAlertModal
          isOpen={loginAlertModalOpen}
          closeModal={() => setLoginAlertModalOpen(false)}
        />
      </StudyContentContainer>
    </>
  );
};

const StudyContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const StudyContentBody = styled.div`
  width: 960px;
  padding: 120px 0 100px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* 추가된 그림자 효과 */
`;

const StudyContentTop = styled.div`
  width: 800px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  span {
    font-size: 20px;
    font-weight: 700;
    color: #2759a2;
  }
  .recruited {
    font-size: 20px;
    font-weight: 700;
    color: #666;
  }
`;

const StudyContentTitle = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f1f1f;
    text-align: left;
  }
  .studylist-interest {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: 600;

    #studylist-interest_likes {
      font-size: 18px;
      word-spacing: 2px;
      margin-right: 10px;
      :hover {
        transform: scale(1.2);
        cursor: pointer;
      }
    }
    #studylist-interest_views {
      font-size: 18px;
      word-spacing: 2px;
      margin-right: 10px;
      :hover {
        transform: scale(1.2);
        cursor: pointer;
      }
    }
  }
`;

const StudyContentMain = styled.div`
  width: 800px;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  span {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2759a2;
  }
`;

const StudyContentInfo = styled.div`
  width: 800px;
  margin-bottom: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  div {
    width: 100px;
    text-align: left;
    font-size: 1.125rem;
    font-weight: 700;
    color: #2759a2;
    margin-right: 20px;
  }
  span {
    text-align: left;
    font-size: 1rem;
    font-weight: 300;
    color: #666;
  }
`;

const StudyContentTag = styled.div`
  width: 260px;
  padding-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  div {
    height: 24px;
    color: #39739d;
    font-size: 0.8125rem;
    border-radius: 4px;
    background-color: #e1ecf4;
    padding: 4.8px 6px;
    margin-right: 7px;
    cursor: pointer;
  }
`;

const StudyContentText = styled.p`
  width: 800px;
  margin: 15px 0;
  padding: 20px 0;
  margin-top: 30px;
  margin-bottom: 30px;
  border-top: 1px solid #ccc;
  text-align: left;
  font-size: 1rem;
  font-weight: 300;
  color: #1f1f1f;
`;

const StudyContentProfileWrapper = styled.div`
  width: 800px;
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
`;

const StudyContentProfile = styled.div`
  width: 170px;
  height: 80px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  .profile-name {
    font-size: 1rem;
    font-weight: 700;
    color: #2759a2;
    margin-bottom: 10px;
  }

  div {
    color: #999;
    font-size: 0.8125rem;
  }
`;

const StudyJoinButtonWrapper = styled.div`
  width: 800px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

const StudyJoinButton = styled.button`
  width: 150px;
  height: 48px;
  font-size: 1.2rem;
  color: #ffffff;
  background-color: #4994da;

  &:hover {
    opacity: 85%;
  }
  &:active {
    opacity: 100%;
  }
`;

export default StudyContent;
