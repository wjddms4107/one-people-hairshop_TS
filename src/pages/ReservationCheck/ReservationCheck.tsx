import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "styles/Theme";
import { firestore } from "../../firebase";

interface UserInfoType {
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
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  const searchMyReserve = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reserve = firestore.collection("reserve");
    const res = await reserve.get().then((userData) => userData);
    res.forEach((data) => {
      if (data.data().number === searchNumber) {
        const userInfoData = data.data() as UserInfoType;
        setUserInfo(userInfoData);
      }
    });
  };

  return (
    <Container>
      <h1>내 예약 확인하기</h1>
      <span>번호를 입력하면 내 예약을 확인할 수 있습니다 :)</span>
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
          <div>{`예약자 성함: ${userInfo?.name} `}</div>
          <div>
            {`일시: ${userInfo?.month}월 ${userInfo?.day}일 ${userInfo?.selectedTime} `}
          </div>
          <div>{`시술 종류: ${userInfo?.selectedSort} `}</div>
          <div>{`요청사항: ${
            userInfo?.request === "" ? "없음" : userInfo?.request
          } `}</div>
          <div>{`연락처: ${userInfo?.number} `}</div>
        </UserInfo>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 24px;
  }

  > span {
    font-size: 18px;
    padding: 15px 0;
  }

  > form > input {
    height: 30px;
    font-size: 18px;
  }

  > form > button {
    margin-left: 10px;
    height: 30px;
    font-size: 18px;
    border: 1px solid;
    padding: 2px;
    background-color: ${colors.lightPink};
  }
`;

const UserInfo = styled.div`
  margin: 20px 0;
  width: 350px;
  line-height: 1.5;
  font-size: 20px;
`;
