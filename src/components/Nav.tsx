import React from "react";
import styled from "styled-components";
import { useNavigate, Outlet } from "react-router-dom";
import { HiScissors } from "react-icons/hi";
import { device, deviceSizes } from "../styles/Theme";

export function Nav() {
  const navigate = useNavigate();

  return (
    <Container>
      <nav>
        <ul>
          <button type="button" onClick={() => navigate("/")}>
            <li>
              <HiScissors />
              뽀까까까
            </li>
          </button>
          <button type="button" onClick={() => navigate("/reservation")}>
            <li>예약하기</li>
          </button>
          <button type="button" onClick={() => navigate("/reservation/check")}>
            <li>예약확인</li>
          </button>
        </ul>
      </nav>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </Container>
  );
}

const Container = styled.main`
  margin: 300px auto;
  width: 100%;
  max-width: 100vw;
  min-width: ${deviceSizes.mobile};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px;

  > nav {
    display: flex;
    margin: 20px 0;

    height: 40px;

    > ul {
      display: flex;
      flex-direction: rows;
      align-items: center;
      justify-content: center;

      > button > li {
        width: 140px;
        display: flex;
        font-size: 22px;
        color: #5e5e5e;
        font-weight: 600;
        justify-content: center;
      }
    }
  }

  ${device.tablet} {
    width: 100%;
  }

  ${device.desktop} {
    width: 80%;
    max-width: 1000px;
    height: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
`;

const Dashboard = styled.div`
  width: 100%;
  padding: 40px;
  background-color: #f9e5e6;

  ${device.desktop} {
    width: 100%;
    min-width: fit-content;
    height: 100%;
    background-color: #f9e5e6;
  }
`;
