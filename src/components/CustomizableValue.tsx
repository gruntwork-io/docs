import React, { useState, useEffect, useRef } from 'react';

interface Props {
  id: string; // Unique identifier for localStorage and event handling
  placeholder: string; // Default placeholder text
}

const CustomizableValue: React.FC<Props> = ({ id, placeholder }) => {
  const [customValue, setCustomValue] = useState(() => {
    const storedValue = localStorage.getItem(id);
    return storedValue || '';
  });
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedValue = localStorage.getItem(id);
    if (storedValue) {
      setCustomValue(storedValue);
    }
  }, [id]);

  // Update localStorage and all instances whenever customValue changes
  useEffect(() => {
    localStorage.setItem(id, customValue);

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
    <span style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={customValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          style={{ border: '1px solid #ccc', padding: '4px', borderRadius: '4px' }}
        />
      ) : (
        <span onClick={handleEditClick}>
          {customValue || `<${placeholder}>`}
          <span style={{ marginLeft: '4px' }}>
            {/* Inline SVG for the pencil icon */}
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.7 1.8 18 9.5 20.5s18.7-5.4 20.5-9.5l20.9-37.4c4.2-7.9 11.8-15.8 22.2-22.2L291.7 184l62.1 62.1 33.9 33.9 11.3-11.3 113.4-113.4c14.1-14.1 23.3-31.8 22.2-51.4zM38.8 462l20.9-37.4c8.7-15.8 23.9-28 41.9-33.9L190.8 338l-11 11L58.6 322.9L38.8 462zm188-160l186.1-186.1L404.1 178l-22.6-22.6L178 355.4l-11 11L228.6 408l113.4-113.4z"/>
            </svg>
          </span>
        </span>
      )}
    </span>
  );
};

export default CustomizableValue;