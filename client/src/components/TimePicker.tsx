import { TimePicker } from "antd";
import dayjs from "dayjs";
import styled from "styled-components";

const format = "HH:mm";

export const TimePick = () => {
  const onChange = (time: unknown, timeString: string) => {
    // onChange returns a moment object
    // 결국 상위 컴포넌트로 끌어올려줘야 하는 객체
    console.log(time, timeString);
  };

  return (
    <TimePicker
      onChange={onChange}
      defaultValue={dayjs("00:00", "HH:mm")}
      format={format}
      minuteStep={30}
      autoFocus={true}
    />
  );
};

const TimePickerWrapper = styled.div`
  width: 10px;
`;
