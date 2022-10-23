import React from "react";
import styled from "styled-components";
import { colors } from "../../../styles/Theme";

function ReservationTime() {
  return (
    <TimeContainer>
      {TIME_BUTTON.map(({ id, time }) => (
        <TimeButton key={id} type="button">
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
  background-color: #f3cecf;
`;

const TimeButton = styled.button`
  color: ${colors.brown};
  background-color: ${colors.lightsPink};
  margin: 5px;
  padding: 11px 14px;
  font-size: 18px;

  &:hover {
    color: ${colors.white};
    background-color: ${colors.darkPink};
  }
`;
