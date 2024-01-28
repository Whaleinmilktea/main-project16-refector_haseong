export const DayOfWeekBinaryToStringMap = (dayOfWeek: number[]) => {
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
  return dayOfWeekArr;
};

export const DayOfWeekBinaryToNumber = (dayOfWeek: number[]) => {
  interface DayOfWeekMap {
    [key: number]: string;
  }
  const dayOfWeekMap: DayOfWeekMap = {
    0: "1",
    1: "2",
    2: "3",
    3: "4",
    4: "5",
    5: "6",
    6: "0",
  };
  const dayOfWeekArr = [];
  for (let i = 0; i < dayOfWeek.length; i++) {
    if (dayOfWeek[i] === 1) {
      dayOfWeekArr.push(dayOfWeekMap[i]);
    }
  }
  return dayOfWeekArr;
};