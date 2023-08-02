import styled from "styled-components";
import Calendar from "../components/calendar/Calendar";

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
  width: 960px;
  height: 90vh;
  background-color: #ffffff;
  margin-top: 100px;
  padding: 10px;
`;
