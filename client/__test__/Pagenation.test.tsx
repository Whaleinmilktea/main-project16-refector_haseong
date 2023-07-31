import { describe, it, expect } from "vitest";
import { getPageArray } from "../src/pages/utils/getPagesArray";

describe("페이지네이션 테스트", () => {
  it("totalPages의 값이 3일 경우 [1,2,3]이 출력된다.", () => {
    expect(getPageArray(3)).toEqual([1, 2, 3]);
  });
});
