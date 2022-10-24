import React from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { colors } from "../../../styles/Theme";
import { clickTime } from "../../../store/date";
import { RootState } from "../../../store/store";

function ReservationTime() {
  const dispatch: Dispatch = useDispatch();
  const { selectedTime } = useSelector((state: RootState) => state.date);

  return (
    <TimeContainer>
      {TIME_BUTTON.map(({ id, time }) => (
        <TimeButton
          key={id}
          type="button"
          onClick={(e) => dispatch(clickTime((e.target as Element).innerHTML))}
          time={time}
          selectedTime={selectedTime}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${colors.lightsPink};
  border-left: 2px double ${colors.brown};
`;

const TimeButton = styled.button<{ time: string; selectedTime: string }>`
  color: ${colors.brown};
  margin: 5px;
  padding: 11px 14px;
  font-size: 18px;

  &:hover {
    color: ${colors.white};
    background-color: ${colors.darkPink};
  }

  ${(props) =>
    props.time === props.selectedTime &&
    css`
      color: ${colors.white};
      background-color: ${colors.darkPink};
    `}
`;
