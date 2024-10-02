import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ArticlePage from "./pages/ArticlePage";
import CreateArticlePage from "./pages/CreateArticlePage";
import UserPage from "./pages/UserPage";
import LayoutPage from "./components/LayoutPage";
import React from "react";
import { api } from "./services/api";

const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  return children;
};

function App() {
  return (
    <LayoutPage>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/article/:id"
          element={
            <PrivateRoute>
              <ArticlePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-article"
          element={
            <PrivateRoute>
              <CreateArticlePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </LayoutPage>
  );
}

export default App;
