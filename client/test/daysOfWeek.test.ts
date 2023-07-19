import { render, fireEvent } from "@testing-library/react";
import DaysOfWeek from "../src/components/DaysOfWeek";

describe("DaysOfWeek 컴포넌트", () => {
  test("체크박스 클릭 시 `setChecked` 함수가 호출되어야 함", () => {
    const setChecked = jest.fn();
    const { getByLabelText } = render(
      <DaysOfWeek checked={[]} setChecked={setChecked} />
    );

    fireEvent.click(getByLabelText("월"));
    expect(setChecked).toHaveBeenCalledTimes(1);
  });
});