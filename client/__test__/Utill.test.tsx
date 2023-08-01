import { describe, it, expect } from "vitest";
import { getPageArray } from "../src/pages/utils/getPagesArray";
import { encodedUrl } from "../src/apis/CommentApi";
import { DayOfWeekBinaryToStringMap, DayOfWeekBinaryToNumber } from "../src/pages/utils/DaysOfWeekMap";

describe("요일 맵핑 테스트", () => {
  it("[0,0,0,0,0,0,1]이 파라미터로 전달되면 ['일']을 리턴한다", () => {
    expect(DayOfWeekBinaryToStringMap([0, 0, 0, 0, 0, 0, 1])).toEqual(["일"]);
  });
  it("[1,0,0,1,1,0,0]이 파라미터로 전달되면 ['월', '일']을 리턴한다", () => {
    expect(DayOfWeekBinaryToStringMap([1, 0, 0, 1, 1, 0, 0])).toEqual(["월", "목", "금"]);
  });
  it("[0,0,0,0,0,0,1]이 파라미터로 전달되면 ['0']을 리턴한다", () => {
    expect(DayOfWeekBinaryToNumber([0, 0, 0, 0, 0, 0, 1])).toEqual(["0"]);
  });
  it("[0,1,0,0,1,0,0]이 파라미터로 전달되면 ['2', '5']을 리턴한다", () => {
    expect(DayOfWeekBinaryToNumber([0, 1, 0, 0, 1, 0, 0])).toEqual(["2", "5"]);
  });
});

describe("페이지네이션 테스트", () => {
  it("totalPages의 값이 3일 경우 [1,2,3]이 출력된다.", () => {
    expect(getPageArray(3)).toEqual([1, 2, 3]);
  });
});

describe("인코드 테스트", () => {
  it("1이 입력될 경우 'MQ=='가 출력된다.", () => {
    expect(encodedUrl(1)).toEqual("MQ==");
  });
  it("'nickName'이 입력될 경우 'bmlja05hbWU='가 출력된다", () => {
    expect(encodedUrl("nickName")).toEqual("bmlja05hbWU=");
  });
  it("'test01'이 입력될 경우, 'dGVzdDAx'가 출력된다", () => {
    expect(encodedUrl("test01")).toEqual("dGVzdDAx");
  });
  it("불리언 true 값이 입력될 경우 'dHJ1ZQ=='가 출력된다", () => {
    expect(encodedUrl(true)).toEqual("dHJ1ZQ==");
  });
});
