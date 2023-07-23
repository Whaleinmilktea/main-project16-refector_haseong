import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StudyListTag from "../components/StudyListTag";
import studyImage from "../assets/studyImage.webp";
import ListFilter from "../components/ListFilter";
import Search from "../components/Search";
import { StudyGroupListDto } from "../types/StudyGroupApiInterfaces";
import { getStudyGroupList } from "../apis/StudyGroupApi";
import { useInView } from "react-intersection-observer";

const StudyList = () => {
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<StudyGroupListDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [filterData, setFilterData] = useState<StudyListDto[]>(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (inView) fetchList();
  }, [inView]);

  const fetchList = async () => {
    // setLoading(true);
    const res = await getStudyGroupList(currentPage);
    setList((prev) => [...prev, ...res]);
    setCurrentPage((prevPage) => prevPage + 1);
    // setLoading(false);
  };

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
          <Search />
          {/* <ListFilter setFilterData={setFilterData} />
          <ListFilter /> */}
        </ListFilterWrapper>

        {!loading && (
          <StudyBoxContainer>
            {list?.map((item: StudyGroupListDto) => (
              <StudyBox
                key={item?.id}
                onClick={() => navigate(`/studycontent/${item?.id}`)}
              >
                <StudyListImage></StudyListImage>
                <div>
                  <div className="studylist-title">
                    <h3>{item?.title}</h3>
                  </div>
                  <div className="studylist-tag">
                    <StudyListTag item={item.tagValues} />
                  </div>
                </div>
              </StudyBox>
            ))}
          </StudyBoxContainer>
        )}
      </StudyListBody>
      <div ref={ref}>request Infinite Scroll</div>
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

const StudyListImage = styled.div`
  width: 260px;
  height: 180px;
  background-image: url(${studyImage});
  background-size: cover;
  background-color: aliceblue;
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
    transform: scale(1.05); /* 마우스가 올라갔을 때 크기를 105%로 확대 */
  }

  .studylist-title {
    width: 260px;
    padding: 20px 0 12px;
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
  .studylist-tag {
    width: 260px;
    height: 30px;
    padding-top: 20px;
    margin-bottom: 5px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
  }

  .studylist-tag > div {
    height: 24px;
    color: #39739d;
    font-size: 0.8125rem;
    border-radius: 4px;
    background-color: #e1ecf4;
    padding: 4.8px 6px;
    margin: 0 7px 4px 0;
    cursor: pointer;
  }
`;

export default StudyList;
