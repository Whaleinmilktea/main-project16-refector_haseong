import React, { useState } from "react";
import styled from "styled-components";
import { StudyGroupCreateDto } from "../types/StudyGroupApiInterfaces";

interface DaysOfWeekProps {
  setStudyData: React.Dispatch<React.SetStateAction<StudyGroupCreateDto>>;
}

const DaysOfWeek = ({ setStudyData }: DaysOfWeekProps) => {
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

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
      setStudyData((prevStudyData) => {
        return { ...prevStudyData, dayOfWeek: currentSelected };
      }
      );
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
