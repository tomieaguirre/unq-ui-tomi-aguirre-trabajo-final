import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout/Layout";
import HomePage from "../pages/Home/HomePage";
import GamePage from "../pages/Game/GamePage";
import { PATHS } from "./paths"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.GAME} element={<GamePage />} />

          {/* Ruta inexistente */}
          <Route path="*" element={<Navigate to={PATHS.HOME} replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
