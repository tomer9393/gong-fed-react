import "../styles.css";
import { useState, useMemo, useCallback } from "react";
import { useEmployees } from "../context/EmployeeContext";
import { getFullName, getInitials } from "../utils/Utils";
import EditIcon from "../assets/edit.png";
import DeleteIcon from "../assets/delete.png";
import PlusIcon from "../assets/plus.png";
import MinusIcon from "../assets/minus-sign.png";
import EditBox from "./EditBox";

export default function EmployeeInfo({ employee }) {
  const { employeesData, setEmployeesData } = useEmployees();
  const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [imgError, setImgError] = useState(false);

  const employeeName = getFullName(employee.firstName, employee.lastName); // Full name of employee
  const employeeInitials = getInitials(employee.firstName, employee.lastName); // Initials of employee

  // Handle image load error by setting imgError to true
  const handleImageError = () => {
    setImgError(true);
  };

  // Toggle the edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Toggle the collapse/expand state for staff members
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Handle delete action for the employee
  const handleDeleteClick = useCallback(() => {
    const deleteEmployee = (employees) => {
      return employees
        .filter((emp) => emp.id !== employee.id)
        .map((emp) => {
          if (emp.staffMembers && emp.staffMembers.length > 0) {
            return {
              ...emp,
              staffMembers: deleteEmployee(emp.staffMembers),
            };
          }
          return emp;
        });
    };

    const updatedEmployeeData = deleteEmployee(employeesData);
    setEmployeesData(updatedEmployeeData);
  }, [employeesData, employee, setEmployeesData]);

  // Handle name change action for the employee
  const handleNameChange = useCallback((firstName, lastName) => {
    const updateEmployeeData = (employees) => {
      return employees.map((emp) => {
        if (emp.id === employee.id) {
          return {
            ...emp,
            firstName: firstName,
            lastName: lastName,
          };
        } else if (emp.staffMembers && emp.staffMembers.length > 0) {
          return {
            ...emp,
            staffMembers: updateEmployeeData(emp.staffMembers),
          };
        }
        return emp;
      });
    };

    const updatedEmployeeData = updateEmployeeData(employeesData);
    setEmployeesData(updatedEmployeeData);
  }, [employeesData, employee, setEmployeesData]);

  // Memoize the rendering of staff members to prevent unnecessary re-renders
  const staffMembers = useMemo(() => {
    return employee.staffMembers?.map((member) => (
      <EmployeeInfo key={member.id} employee={member} />
    ));
  }, [employee]);

  return (
    <div className="employee-staff-container">
      <li key={employee.id}>
        <div className="employee-info">
          {/* Toggle button for staff members */}
          {employee.staffMembers.length === 0 ? (
            <div className="toggle">
              <img src={MinusIcon} alt="No Staff" />
            </div>
          ) : (
            <div onClick={toggleCollapse} className="toggle">
              <img src={isCollapsed ? MinusIcon : PlusIcon} alt="Toggle Staff" />
            </div>
          )}
          <div className="icons-container">
            <div className="avatar-container">
              {/* Display employee photo or initials */}
              {employee.photo && !imgError ? (
                <img
                  src={employee.photo}
                  alt={employeeName}
                  onError={handleImageError}
                  className="avatar-image"
                />
              ) : (
                <div className="initials">{employeeInitials}</div>
              )}
              <div className="name-email">
                <span className="name">{employeeName}</span>
                <span className="email">{employee.email}</span>
              </div>
            </div>
            <div className="icons">
              {/* Edit and Delete buttons */}
              <button onClick={toggleEdit}>
                <img src={EditIcon} alt="Edit" />
              </button>
              <button onClick={handleDeleteClick}>
                <img src={DeleteIcon} alt="Delete" />
              </button>
            </div>
          </div>
        </div>
        {/* Edit box for editing employee details */}
        {isEditing && (
          <EditBox
            employee={employee}
            handleNameChange={handleNameChange}
            setOnEdit={setIsEditing}
          />
        )}
      </li>
      {/* Staff members list, conditionally rendered based on collapse state */}
      <div className={!isCollapsed ? "hide-staff-members" : "staff-members"}>
        {staffMembers}
      </div>
    </div>
  );
}
