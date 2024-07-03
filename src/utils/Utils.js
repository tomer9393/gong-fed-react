// Build a hierarchy of employees from a flat array
const buildHierarchy = (employees) => {
  const map = {};
  const managers = [];

  employees.forEach((employee) => {
    map[employee.id] = { ...employee, staffMembers: [] };
  });

  employees.forEach((employee) => {
    if (employee.managerId) {
      map[employee.managerId].staffMembers.push(map[employee.id]);
    } else {
      managers.push(map[employee.id]);
    }
  });

  return managers;
};

// Capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Get the full name of an employee
const getFullName = (firstName, lastName) => {
  const capitalizedFirstName = capitalizeFirstLetter(firstName);
  const capitalizedLastName = capitalizeFirstLetter(lastName);
  return `${capitalizedFirstName} ${capitalizedLastName}`;
};

// Get the initials of an employee
const getInitials = (firstName, lastName) => {
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};

export { buildHierarchy, getFullName, getInitials };
