import React, { useState } from "react";
import styled from "styled-components";
import { Calendar } from "./components";

export function Reservation() {
  return (
    <Container>
      <Calendar />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
