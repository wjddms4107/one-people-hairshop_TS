import React from "react";
import styled from "styled-components";
import { HiScissors } from "react-icons/hi";
import { colors } from "styles/Theme";

export function Home() {
  return (
    <Container>
      <Title>
        <HiScissors />
        뽀까까까
      </Title>

      <HairImg
        src="https://cdn-icons-png.flaticon.com/512/1312/1312090.png"
        alt="hair"
      />

      <InfoBox>
        <Info>1인 미용실이기에 한 타임에 한 손님만 모시고 있습니다 :)</Info>
        <Info>예약하기 탭에서 예약을 하실 수 있습니다.</Info>
        <Info>예약확인 탭에서 예약을 확인하실 수 있습니다.</Info>
      </InfoBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  align-self: center;
  margin-bottom: 15px;
  font-size: 35px;
  font-weight: 700;
  color: ${colors.brown};
  text-shadow: 3px 3px ${colors.white};
  text-decoration: underline;
  text-decoration-style: wavy;
`;

const HairImg = styled.img`
  width: 250px;
  padding: 10px;
  margin: 30px;
  border: 7px solid ${colors.white};
  border-radius: 50%;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${colors.brown};
`;

const Info = styled.div`
  font-size: 20px;
  font-weight: 400;
  padding: 10px;
  font-weight: bold;
`;
