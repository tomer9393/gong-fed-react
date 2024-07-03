const manager = {
  id: 321,
  firstName: "Marissa",
  lastName: "Mayer",
  email: "marissa.mayer@yahoo.com",
  photo: "https://paparazzi.com/goofi-marissa.jpg"
  // No manager id -> top level
};

const john = {
  id: 123,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  // Optional
  photo: "https://example.com/avatars/john.jpg",
  // Optional
  managerId: 321
};

const jane = {
  id: 124,
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  managerId: 321
  // No photo -> show initials
};

export const returnsFromApi = [manager, john, jane];
