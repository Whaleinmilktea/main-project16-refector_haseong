import React, { useState } from "react";
import styled from "styled-components";
import {} from "react";

// interface DaysOfWeekProps {
//   checked: string[];
//   setChecked: React.Dispatch<React.SetStateAction<string[]>>;
// * checked : 선택된 요일들의 배열 => 부모 컴포넌트에서 받아옴
// }

// const DaysOfWeek = ({ checked, setChecked }: DaysOfWeekProps) => {
const DaysOfWeek = () => {
  // const daysOfWeekList: string[] = ["월", "화", "수", "목", "금", "토", "일"];
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [selectedDays, setSelectedDays] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0,
  ]);

  console.log("선택된 요일 배열 : ", selectedDays);
  console.log("클릭된 요일 배열 : ", clicked);

  // const handleCheck = (e: { target: { checked: any; value: string } }) => {
  //   let updatedList = [...checked];
  //   if (e.target.checked) {
  //     updatedList = [...checked, e.target.value];
  //   } else {
  //     updatedList.splice(checked.indexOf(e.target.value), 1);
  //   }
  //   setChecked(updatedList);
  // };

  // const handleClicked = (
  //   event: React.MouseEvent<HTMLDivElement, MouseEvent>
  // ) => {
  //   let currentSelected = [...selectedDays];
  //   // console.log(event);
  //   // console.log("현재 클릭한 요일 : ", event.target.id);
  //   console.log("현재 선택된 요일 배열의 상태 : ", currentSelected);
  //   // console.log("currentCLicked의 0번째 요소 : " , currentClicked[0])

  //   if (event.currentTarget.id === "월") {
  //     if (currentSelected[0] === 0) {
  //       currentSelected[0] = 1;
  //     } else if (currentSelected[0] === 1) {
  //       currentSelected[0] = 0;
  //     }
  //   }

  //   if (event.currentTarget.id === "화") {
  //     if (currentSelected[1] === 0) {
  //       currentSelected[1] = 1;
  //     } else if (currentSelected[1] === 1) {
  //       currentSelected[1] = 0;
  //     }
  //   }

  //   if (event.currentTarget.id === "수") {
  //     if (currentSelected[2] === 0) {
  //       currentSelected[2] = 1;
  //     } else if (currentSelected[2] === 1) {
  //       currentSelected[2] = 0;
  //     }
  //   }

  //   if (event.currentTarget.id === "목") {
  //     if (currentSelected[3] === 0) {
  //       currentSelected[3] = 1;
  //     } else if (currentSelected[3] === 1) {
  //       currentSelected[3] = 0;
  //     }
  //   }

  //   if (event.currentTarget.id === "금") {
  //     if (currentSelected[4] === 0) {
  //       currentSelected[4] = 1;
  //     } else if (currentSelected[4] === 1) {
  //       currentSelected[4] = 0;
  //     }
  //   }

  //   if (event.currentTarget.id === "토") {
  //     if (currentSelected[5] === 0) {
  //       currentSelected[5] = 1;
  //     } else if (currentSelected[5] === 1) {
  //       currentSelected[5] = 0;
  //     }
  //   }

  //   if (event.currentTarget.id === "일") {
  //     if (currentSelected[6] === 0) {
  //       currentSelected[6] = 1;
  //     } else if (currentSelected[6] === 1) {
  //       currentSelected[6] = 0;
  //     }
  //   }

  //   setSelectedDays(currentSelected);
  // };

  const handleClickedData = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const dayIdMap: { [key: string]: number } = {
      월: 0,
      화: 1,
      수: 2,
      목: 3,
      금: 4,
      토: 5,
      일: 6,
    };

    const dayId = dayIdMap[event.currentTarget.id];
    if (dayId !== undefined) {
      const currentSelected = [...selectedDays];
      currentSelected[dayId] = currentSelected[dayId] === 0 ? 1 : 0;
      setSelectedDays(currentSelected);
    }
  };

  const handleClickedState = (dayIndex: number) => {
    setClicked((prevClicked) => {
      const newClicked = [...prevClicked];
      newClicked[dayIndex] = !prevClicked[dayIndex];
      return newClicked;
    });
  };

  return (
    <DaysOfWeekContainer>
      {/* {daysOfWeekList.map((item: string, index: number) => {
        return (
          <div className="checkbox" key={index}>
            <input
              value={item}
              type="checkbox"
              onChange={handleCheck}
              checked={checked.includes(item)}
            />
            <label id={item}>{item}</label>
          </div>
        );
      })} */}
      <WeekDay
        id="월"
        onClick={(e) => {
          handleClickedData(e);
          handleClickedState(0);
        }}
        clicked={clicked[0]}
      >
        월
      </WeekDay>
      <WeekDay
        id="화"
        onClick={(e) => {
          handleClickedData(e);
          handleClickedState(1);
        }}
        clicked={clicked[1]}
      >
        화
      </WeekDay>
      <WeekDay
        id="수"
        onClick={(e) => {
          handleClickedData(e);
          handleClickedState(2);
        }}
        clicked={clicked[2]}
      >
        수
      </WeekDay>
      <WeekDay
        id="목"
        onClick={(e) => {
          handleClickedData(e);
          handleClickedState(3);
        }}
        clicked={clicked[3]}
      >
        목
      </WeekDay>
      <WeekDay
        id="금"
        onClick={(e) => {
          handleClickedData(e);
          handleClickedState(4);
        }}
        clicked={clicked[4]}
      >
        금
      </WeekDay>
      <WeekDay
        id="토"
        onClick={(e) => {
          handleClickedData(e);
          handleClickedState(5);
        }}
        clicked={clicked[5]}
      >
        토
      </WeekDay>
      <WeekDay
        id="일"
        onClick={(e) => {
          handleClickedData(e);
          handleClickedState(6);
        }}
        clicked={clicked[6]}
      >
        일
      </WeekDay>
    </DaysOfWeekContainer>
  );
};

const DaysOfWeekContainer = styled.div`
  width: 640px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  /* .checkbox {
    width: 42px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .checkbox > label {
    font-size: 15px;
    color: #1f1f1f;
    padding-left: 4px;
  }

  .checkbox > input {
    width: 14px;
    height: 14px;
    border: none;
  } */
`;

const WeekDay = styled.div<{ clicked: boolean }>`
  color: ${(props) => (props.clicked ? "white" : "##1f1f1f")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  background-color: ${(props) => (props.clicked ? "#2759a2" : "white")};
  border: 1px solid #ccc;
  border-radius: 30%;
  margin-right: 15px;
  :hover {
    background-color: ${(props) => (props.clicked ? "#ccc" : "#2759a2")}};
    color: ${(props) => (props.clicked ? "white" : "1f1f1f")};
`;

export default DaysOfWeek;
