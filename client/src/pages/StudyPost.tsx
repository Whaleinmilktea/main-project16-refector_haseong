import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LogInState } from "../recoil/atoms/LogInState";
import TextEditor from "../components/TextEditor";
import DaysOfWeek from "../components/DaysOfWeek";
import tokenRequestApi from "../apis/TokenRequestApi";
import TagInput from "../components/TagInput";
import { StudyGroupCreateDto } from "../types/StudyGroupApiInterfaces";

const StudyPost = () => {
  const isLoggedIn = useRecoilValue(LogInState);
  const [studyData, setStudyData] = useState<StudyGroupCreateDto>({
    studyName: "",
    startDate: "",
    endDate: "",
    dayOfWeek: [0, 0, 0, 0, 0, 0, 0],
    startTime: "10:00",
    endTime: "11:00",
    memberMin: 2,
    memberMax: 2,
    platform: "",
    introduction: "",
  });
  // 카테고리 상태 => 여러 상태가 맞물려서 작동하기 때문에 별도의 상태로 관리 필요
  const [selectedCategory, setSelectedCategory] =
  useState<string>("프론트엔드");
  const [viewTag, setViewTag] = useState(false);
  const [isInput, setIsInput] = useState(false);
  // 스터디 소개 => TextEditor 컴포넌트에서 관리
  const [introduction, setIntroduction] = useState<string>("");
  // 태그 => TagInput 컴포넌트에서 관리
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setViewTag(false);
    setIsInput(false);
  };
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyData({ ...studyData, studyName: e.target.value });
  };
  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyData({ ...studyData, startDate: e.target.value });
  };
  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyData({ ...studyData, endDate: e.target.value });
  };
  const handleStudyTimeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyData({ ...studyData, startTime: e.target.value });
  };
  const handleStudyTimeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyData({ ...studyData, endTime: e.target.value });
  };
  const handleMemberCountMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyData({ ...studyData, memberMin: +e.target.value });
  };
  const handleMemberCountMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyData({ ...studyData, memberMax: +e.target.value });
    if(studyData.memberMin > +e.target.value) alert("최대 인원이 최소 인원보다 적습니다!");
  };
  const handlePlatform = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudyData({ ...studyData, platform: e.target.value });
  };

  const handlePostButton = async () => {
    const StudyPostDto = {
      studyName : studyData.studyName,
      startDate : studyData.startDate,
      endDate : studyData.endDate,
      dayOfWeek : studyData.dayOfWeek,
      startTime : studyData.startTime,
      endTime : studyData.endTime,
      memberMin : studyData.memberMin,
      memberMax : studyData.memberMax,
      platform : studyData.platform,
      introduction : introduction,
      tags: {
        [selectedCategory]: tags,
      },
    };
    if (!isLoggedIn) {
      alert("로그인한 사람만 스터디 등록이 가능합니다!");
      return;
    }
    if (studyData.studyName === "") {
      alert("제목을 입력해주세요!");
      return;
    }
    if (studyData.memberMin > studyData.memberMax) {
      alert("최대 인원이 최소 인원보다 적습니다!");
      return;
    }
    if (studyData.startDate > studyData.endDate) {
      alert("스터디 시작일이 종료일보다 늦습니다!");
      return;
    }
    if (studyData.dayOfWeek.indexOf(1) === -1) {
      alert("요일을 선택해주세요!");
      return;
    }
    // try {
    //   await tokenRequestApi.post("/study", StudyPostDto);
    //   alert("스터디 등록이 완료되었습니다!");
    //   navigate("/studylist");
    // } catch (error) {
    //   alert("스터디 등록이 실패했습니다!");
    // }
    console.log(StudyPostDto)
  };



  return (
    <StudyPostContainer>
      <StudyPostBody>
        <StudyPostTop>
          <span>스터디 등록</span>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={studyData.studyName}
            onChange={handleTitle}
            required
          />
        </StudyPostTop>

        <StudyPostMain>
          <StudyPostInfo>
            <span>분야</span>
            <select
              name="category"
              value={selectedCategory}
              onChange={handleCategory}
            >
              <option value="프론트엔드">프론트엔드</option>
              <option value="백엔드">백엔드</option>
              <option value="알고리즘">알고리즘</option>
              <option value="인공지능">인공지능</option>
              <option value="기타">기타</option>
            </select>
          </StudyPostInfo>

          <StudyPostInfo>
            <span>날짜</span>
            <input
              type="date"
              value={studyData.startDate}
              onChange={handleStartDate}
              required
            />
            <p>~</p>
            <input
              type="date"
              value={studyData.endDate}
              onChange={handleEndDate}
              required
            />
          </StudyPostInfo>
          <StudyPostInfo>
            <span>요일</span>
            <div>
              <DaysOfWeek setStudyData={setStudyData} />
            </div>
          </StudyPostInfo>
          <StudyPostInfo>
            <span>시간</span>
            <input
              type="time"
              value={studyData.startTime}
              onChange={handleStudyTimeStart}
              required
            />
            <p>~</p>
            <input
              type="time"
              value={studyData.endTime}
              onChange={handleStudyTimeEnd}
              required
            />
          </StudyPostInfo>
          <StudyPostInfo>
            <span>인원</span>
            <input
              type="number"
              min="2"
              value={studyData.memberMin}
              onChange={handleMemberCountMin}
              required
            />
            <p>~</p>
            <input
              type="number"
              min={studyData.memberMin}
              value={studyData.memberMax}
              onChange={handleMemberCountMax}
              required
            />
          </StudyPostInfo>
          <StudyPostInfo>
            <span>플랫폼</span>
            <input type="url" value={studyData.platform} onChange={handlePlatform} />
          </StudyPostInfo>
          <StudyPostInfo>
            <span>태그</span>
            <TagInput
              selectedCategory={selectedCategory}
              tags={tags}
              setTags={setTags}
              viewTag={viewTag}
              setViewTag={setViewTag}
              isInput={isInput}
              setIsInput={setIsInput}
            />
          </StudyPostInfo>
          <StudyPostInput>
            <TextEditor setIntroduction={setIntroduction} />
            {/* 혹시나 했으나, 역시나.. props는.. readOnly 속성 */}
            {/* <TextEditor introduction={studyData.introduction} /> */}
          </StudyPostInput>
          <StudyPostButtonWrapper>
            <StudyPostButton onClick={handlePostButton}>
              스터디 등록
            </StudyPostButton>
          </StudyPostButtonWrapper>
        </StudyPostMain>
      </StudyPostBody>
    </StudyPostContainer>
  );
};

const StudyPostContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StudyPostBody = styled.div`
  width: 960px;
  padding: 120px 0 100px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* 추가된 그림자 효과 */
`;

const StudyPostTop = styled.div`
  width: 800px;
  padding-bottom: 5px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #ccc;

  span {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2759a2;
    margin-bottom: 20px;
  }
  input {
    width: 800px;
    height: 60px;
    border: none;
    background-color: transparent;
    font-size: 1.25rem;
  }
  input::placeholder {
    font-size: 1.25rem;
    color: #d8d3d3;
  }
`;

const StudyPostMain = styled.div`
  width: 800px;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const StudyPostInfo = styled.form`
  width: 800px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  select {
    width: 150px;
    height: 40px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    color: #333;
    font-size: 16px;
    outline: none;
    appearance: none; /* 브라우저 기본 스타일 제거 */
    -webkit-appearance: none; /* Safari 버전 지원 */

    /* 드롭다운 화살표 스타일링 */
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
  }

  span {
    width: 90px;
    text-align: left;
    font-size: 1.25rem;
    font-weight: 700;
    color: #2759a2;
    margin-right: 15px;
    border-radius: 5px;
  }
  input {
    width: 240px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  p {
    padding: 0 10px;
    border-radius: 5px;
  }
  ul {
    margin: 0 20px;
    padding: 7px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #e9e9e9;
    font-size: 0.8rem;
  }

  select:hover,
  input:hover,
  ul:hover {
    transform: scale(1.05); /* Hover 시 요소를 확대 */
  }

  /* transition 속성 추가하여 부드러운 애니메이션 효과 */
  transition: transform 0.5s ease;
`;

const StudyPostInput = styled.div`
  margin: 16px 0;
`;

const StudyPostButtonWrapper = styled.div`
  width: 800px;
  margin: 15px 0;
  display: flex;
  justify-content: flex-end;
`;

const StudyPostButton = styled.button`
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

export default StudyPost;
