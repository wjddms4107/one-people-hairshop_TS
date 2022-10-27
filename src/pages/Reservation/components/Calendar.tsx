import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { colors, device, deviceSizes } from "styles/Theme";
import { clickCalendar, clickTime } from "store/date";
import ReservationTime from "./ReservationTime";

function Calendar() {
  const dispatch: Dispatch = useDispatch();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isDateSelected, setIsDateSelected] = useState<boolean>(false);
  const handleCalendar = (date: Date | null) => {
    dispatch(
      clickCalendar({
        month: date?.getMonth() && date.getMonth() + 1,
        day: date?.getDate() && date.getDate(),
      })
    );
  };
  return (
    <CalendarSection>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          setIsDateSelected(true);
          handleCalendar(date);
          dispatch(clickTime(""));
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
  justify-content: center;

  .react-datepicker {
    height: 470px;
    border: 0px;
    font-size: 18px;
    background-color: ${colors.lightPink};
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${colors.brown};
  }

  .react-datepicker__navigation {
    top: 22px;
  }

  .react-datepicker__navigation--previous {
    left: 70px;
  }

  .react-datepicker__navigation--next {
    right: 70px;
  }

  .react-datepicker__header {
    border: 0px;
    background-color: ${colors.lightPink};
  }

  .react-datepicker__current-month {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    color: ${colors.brown};
    font-size: 25px;
    font-weight: 500;
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
  }

  .react-datepicker__day--disabled {
    color: ${colors.grey};
  }
`;

export default Calendar;
