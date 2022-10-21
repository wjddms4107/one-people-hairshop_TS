import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./Nav";
import { Home } from "../pages/Home/Home";
import { Reservation } from "../pages/Reservation/Reservation";
import { ReservationCheck } from "../pages/ReservationCheck/ReservationCheck";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/reservation/check" element={<ReservationCheck />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
