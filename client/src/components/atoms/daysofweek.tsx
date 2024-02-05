import React from "react";
import styled from "styled-components";

interface DaysOfWeekProps {
  value: number[];
  onClick: (value: number[]) => void;
}

const DaysOfWeek = ({ value, onClick }: DaysOfWeekProps) => {
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
      const newValue = [...value];
      newValue[dayId] = newValue[dayId] === 1 ? 0 : 1;
      onClick(newValue);
    }
  };

  return (
    <Wrapper>
      <WeekDay id="월" clicked={value[0]}>
        월
      </WeekDay>
      <WeekDay
        id="화"
        onClick={(e) => {
          handleClickedData(e);
        }}
        clicked={value[1]}
      >
        화
      </WeekDay>
      <WeekDay
        id="수"
        onClick={(e) => {
          handleClickedData(e);
        }}
        clicked={value[2]}
      >
        수
      </WeekDay>
      <WeekDay
        id="목"
        onClick={(e) => {
          handleClickedData(e);
        }}
        clicked={value[3]}
      >
        목
      </WeekDay>
      <WeekDay
        id="금"
        onClick={(e) => {
          handleClickedData(e);
        }}
        clicked={value[4]}
      >
        금
      </WeekDay>
      <WeekDay
        id="토"
        onClick={(e) => {
          handleClickedData(e);
        }}
        clicked={value[5]}
      >
        토
      </WeekDay>
      <WeekDay
        id="일"
        onClick={(e) => {
          handleClickedData(e);
        }}
        clicked={value[6]}
      >
        일
      </WeekDay>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const WeekDay = styled.div<{ clicked: number }>`
  color: ${(props) => (props.clicked === 1 ? "white" : "##1f1f1f")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  background-color: ${(props) => (props.clicked === 1 ? "#2759a2" : "white")};
  border: 1px solid #ccc;
  border-radius: 30%;
  margin-right: 15px;
  :hover {
    background-color: ${(props) => (props.clicked === 1 ? "#ccc" : "#2759a2")};
  }
  color: ${(props) => (props.clicked === 1 ? "white" : "1f1f1f")};
`;

export default DaysOfWeek;
