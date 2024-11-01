import BrowserOnly from '@docusaurus/BrowserOnly';
import React, { useState, useEffect, useRef } from 'react';

interface Props {
  id: string; // Unique identifier for localStorage and event handling
  placeholder: string; // Default placeholder text
}

const storage = typeof localStorage === 'undefined' ? null : localStorage;

const CustomizableValue: React.FC<Props> = ({ id, placeholder }) => {
  const [customValue, setCustomValue] = useState(() => {
    const storedValue = storage?.getItem(id);
    return storedValue || '';
  });
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedValue = storage?.getItem(id);
    if (storedValue) {
      setCustomValue(storedValue);
    }
  }, [id]);

  // Update localStorage and all instances whenever customValue changes
  useEffect(() => {
    storage.setItem(id, customValue);

    // Trigger a custom event to notify other instances
    const event = new CustomEvent(`valueChanged-${id}`, {
      detail: { customValue },
    });
    window.dispatchEvent(event);

    // Listen for changes from other instances
    const listener = (event: CustomEvent) => {
      setCustomValue(event.detail.customValue);
    };
    window.addEventListener(`valueChanged-${id}`, listener);

    // Clean up the listener on unmount
    return () => {
      window.removeEventListener(`valueChanged-${id}`, listener);
    };
  }, [customValue, id]);

  // Focus the input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomValue(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
      <span className="customizable-value" style={{ alignItems: 'center', cursor: 'pointer' }}>
        {isEditing ? (
          <input
            placeholder={placeholder}
            ref={inputRef}
            type="text"
            value={customValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span onClick={handleEditClick} title={id}>
            {customValue || `<${placeholder}>`}
          </span>
        )}
      </span>
  );
};

export default CustomizableValue;