import { createContext, useContext, useState } from "react";
const EditStudentContext = createContext();
export const useEditStudent = () => {
  return useContext(EditStudentContext);
};

export const EditStudentProvider = ({ children }) => {
  const [editData, setEditData] = useState(null);

  return (
    <EditStudentContext.Provider value={{ editData, setEditData }}>
      {children}
    </EditStudentContext.Provider>
  );
};
