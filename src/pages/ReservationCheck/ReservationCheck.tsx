import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "styles/Theme";
import { HiScissors } from "react-icons/hi";
import { firestore } from "../../firebase";

export interface UserInfoType {
  month: number;
  day: number;
  name: string;
  number: string;
  request: string;
  selectedSort: string;
  selectedTime: string;
}

export function ReservationCheck() {
  const [searchNumber, setSearchNumber] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfoType | null>();
  const [noData, setNoData] = useState<string>();
  console.log("searchNumber:", searchNumber);

  const searchMyReserve = async (e: React.FormEvent<HTMLFormElement>) => {
    setNoData("");
    setUserInfo(null);
    e.preventDefault();
    const reserve = firestore.collection("reserve");
    const res = await reserve.get().then((userData) => userData);

    res.forEach((data) => {
      if (data.data().number === searchNumber) {
        const userInfoData = data.data() as UserInfoType;
        setUserInfo(userInfoData);
      } else {
        setNoData("예약이 없습니다.");
      }
    });
  };

  return (
    <Container>
      <h1>📝 내 예약 확인하기</h1>
      <span>예약하신 핸드폰 번호로 조회해주세요 :)</span>
      <form onSubmit={searchMyReserve}>
        <input
          type="text"
          value={searchNumber}
          placeholder="ex) 01012345678"
          onChange={(e) => setSearchNumber(e.target.value)}
        />
        <button type="submit">예약확인</button>
      </form>
      {userInfo && (
        <UserInfo>
          <Title>
            <HiScissors />
            뽀까까까
          </Title>
          <Info>{`예약자 성함: ${userInfo?.name} `}</Info>
          <Info>
            {`일시: ${userInfo?.month}월 ${userInfo?.day}일 ${userInfo?.selectedTime} `}
          </Info>
          <Info>{`시술 종류: ${userInfo?.selectedSort} `}</Info>
          <Info>{`요청사항: ${
            userInfo?.request === "" ? "없음" : userInfo?.request
          } `}</Info>
          <Info>{`연락처: ${userInfo?.number} `}</Info>
        </UserInfo>
      )}
      {!userInfo && noData && (
        <UserInfo>
          <Title>
            <HiScissors />
            뽀까까까
          </Title>
          <Info>{noData}</Info>
        </UserInfo>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    font-size: 27px;
    font-weight: 600;
  }

  > span {
    font-size: 18px;
    padding: 20px 0 10px 0;
  }

  > form > input {
    height: 35px;
    font-size: 18px;
    border: 3px solid ${colors.grey};
    padding: 4px;
  }

  > form > button {
    height: 35px;
    font-size: 18px;
    padding: 4px;
    background-color: ${colors.lightPink};
    border: 3px solid ${colors.grey};
    border-left: 0px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 40px 0;
  width: 350px;
  font-size: 20px;
  background-color: ${colors.white};
  box-shadow: ${colors.lightPink} 0px 0px 0px 2px inset,
    rgb(255, 255, 255) 10px -10px 0px -3px;
`;

const Title = styled.div`
  height: 50px;
  width: 100%;
  font-weight: 600;
  margin-bottom: 10px;
  border-bottom: 5px solid ${colors.lightPink};
  text-align: center;
  padding-top: 17px;
  background-color: ${colors.lightPink};
`;

const Info = styled.div`
  padding: 10px 20px;
`;
