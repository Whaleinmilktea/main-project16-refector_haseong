import { studyData } from "../data/study-data";

export const backgroundColor = (color: string | undefined) => {
  if (color === "" || color === undefined) {
    return "#F6F6F6";
  } else {
    color = color.toLowerCase();
    return studyData[color];
  }
};