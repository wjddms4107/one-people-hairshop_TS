import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

function Calendar() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <CalendarSection>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
        locale={ko}
      />
    </CalendarSection>
  );
}

const CalendarSection = styled.section`
  .react-datepicker {
    border: 0px;
    font-size: 20px;
    background-color: #feeeee;
  }

  .react-datepicker__navigation-icon::before {
    border-color: #5b5b5b;
  }

  .react-datepicker__navigation {
    top: 25px;
    background-color: #e0e4ea;
    border-radius: 50%;
  }

  .react-datepicker__navigation--previous {
    left: 70px;
  }

  .react-datepicker__navigation--next {
    right: 70px;
  }

  .react-datepicker__header {
    border: 0px;
    background-color: #feeeee;
  }

  .react-datepicker__current-month {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    height: 60px;
    color: #5b5b5b;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: #5b5b5b;
    margin: 20px;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    border-radius: 1rem;
    background-color: #e0e4ea;
  }
`;

export default Calendar;
