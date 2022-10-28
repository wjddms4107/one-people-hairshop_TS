import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { colors, device, deviceSizes } from "styles/Theme";
import { RootState } from "store/store";
import { Calendar, ReservationInfo } from "./components";

export function Reservation() {
  const { selectedTime, month } = useSelector((state: RootState) => state.date);
  const selectedOption = () => {
    if (!month && !selectedTime) return "📅 날짜를 선택해주세요.";
    if (month && !selectedTime) return "⏱ 시간을 선택해주세요.";
    if (month && selectedTime) return "📝 예약을 계속 진행해주세요.";
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
