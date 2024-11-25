import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "././pages/LoginPage";
import Dashboard from "././pages/Dashboard";

const getUserRole = () => localStorage.getItem("userRole");

const ProtectedRoute = ({ allowedRoles, children }) => {
  const userRole = getUserRole();

  if (!userRole) {
    return <Navigate to="/" />;
  }

  if (allowedRoles.includes(userRole)) {
    return children;
  }

  return <div>You do not have permission to access this page.</div>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "editor", "viewer"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
