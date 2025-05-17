import React from 'react';
import { useState } from 'react';

export const DropdownContext = React.createContext({
  isOpen: false,
  setIsOpen: () => {},
});

export function DropdownMenu({ children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
}

