import styled from "styled-components";
import Calendar from "../components/atoms/Calendar";

const ProfileCalendar = () => {
  return (
    <>
      <Wrapper>
        <CalendarWrapper>
          <Calendar />
        </CalendarWrapper>
      </Wrapper>
    </>
  );
};

export default ProfileCalendar;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  margin-top: 60px;
  padding: 10px;
`;
