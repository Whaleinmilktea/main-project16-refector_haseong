import { studyColor } from "../data/study-color";

export const backgroundColor = (color: string | undefined) => {
  if (color === "" || color === undefined) {
    return "#F6F6F6";
  } else {
    color = color.toLowerCase();
    return studyColor[color];
  }
};