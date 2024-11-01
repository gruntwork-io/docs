import React, { useState, useEffect } from 'react';

interface Props {
  id: string; // Unique identifier for the component
}

const CustomizableValue: React.FC<Props> = ({ id }) => {
  const [accountName, setAccountName] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const storedValue = localStorage.getItem(id);
    if (storedValue) {
      setAccountName(storedValue);
    }
  }, [id]);

  // Update localStorage and all instances whenever accountName changes
  useEffect(() => {
    localStorage.setItem(id, accountName);

    // Trigger a custom event to notify other instances
    const event = new CustomEvent(`customValueChanged-${id}`, {
      detail: { accountName },
    });
    window.dispatchEvent(event);

    // Listen for changes from other instances
    const listener = (event: CustomEvent) => {
      setAccountName(event.detail.accountName);
    };
    window.addEventListener(`customValueChanged-${id}`, listener);

    // Clean up the listener on unmount
    return () => {
      window.removeEventListener(`customValueChanged-${id}`, listener);
    };
  }, [accountName, id]);

  const handleClick = () => {
    const newName = prompt('Enter account name:', accountName);
    if (newName !== null) {
      setAccountName(newName);
    }
  };

  return (
    <span onClick={handleClick} style={{ cursor: 'pointer' }}>
      {accountName || `<${id}>`}
    </span>
  );
};

export default CustomizableValue;