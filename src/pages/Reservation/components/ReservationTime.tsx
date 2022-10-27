import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { colors } from "styles/Theme";
import { clickTime } from "store/date";
import { RootState } from "store/store";
import { UserInfoType } from "pages/ReservationCheck/ReservationCheck";
import { firestore } from "../../../firebase";

interface TotalInfoType {
  selectedTime?: UserInfoType[];
  day?: UserInfoType[];
  month?: UserInfoType[];
  [key: number]: UserInfoType;
}

function ReservationTime() {
  const dispatch: Dispatch = useDispatch();
  const { selectedTime, month, day } = useSelector(
    (state: RootState) => state.date
  );

  const [reservedTime, setReservedTime] = useState<string[]>([]);

  const getReservedTime = () => {
    const reserve = firestore.collection("reserve");

    reserve.get().then((docs) => {
      let bucketData: any[] = [];
      let infoObjArr = [] as TotalInfoType[];
      docs.forEach((doc) => {
        infoObjArr = [...infoObjArr, { ...doc.data() }];
      });

      const thisDayInfo = infoObjArr.filter(
        (info) => info.month === month && info.day === day
      );

      if (thisDayInfo) {
        const totalSelectedTime = thisDayInfo.map(
          (el, i) => thisDayInfo[i].selectedTime
        );

        bucketData = [...bucketData, totalSelectedTime];
        setReservedTime(bucketData[0]);
      }
    });
  };

  useEffect(() => {
    getReservedTime();
  }, [month, day, selectedTime]);

  const disabledTime = (buttonTime: string) => {
    const date = new Date();
    return (
      reservedTime.includes(buttonTime) ||
      (date.getMonth() + 1 === month &&
        date.getDate() === day &&
        date.getHours() > parseInt(buttonTime, 10))
    );
  };

  return (
    <TimeContainer>
      {TIME_BUTTON.map(({ id, time }) => (
        <TimeButton
          key={id}
          type="button"
          onClick={(e) => dispatch(clickTime((e.target as Element).innerHTML))}
          time={time}
          selectedTime={selectedTime}
          disabled={disabledTime(time)}
          disabledTime={disabledTime(time)}
        >
          {time}
        </TimeButton>
      ))}
    </TimeContainer>
  );
}

export default ReservationTime;

const TIME_BUTTON = [
  { id: 1, time: "10:00" },
  { id: 2, time: "11:00" },
  { id: 3, time: "12:00" },
  { id: 4, time: "13:00" },
  { id: 5, time: "14:00" },
  { id: 6, time: "15:00" },
  { id: 7, time: "16:00" },
  { id: 8, time: "17:00" },
  { id: 9, time: "18:00" },
];

const TimeContainer = styled.div`
  height: 470px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${colors.lightPink};
  border-left: 2px double ${colors.brown};
  padding: 0 4px;
`;

const TimeButton = styled.button<{
  time: string;
  selectedTime?: string;
  reservedTime?: string;
  disabledTime?: boolean;
}>`
  color: ${colors.brown};
  margin: 4px;
  padding: 9px 10px;
  font-size: 16px;
  border: 1px solid ${colors.brown};

  &:hover {
    color: ${colors.white};
    background-color: ${colors.darkPink};
  }

  ${({ time, selectedTime }) =>
    time === selectedTime &&
    css`
      color: ${colors.white};
      background-color: ${colors.darkPink};
      border: 1px solid ${colors.darkPink};
    `}

  ${({ disabledTime }) =>
    disabledTime &&
    css`
      color: #b8b8b8;
      border: 1px solid ${colors.grey};

      &:hover {
        color: #b8b8b8;
        background-color: ${colors.lightPink};
      }
    `}
`;
