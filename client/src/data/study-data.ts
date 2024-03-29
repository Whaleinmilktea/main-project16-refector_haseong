import * as icons from "simple-icons"
import type { SimpleIcon } from 'simple-icons';

interface StudyData {
  color: string;
  isSvg: boolean;
  icon: SimpleIcon;
}

export const studyData: { [key: string]: StudyData } = {
  javascript: {
    color: "#f7df1e",
    isSvg: true,
    icon: icons.siJavascript,
  },
  // typescript: "#007acc",
  // react: "#61dafb",
  // vue: "#42b883",
  // angular: "#dd0031",
  // nodejs: "#68a063",
  // express: "#000000",
  // nestjs: "#e0234e",
  // graphql: "#e10098",
  // mongodb: "#47a248",
  // postgresql: "#336791",
  // mysql: "#4479a1",
  // redis: "#dc382d",
  // docker: "#2496ed",
  // kubernetes: "#326ce5",
  // aws: "#ff9900",
  // firebase: "#ffca28",
  // java: "#007396",
  // spring: "#6db33f",
  // python: "#3776ab",
  // django: "#092e20",
  // flask: "#000000",
  // go: "#00add8",
  // rust: "#000000",
  // swift: "#ffac45",
  // kotlin: "#0095d5",
  // flutter: "#02569b",
  // dart: "#0175c2",
  // php: "#777bb4",
  // laravel: "#ff2d20",
  // ruby: "#cc342d",
  // rails: "#cc0000",
  // elixir: "#4b275f",
  // phoenix: "#A4509B",
  // haskell: "#5e5086",
  // scala: "#dc322f",
  // clojure: "#5881d8",
  // groovy: "#4298b8",
  // "": "#000000",
};
