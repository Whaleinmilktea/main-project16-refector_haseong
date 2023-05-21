import { useEffect, useState } from "react";
// import styled from "styled-components";
import WaitingList from "../components/WaitingList";
import { getStudyGroupList, StudyGroupListDto } from "../apis/StudyGroupApi";

const ProfileStudyList = () => {
  const [studyList, setStudyList] = useState<StudyGroupListDto[]>(
    [] as StudyGroupListDto[]
  );

  useEffect(() => {
    const fetchStudyList = async () => {
      try {
        const data = await getStudyGroupList();
        if (data === undefined) {
          return <>텅..</>;
        }
        setStudyList(data);
        console.log(studyList)
      } catch (error) {
        console.error("스터디 그룹 리스트를 불러오는데 실패했습니다.", error);
      }
    };
    fetchStudyList();
  }, []);

  return (
    <>
      <WaitingList />
    </>
  );
};

export default ProfileStudyList;

// const Box = styled.div`
//   box-sizing: border-box;
//   position: relative;
//   width: 340px;
//   height: 340px;
//   margin: 0 16px 16px 0;
//   padding: 16px;
//   background: #ffffff;
//   border: 1px solid #285aa3;
//   border-radius: 5px;
// `;

// const Title = styled.h3`
//   position: absolute;
//   left: 24px;
//   top: 28px;
//   width: 78px;
//   height: 22px;
//   font-family: Inter;
//   font-style: bold;
//   font-size: 18px;
//   line-height: 22px;
//   text-align: center;
//   color: #000000;
// `;

// const Tags = styled.p`
//   position: absolute;
//   right: 24px;
//   top: 28px;
//   width: 77px;
//   height: 19px;
//   font-family: Inter;
//   font-style: regular;
//   font-size: 16px;
//   line-height: 19px;
//   text-align: center;
//   color: #1f1f1f;
// `;

// const ImageWrapper = styled.div`
//   position: absolute;
//   top: 97px;
//   left: 0;
//   width: 100%;
//   height: 71.3%; // height 값을 조정하여 이미지가 넘치지 않도록 만듦
//   border-radius: 5px;
//   overflow: hidden;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }