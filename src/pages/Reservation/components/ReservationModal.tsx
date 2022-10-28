import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import styled from "styled-components";
import { colors } from "styles/Theme";
import { HiScissors } from "react-icons/hi";
import { clickCalendar, clickTime } from "store/date";
import { changeName, changeNumber, clickSort, changeRequest } from "store/info";
import { firestore } from "../../../firebase";

interface ModalDefaultType {
  closeModal: () => void;
}

function ReservationModal({ closeModal }: ModalDefaultType) {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const { month, day, selectedTime } = useSelector(
    (state: RootState) => state.date
  );
  const { name, number, selectedSort, request } = useSelector(
    (state: RootState) => state.info
  );

  const addUserInfo = () => {
    const reserve = firestore.collection("reserve");
    reserve.add({
      name,
      number,
      selectedSort,
      request,
      month,
      day,
      selectedTime,
    });
  };

  const resetUserInfo = () => {
    dispatch(clickCalendar({ month: "", day: "" }));
    dispatch(clickTime(""));
    dispatch(changeName(""));
    dispatch(changeNumber(""));
    dispatch(clickSort(""));
    dispatch(changeRequest(""));
  };

  return (
    <Container>
      <ModalHeader>
        <h1>
          <HiScissors />
          뽀까까까
        </h1>
        <ModalInfo>
          <div>
            <RedColorSpan>{name}</RedColorSpan>
            <span>님,</span>
          </div>
          <RedColorSpan>{` ${month}월 ${day}일 ${selectedTime}`}</RedColorSpan>
          에<RedColorSpan>{` ${selectedSort}`}</RedColorSpan>으로
          <div>예약 하시는 것이 맞나요?</div>
        </ModalInfo>
        <div>확인을 누르시면 예약이 완료됩니다 :)</div>
      </ModalHeader>
      <ButtonDiv>
        <ReservationButton
          onClick={() => {
            addUserInfo();
            resetUserInfo();
            navigate("/");
          }}
        >
          확인
        </ReservationButton>
        <CancelButton onClick={closeModal}>취소</CancelButton>
      </ButtonDiv>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

const ModalHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 23px;
  font-weight: 600;
  color: ${colors.brown};
  line-height: 1.2;
  margin: 20px;

  > h1 {
    font-size: 26px;
  }
`;

const ModalInfo = styled.div`
  margin: 35px 0;
`;

const RedColorSpan = styled.span`
  color: ${colors.red};
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 110px;
  height: 40px;
`;

const ReservationButton = styled.button`
  width: 100%;
  font-size: 17px;
  color: ${colors.brown};
  font-weight: 500;
  border: 3px solid ${colors.brown};
`;

const CancelButton = styled(ReservationButton)`
  margin-left: 5px;
`;

export default ReservationModal;
