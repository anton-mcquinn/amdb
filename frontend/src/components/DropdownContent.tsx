import React from 'react';
import { DropdownContext, DropdownMenu } from './Menu';

export function DropdownContent({ children }) {
  const { open } = React.useContext(DropdownContext);

  return (
    <div
      className={`absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
        open ? 'block' : 'hidden'
      }`}
    >
      {children}
    </div>
  );

}

DropdownMenu.Content = DropdownContent;
