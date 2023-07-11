import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StudyListTag from "../components/StudyListTag";
import studyImage from "../assets/studyImage.webp";
import ListFilter from "../components/ListFilter";

const StudyList = () => {
  interface StudyListDto {
    id: number;
    title: string;
    tagValues: string[];
  }

  const initialState = [
    {
      id: 0,
      title: "",
      tagValues: [""],
    },
  ];

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<StudyListDto[]>(initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState<StudyListDto[]>(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMoreList();
  }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const fetchMoreList = async () => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API_URL
      }/studygroups?page=${currentPage}&size=6`
    );
    const data = response.data.data;
    setList([...list, ...data]);
    setCurrentPage((prevPage) => prevPage + 1);
    setLoading(false);
    if (data.length === 0) {
      return <p>마지막 페이지입니다.</p>;
    }
  };

  // setTimeout(() => {
  //   if (loading) {
  //     return;
  //   }
  //   setLoading(true);
  //   fetchMoreList();
  // }, 500);

  const srollLogic = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("scroll");
      // fetchMoreList();
    }
  };



  // try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_APP_API_URL}/studygroups?page=${currentPage}&size=6`
  //     );
  //     const data = response.data.data;
  //     if (data.length === 0) {
  //       alert("마지막 페이지입니다.");
  //       return;
  //     }
  //     setList([...data]);
  //   } catch (error) {
  //     throw new Error("스터디 리스트 로딩에 실패했습니다.");
  //   } finally {
  //     setFetching(false);
  //   }
  // };

  // const handleScroll = () => {
  //   const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  //   if (scrollTop + clientHeight >= scrollHeight) {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //   }
  // };

  useEffect(() => {
    setLoading(true);
    setList(filterData);
    setLoading(false);
  }, [filterData]);

  return (
    <StudyListContainer onScroll={srollLogic}>
      <StudyListBody>
        <StudyListTop>
          <div>
            <h2>여러분의 스터디를 만들어보세요!</h2>
          </div>
          <Link to="/studypost">
            <StudyPostButton>스터디 모집!</StudyPostButton>
          </Link>
        </StudyListTop>

        <ListFilterWrapper>
          <ListFilter setFilterData={setFilterData} />
        </ListFilterWrapper>

        {!loading && (
          <StudyBoxContainer>
            {list?.map((item: StudyListDto) => (
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
    </StudyListContainer>
  );
};

const StudyListContainer = styled.div`
  width: 100%;
  height: 100%;
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
`;

const StudyListTop = styled.div`
  width: 960px;
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
  div {
    text-align: start;
    margin-left: 10px;
  }
  h2 {
    text-align: left;
    font-size: 2rem;
    color: #1f1f1f;
    font-weight: 700;
    margin-left: 10px;
  }
`;

const ListFilterWrapper = styled.div`
  width: 900px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StudyPostButton = styled.button`
  width: 160px;
  height: 48px;
  font-size: 1.2rem;
  color: #ffffff;
  background-color: #4994da;
  margin-right: 20px;

  &:hover {
    opacity: 85%;
  }
  &:active {
    opacity: 100%;
  }
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
  padding: 5px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;

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
    padding-top: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
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
