import React from "react";
import { describe, expect, test } from "vitest";
import { render,screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { passwordTest } from "../src/components/tools/validator";
import SignUpForm from "../src/components/molecules/signup-form"


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


// 공부해야 할 것 -> 하위 컴포넌트에서 일어난 이벤트에 따라 상위 컴포넌트의 변경사항을 적용할 때 어떻게 해야 하는지?
describe("사용자 비밃번호 입력 시 문구 전환", () => {
  const user = userEvent.setup()

  test("조건에 맞지 않을 때는, '비밀번호는 8~25자리의 영문, 숫자, 특수문자 조합이어야 합니다'", () => {
    render(<SignUpForm />)
    const passwordInput = screen.getByPlaceholderText("Password")
    user.clear(passwordInput)
    user.type(passwordInput, "123456")
  })
  // 조건에 맞을 때는, "사용할 수 있는 비밀번호"

  // 아무런 입력이 없을 때는 null
})