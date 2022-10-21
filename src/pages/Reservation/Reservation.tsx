import React, { useState } from "react";
import styled from "styled-components";
// import { Calendar } from ".";
// eslint-disable-next-line import/named
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
  align-items: center;
  justify-content: center;
`;
