import "./styles.css";
import { useMemo } from "react";
import { useEmployees } from "./context/EmployeeContext";
import EmployeeInfo from "./components/EmployeeInfo";

export default function App() {

  const { employeesData, error, isLoading } = useEmployees();

  // Memoize the employees list to prevent unnecessary re-renders
  const employeesList = useMemo(() => {
    return employeesData.map((emp) => {
      return (
        <EmployeeInfo
          key={emp.id}
          // employeesData={employeesData}
          employee={emp}
          // setEmployeesData={setEmployeesData}
        />
      );
  })}, [employeesData]);

  // Display loading state
  if (isLoading) return <div> Loading... </div>;

  // Display error state
  if (error) return <div> Failed to retrive data... </div>;

  return (
    <div className="App">
      <div className="hierarchy-tree">
        <h1>Hierarchy Tree</h1>
        <ul className="employees-list">{employeesList}</ul>
      </div>
    </div>
  );
}
