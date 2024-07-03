import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../api/api";
import { buildHierarchy } from "../utils/Utils";

// Create a context for employees data
const EmployeeContext = createContext();

// Custom hook to use the EmployeeContext
export const useEmployees = () => {
  return useContext(EmployeeContext);
};

// Provider component to wrap the application
export const EmployeeProvider = ({ children }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['employeesData'],
    queryFn: fetchAllUsers,
  });

  const [employeesData, setEmployeesData] = useState([]);

  // Update employees data with hierarchy structure when data is fetched
  useEffect(() => {
    if (data) {
      const hierarchy = buildHierarchy(data);
      setEmployeesData(hierarchy);
    }
  }, [data]);

  return (
    <EmployeeContext.Provider value={{ employeesData, setEmployeesData, error, isLoading }}>
      {children}
    </EmployeeContext.Provider>
  );
};
