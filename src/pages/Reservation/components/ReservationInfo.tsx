import React from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { colors } from "../../../styles/Theme";
import { RootState } from "../../../store/store";
import {
  changeName,
  changeNumber,
  clickSort,
  changeRequest,
} from "../../../store/info";

function ReservationInfo() {
  const dispatch: Dispatch = useDispatch();
  const { month, day, selectedTime } = useSelector(
    (state: RootState) => state.date
  );
  const { name, number, selectedSort, request } = useSelector(
    (state: RootState) => state.info
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
          <NameInput
            type="text"
            value={name}
            onChange={(e) => dispatch(changeName(e.target.value))}
          />
        </InfoSort>

        <InfoSort>
          번호
          <NumberInput
            type="text"
            value={number}
            placeholder="ex) 01012345678"
            onChange={(e) => dispatch(changeNumber(e.target.value))}
          />
        </InfoSort>

        <InfoSort>
          종류
          <Sorts>
            {HAIR_SORTS.map(({ id, sort }) => (
              <SortButton
                key={id}
                type="button"
                onClick={(e) =>
                  dispatch(clickSort((e.target as Element).innerHTML))
                }
                sort={sort}
                selectedSort={selectedSort}
              >
                {sort}
              </SortButton>
            ))}
          </Sorts>
        </InfoSort>

        <InfoSort>요청사항</InfoSort>
        <RequestTextarea
          value={request}
          placeholder="요청사항이 있다면 적어주세요."
          onChange={(e) => dispatch(changeRequest(e.target.value))}
        />

        <SubmitButton type="submit">예약하기</SubmitButton>
      </InfoMain>
    </Container>
  );
}

export default ReservationInfo;

const HAIR_SORTS = [
  { id: 1, sort: "커트" },
  { id: 2, sort: "염색" },
  { id: 3, sort: "클리닉" },
  { id: 4, sort: "드라이" },
  { id: 5, sort: "기타" },
];

const Container = styled.section`
  width: 100%;
  height: 470px;
  margin-left: 20px;ㄴㅌ
  padding: 10px 0;
  padding-left: 10px;
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

const NameInput = styled.input`
  width: 80%;
  height: 35px;
  margin: 0px 10px;
  padding-left: 5px;
  font-size: 18px;
  border: 3px solid ${colors.lightGrey};
`;

const NumberInput = styled.input`
  width: 80%;
  height: 35px;
  margin: 0px 10px;
  padding-left: 5px;
  font-size: 18px;
  border: 3px solid ${colors.lightGrey};
`;

const Sorts = styled.div`
  display: flex;
  align-items: center;
  width: 82%;
  height: 35px;
  margin: 0px 10px;
  padding-left: 5px;
`;

const SortButton = styled.button<{ sort: string; selectedSort: string }>`
  width: 100%;
  height: 33px;
  margin: 0 3px;
  border: 3px solid ${colors.lightGrey};

  &:hover {
    border: 3px solid ${colors.red};
    color: ${colors.red};
  }

  ${(props) =>
    props.sort === props.selectedSort &&
    css`
      border: 3px solid ${colors.red};
      color: ${colors.red};
    `}
`;

const RequestTextarea = styled.textarea`
  height: 100px;
  margin: 0px 15px;
  padding: 8px;
  border: 3px solid #f2f2f2;
  font-size: 18px;
`;

const SubmitButton = styled.button`
  align-self: center;
  width: 100px;
  color: ${colors.brown};
  font-size: 22px;
  padding: 3px;
  margin-top: 9px;
  border: 1px solid ${colors.grey};
`;
