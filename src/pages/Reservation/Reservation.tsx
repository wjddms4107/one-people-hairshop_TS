import React from "react";
import styled from "styled-components";
import { Calendar, ReservationInfo } from "./components";
import { device, deviceSizes } from "../../styles/Theme";

export function Reservation() {
  return (
    <Container>
      <Calendar />
      <ReservationInfo />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  min-width: ${deviceSizes.mobile};

  ${device.desktop} {
    width: 100%;
    flex-direction: row;
  }
`;
