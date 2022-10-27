import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate, Outlet } from "react-router-dom";
import { colors, device, deviceSizes } from "../styles/Theme";

export function Nav() {
  const navigate = useNavigate();
  const [activeList, setActiveList] = useState<string>();

  const changeNavigate = (list: string) => {
    switch (list) {
      case "뽀까까까":
        return navigate("/");
      case "예약하기":
        return navigate("/reservation");
      default:
        return navigate("/reservation/check");
    }
  };

  return (
    <Container>
      <nav>
        <ul>
          {NAV_LIST.map(({ list, id }) => (
            <ListButton
              key={id}
              type="button"
              onClick={(e) => {
                setActiveList((e.target as HTMLElement).innerText);
                changeNavigate(list);
              }}
              activeList={activeList}
              list={list}
            >
              <li>{list}</li>
            </ListButton>
          ))}
        </ul>
      </nav>
      <Dashboard>
        <Outlet />
      </Dashboard>
    </Container>
  );
}

const NAV_LIST = [
  { id: 1, list: "뽀까까까" },
  { id: 2, list: "예약하기" },
  { id: 3, list: "예약확인" },
];

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;

  > nav {
    display: flex;
    height: 70px;

    > ul {
      display: flex;
      flex-direction: rows;
      align-items: center;
      justify-content: center;
    }
  }

  ${device.desktop} {
    margin: 200px auto;
    width: 1200px;
    max-width: 100vw;
    min-width: ${deviceSizes.mobile};
  }
`;

const ListButton = styled.button<{ activeList?: string; list: string }>`
  width: 140px;
  display: flex;
  font-size: 22px;
  color: ${colors.brown};
  font-weight: 600;
  justify-content: center;
  align-items: center;
  height: 100%;

  &:hover {
    background-color: ${colors.lightPink};
  }

  ${({ activeList, list }) =>
    activeList === list &&
    css`
      background-color: ${colors.lightPink};
    `}
`;

const Dashboard = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  background-color: #f9e5e6;

  ${device.desktop} {
    height: 620px;
    min-width: fit-content;
  }
`;
