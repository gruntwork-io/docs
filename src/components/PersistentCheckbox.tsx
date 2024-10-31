
import React, { useState, useEffect } from 'react';

interface Props {
  id: string;
  label?: string;
}

const PersistentCheckbox: React.FC<Props> = ({ id, label }) => {
  const [isChecked, setIsChecked] = useState(false);

  // Load state from localStorage on component mount
  useEffect(() => {
    const storedValue = localStorage.getItem(id);
    if (storedValue) {
      setIsChecked(JSON.parse(storedValue));
    }
  }, [id]);

  // Save state to localStorage whenever isChecked changes
  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(isChecked));
  }, [isChecked, id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
    <label htmlFor={id} className="persistent-checkbox">
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleChange}
      />
        <span className="checkmark"></span> {/* Added span for custom styling */}
        {!!label && label}
    </label>
    </div>
  );
};

export default PersistentCheckbox;