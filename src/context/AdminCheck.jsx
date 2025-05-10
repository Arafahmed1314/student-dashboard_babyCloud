import { createContext, useContext, useState } from "react";

const AdminCheck = createContext();
export const useAdminCheck = () => {
  return useContext(AdminCheck);
};
export const AdminCheckProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AdminCheck.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminCheck.Provider>
  );
};
