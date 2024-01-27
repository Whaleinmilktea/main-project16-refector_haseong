import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react"
import { passwordTest } from "../components/tools/validator";

describe("passwordTest 함수 테스트", () => {
  test("유효한 비밀번호가 제공될 때 통과", () => {
    const validPassword = "SecureP@ss123";
    const result = passwordTest(validPassword);
    expect(result).toBe(true);
  });

  test("비밀번호에 알파벳이 없는 경우 실패", () => {
    const invalidPassword = "123456!@#";
    const result = passwordTest(invalidPassword);
    expect(result).toBe(false);
  });

  test("비밀번호에 특수문자가 없는 경우 실패", () => {
    const invalidPassword = "Abcd1234";
    const result = passwordTest(invalidPassword);
    expect(result).toBe(false);
  });

  test("비밀번호에 숫자가 없는 경우 실패", () => {
    const invalidPassword = "Special@Char";
    const result = passwordTest(invalidPassword);
    expect(result).toBe(false);
  });

  test("비밀번호의 길이가 8자를 넘지 않는 경우 실패", () => {
    const invalidPassword = "Short!";
    const result = passwordTest(invalidPassword);
    expect(result).toBe(false);
  });

  test("비밀번호가 25자리를 넘어가는 경우 실패", () => {
    const invalidPassword = "ThisIsAVeryLongPassword1234567890!";
    const result = passwordTest(invalidPassword);
    expect(result).toBe(false);
  });
});