import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Study } from "../types/StudyGroupApiInterfaces";
import { getStudyGroupList } from "../apis/StudyGroupApi";
import { useInView } from "react-intersection-observer";
import StudyListTag from "../components/StudyListTag";
import { SearchRequest } from "../apis/SearchApi";

const StudyList = () => {
  const [ref, inView] = useInView();
  const [list, setList] = useState<Study[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTxt, setSearchTxt] = useState("");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  console.log(searchTxt)

  useEffect(() => {
    if (inView) fetchList(searchTxt);
  }, [inView]);

  const fetchList = async (searchTxt: string) => {
    if (searchTxt.length === 0) {
      const data = await getStudyGroupList(currentPage);
      setList((prev) => [...prev, ...data.study]);
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (searchTxt.length > 0) {
      const data = await SearchRequest(searchTxt);
      setList(data);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTxt(inputValue)
  };

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }


  return (
    <StudyListContainer>
      <StudyListBody>
        <StudyListTop>
          <div>
            <h3>Searching Study!</h3>
          </div>
          <Link to="/studypost">
            <StudyPostButton>스터디 모집!</StudyPostButton>
          </Link>
        </StudyListTop>
        <ListFilterWrapper>
          <SearchContainer>
            <form onSubmit={handleSubmit}>
              <SearchInput type="text" value={inputValue} onChange={handleInputChange}/>
              <button type="submit"></button>
            </form>
          </SearchContainer>
        </ListFilterWrapper>
        <StudyBoxContainer>
          {list?.map((item: Study) => (
            <StudyBox
              key={item?.id}
              onClick={() => navigate(`/studycontent/${item?.id}`)}
            >
              <StudyListImage image={item?.image}></StudyListImage>
              <div>
                <div className="studylist-title">
                  <h3>{item?.title}</h3>
                </div>
                <div className="studylist-interest">
                  <div id="studylist-interest_likes">❤️ {item?.likes}</div>
                  <div id="studylist-interest_views">🧐 {item?.views}</div>
                </div>
                <div className="studylist-tag">
                  <StudyListTag item={item?.tags} />
                </div>
              </div>
            </StudyBox>
          ))}
        </StudyBoxContainer>
      </StudyListBody>
      <div ref={ref}></div>
    </StudyListContainer>
  );
};

const StudyListContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StudyListBody = styled.div`
  width: 960px;
  height: 100%;
  padding: 100px 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* 추가된 그림자 효과 */
`;

const StudyListTop = styled.div`
  width: 960px;
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
  div {
    text-align: start;
    margin-left: 20px;
  }
  h3 {
    font-family: "Noto Sans KR", sans-serif;
    text-align: left;
    font-size: 2rem;
    color: #1f1f1f;
    font-weight: 700;
    margin-left: 10px;
  }
`;

const StudyPostButton = styled.button`
  width: 160px;
  height: 48px;
  font-size: 1.2rem;
  color: #ffffff;
  background-color: #4994da;
  margin-right: 30px;

  &:hover {
    opacity: 85%;
  }
  &:active {
    opacity: 100%;
  }
`;

const ListFilterWrapper = styled.div`
  width: 900px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StudyBoxContainer = styled.div`
  width: 960px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const StudyBox = styled.div`
  flex-basis: 270px;
  height: 350px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin: 10px;
  padding: 15px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  .studylist-title {
    width: 260px;
    padding: 10px 0 5px;
    color: #1f1f1f;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .studylist-title > h3 {
    font-size: 16px;
    height: 32px;
    text-align: left;
    font-weight: 700;
  }
  .studylist-interest {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: 600;
    margin-bottom: 10px;
    #studylist-interest_likes {
      word-spacing: 2px;
      margin-right: 10px;
    }
    #studylist-interest_views {
      word-spacing: 2px;
      margin-right: 10px;
    }
  }
  .studylist-tag {
    width: 260px;
    height: 30px;
    padding-top: 5px;
    margin-bottom: 5px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
  }

  .studylist-tag > div {
    height: 24px;
    color: #39739d;
    font-size: 12px;
    border-radius: 4px;
    background-color: #e1ecf4;
    padding: 4px 5px;
    margin: 0 7px 4px 0;
    cursor: pointer;
  }
`;

const StudyListImage = styled.div<{ image: string }>`
  width: 260px;
  height: 180px;
  margin-top: -10px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-color: aliceblue;
`;

const SearchContainer = styled.div`
  display: flex;
  height: 30px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc; /* 밑줄 스타일 추가 */
  font-size: 14px;
  color: #333;
  flex: 1;
  margin-right: 8px;
  background-color: transparent; /* 배경색 투명으로 설정 */
  outline: none; /* 포커스 시 브라우저 기본 스타일 제거 */
`;

export default StudyList;
