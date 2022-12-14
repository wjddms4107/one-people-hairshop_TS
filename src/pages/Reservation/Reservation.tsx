import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { colors, device, deviceSizes } from "styles/Theme";
import { RootState } from "store/store";
import { Calendar, ReservationInfo } from "./components";

export function Reservation() {
  const { selectedTime, month } = useSelector((state: RootState) => state.date);
  const selectedOption = () => {
    if (!month && !selectedTime) return "π λ μ§λ₯Ό μ νν΄μ£ΌμΈμ.";
    if (month && !selectedTime) return "β± μκ°μ μ νν΄μ£ΌμΈμ.";
    if (month && selectedTime) return "π μμ½μ κ³μ μ§νν΄μ£ΌμΈμ.";
  };

  return (
    <>
      <Progress>{selectedOption()}</Progress>
      <Container>
        <Calendar />
        {selectedTime && <ReservationInfo />}
      </Container>
    </>
  );
}

const Progress = styled.div`
  font-size: 27px;
  font-weight: 600;
  text-align: center;
  color: ${colors.brown};
  text-shadow: 3px 3px ${colors.white};
  padding-bottom: 30px;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: ${deviceSizes.mobile};

  ${device.desktop} {
    width: 100%;
    flex-direction: row;
  }
`;
