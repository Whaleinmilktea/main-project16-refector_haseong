// vitest를 동작시키기 위한 첫번째 테스트
import { describe, expect, it } from "vitest";
const Sum = (a : number, b : number) => {
  return a + b;
};

describe("Sum", () => {
  it("should return 3", () => {
    expect(Sum(1, 2)).toBe(3);
  });
})