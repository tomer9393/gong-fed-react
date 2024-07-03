import "../styles.css";
import { useState, useEffect, useRef } from "react";

export default function EditBox({
  employee,
  setOnEdit,
  handleNameChange,
}) {
  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const firstNameInputRef = useRef(null); 

  // Focus on the first name input when the component mounts
  useEffect(() => {
    if (firstNameInputRef.current) {
      firstNameInputRef.current.focus();
    }

    return () => {
      if (firstNameInputRef.current) {
        firstNameInputRef.current.blur();
      }
    };
  }, []);

  // Handle cancel button click
  const handleCancelClick = () => {
    setOnEdit(false);
  };

  // Handle save button click
  const handleSaveClick = () => {
    handleNameChange(firstName, lastName);
    setOnEdit(false);
  };

  // Handle key down event to trigger save on Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveClick();
    }
  };

  return (
    <div className="edit-box">
      <label>
        First name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={firstNameInputRef} 
        />
      </label>
      <label>
        Last name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </label>
      <div className="buttons-container">
        <button className="cancel-btn" onClick={handleCancelClick}>
          Cancel
        </button>
        <button className="save-btn" onClick={handleSaveClick}>
          OK
        </button>
      </div>
    </div>
  );
}
