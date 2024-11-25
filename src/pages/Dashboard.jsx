import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import EditorPanel from "./EditorPanel";
import ViewerPanel from "./ViewerPanel";

const Dashboard = () => {
  const [role, setRole] = useState(
    localStorage.getItem("userRole") || "viewer"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      alert("Unauthorized access. Please Login.");
      navigate("/");
    }
  }, [role, navigate]);

  const renderContent = () => {
    switch (role) {
      case "admin":
        return <AdminPanel />;
      case "editor":
        return <EditorPanel />;
      case "viewer":
        return <ViewerPanel />;
      default:
        return <p>Unauthorized role detected.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {renderContent()}
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
