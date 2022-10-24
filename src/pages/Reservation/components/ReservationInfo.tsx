import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { colors } from "../../../styles/Theme";
import { RootState } from "../../../store/store";

function ReservationInfo() {
  const { month, day, selectedTime } = useSelector(
    (state: RootState) => state.date
  );

  return (
    <Container>
      <InfoHeader>
        <h1>뽀까까까</h1>
        <div>
          예약시간
          <span>{` ${month}월 ${day}일 ${selectedTime}`}</span>
        </div>
      </InfoHeader>
      <InfoMain>
        <InfoSort>
          이름
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

        <SubmitButton type="submit">예약</SubmitButton>
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
  margin-left: 20px;
  padding: 20px 0;
  color: ${colors.brown};
  background-color: ${colors.white};
  box-shadow: ${colors.lightsPink} 0px 0px 0px 2px inset,
    rgb(255, 255, 255) 10px -10px 0px -3px;
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
  height: 35px;
  margin: 0px 10px;
  padding-left: 5px;
  border: 3px solid ${colors.lightGrey};
`;

const Sorts = styled.div`
  display: flex;
  align-items: center;
  width: 82%;
  height: 35px;
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

const SubmitButton = styled.button`
  color: ${colors.brown};
  font-size: 22px;
`;
