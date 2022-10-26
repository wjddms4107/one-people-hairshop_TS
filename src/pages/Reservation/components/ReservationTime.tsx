import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { colors } from "styles/Theme";
import { clickTime } from "store/date";
import { RootState } from "store/store";
import { firestore } from "../../../firebase";

function ReservationTime() {
  const dispatch: Dispatch = useDispatch();
  const { selectedTime, month, day } = useSelector(
    (state: RootState) => state.date
  );
  const [reservedMonth, setReservedMonth] = useState();
  const [reservedDay, setReservedDay] = useState();
  const [reservedTime, setReservedTime] = useState();

  const getReservedTime = async () => {
    const reserve = firestore.collection("reserve");
    const res = await reserve.get().then((userData) => userData);
    res.forEach((el) => {
      if (el.data().month === month && el.data().day === day) {
        setReservedMonth(el.data().month);
        setReservedDay(el.data().day);
        setReservedTime(el.data().selectedTime);
      }
    });
  };

  useEffect(() => {
    getReservedTime();
  }, [month, day]);

  const disabledTime = (buttonTime: string) => {
    const date = new Date();
    return (
      (reservedTime === buttonTime &&
        reservedMonth === month &&
        reservedDay === day) ||
      (date.getMonth() + 1 === month &&
        date.getDate() === day &&
        date.getHours() > parseInt(buttonTime, 10))
    );
  };

  return (
    <TimeContainer>
      {TIME_BUTTON.map(({ id, time }) => (
        <TimeButton
          key={id}
          type="button"
          onClick={(e) => dispatch(clickTime((e.target as Element).innerHTML))}
          time={time}
          selectedTime={selectedTime}
          disabled={disabledTime(time)}
          disabledTime={disabledTime(time)}
        >
          {time}
        </TimeButton>
      ))}
    </TimeContainer>
  );
}

export default ReservationTime;

const TIME_BUTTON = [
  { id: 1, time: "10:00" },
  { id: 2, time: "11:00" },
  { id: 3, time: "12:00" },
  { id: 4, time: "13:00" },
  { id: 5, time: "14:00" },
  { id: 6, time: "15:00" },
  { id: 7, time: "16:00" },
  { id: 8, time: "17:00" },
  { id: 9, time: "18:00" },
];

const TimeContainer = styled.div`
  height: 470px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.lightPink};
  border-left: 2px double ${colors.brown};
`;

const TimeButton = styled.button<{
  time: string;
  selectedTime: string;
  reservedTime?: string;
  disabledTime?: boolean;
}>`
  color: ${colors.brown};
  margin: 4px;
  padding: 11px 14px;
  font-size: 18px;

  &:hover {
    color: ${colors.white};
    background-color: ${colors.darkPink};
  }

  ${({ time, selectedTime }) =>
    time === selectedTime &&
    css`
      color: ${colors.white};
      background-color: ${colors.darkPink};
    `}

  ${({ disabledTime }) =>
    disabledTime &&
    css`
      color: ${colors.white};
      background-color: ${colors.grey};

      &:hover {
        color: ${colors.white};
        background-color: ${colors.grey};
      }
    `}
`;
