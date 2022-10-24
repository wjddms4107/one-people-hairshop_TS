import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import styled from "styled-components";
import { colors } from "styles/Theme";
import { HiScissors } from "react-icons/hi";

interface ModalDefaultType {
  closeModal: () => void;
}
function ReservationModal({ closeModal }: ModalDefaultType) {
  const { month, day, selectedTime } = useSelector(
    (state: RootState) => state.date
  );
  const { name, selectedSort } = useSelector((state: RootState) => state.info);

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
        <ReservationButton>확인</ReservationButton>
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
  margin: 20px;
  font-size: 23px;
  font-weight: 600;
  color: ${colors.brown};
  line-height: 1.2;

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
  margin-right: 5px;
  border: 3px solid ${colors.brown};
`;

const CancelButton = styled.button`
  width: 100%;
  font-size: 17px;
  color: ${colors.brown};
  font-weight: 500;
  border: 3px solid ${colors.brown};
`;

export default ReservationModal;
