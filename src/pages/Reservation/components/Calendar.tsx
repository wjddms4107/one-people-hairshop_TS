import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import ReservationTime from "./ReservationTime";
import { colors } from "../../../styles/Theme";

function Calendar() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isDateSelected, setIsDateSelected] = useState<boolean>(false);

  console.log("startDate:", startDate?.getMonth() && startDate.getMonth() + 1);

  return (
    <CalendarSection>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          setIsDateSelected(true);
        }}
        inline
        locale={ko}
        minDate={new Date()}
      />
      {isDateSelected && <ReservationTime />}
    </CalendarSection>
  );
}

const CalendarSection = styled.section`
  display: flex;
  flex-direction: row;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  .react-datepicker {
    height: 470px;
    border: 0px;
    font-size: 20px;
    background-color: ${colors.lightsPink};
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${colors.brown};
  }

  .react-datepicker__navigation {
    top: 25px;
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
    background-color: ${colors.lightsPink};
  }

  .react-datepicker__current-month {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    color: ${colors.brown};
    font-size: 28px;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    margin: 15px;
    color: ${colors.brown};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--selected:hover,
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    background-color: ${colors.darkPink};
    color: ${colors.white};
    border-radius: 50%;
  }

  .react-datepicker__day--disabled {
    color: ${colors.grey};
  }
`;

export default Calendar;
