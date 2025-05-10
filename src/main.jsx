import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { EditStudentProvider } from "./context/EditStudent.jsx";
import { AdminCheckProvider } from "./context/AdminCheck.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminCheckProvider>
      <EditStudentProvider>
        <App />
      </EditStudentProvider>
    </AdminCheckProvider>
  </StrictMode>
);
