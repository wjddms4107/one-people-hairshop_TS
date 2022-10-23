import React from "react";
import styled from "styled-components";
import { colors } from "../../../styles/Theme";

function ReservationInfo() {
  return (
    <Container>
      <InfoHeader>
        <h1>뽀까까까</h1>
        <div>
          예약시간 : <span>10월 22일 10:00</span>
        </div>
      </InfoHeader>
      <InfoMain>
        <InfoSort>
          성함
          <MainInput />
        </InfoSort>

        <InfoSort>
          번호
          <MainInput />
        </InfoSort>

        <InfoSort>
          종류
          <Sorts>
            {HAIR_SORTS.map(({ id, sort }) => (
              <button key={id} type="button">
                {sort}
              </button>
            ))}
          </Sorts>
        </InfoSort>

        <InfoSort>요청사항</InfoSort>
        <RequestTextarea />
      </InfoMain>
    </Container>
  );
}

export default ReservationInfo;

const HAIR_SORTS = [
  { id: 1, sort: "커트" },
  { id: 2, sort: "엄색" },
  { id: 3, sort: "클리닉" },
  { id: 4, sort: "드라이" },
  { id: 5, sort: "기타" },
];

const Container = styled.section`
  width: 100%;
  height: 470px;
  margin: 20px;
  padding: 10px 0;
  color: #5b5b5b;
  background-color: ${colors.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;

const InfoHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  font-size: 23px;
  font-weight: 600;

  > h1 {
    font-size: 26px;
  }

  > div {
    margin: 10px 0;
  }

  > div > span {
    font-weight: 600;
    color: ${colors.red};
  }
`;

const InfoMain = styled.main`
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;

const InfoSort = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
`;

const MainInput = styled.input`
  width: 80%;
  height: 33px;
  margin: 0px 10px;
  padding-left: 5px;
  border: 3px solid ${colors.lightGrey};
`;

const Sorts = styled.div`
  display: flex;
  align-items: center;
  width: 82%;
  height: 33px;
  margin: 0px 10px;
  padding-left: 5px;

  > button {
    width: 100%;
    height: 33px;
    margin: 0 3px;
    border: 3px solid ${colors.lightGrey};

    &:hover {
      border: 3px solid ${colors.red};
      color: ${colors.red};
    }
  }
`;

const RequestTextarea = styled.textarea`
  height: 100px;
  margin: 0px 15px;
  padding: 8px;
  border: 3px solid #f2f2f2;
`;
