import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { DropdownContext, DropdownMenu } from './Menu';

export function DropdownButton({ children, ...props }) {
  const { isOpen, setIsOpen } = React.useContext(DropdownContext);
  
  function toggleOpen() {
    console.log("toggle clicked, current state:", isOpen);
    setIsOpen(!isOpen);
    console.log("toggle clicked, new state:", !isOpen);
  }
  
  return (
    <button onClick={toggleOpen} className="rounded px-4 py-2 font-bold text-white bg-gray-800 flex items-center">
      {children}
      {isOpen ? (
        <ChevronUpIcon className="w-2 h-2 ml-2 text-gray-100" />
      ) : (
        <ChevronDownIcon className="w-2 h-2 ml-2 text-gray-100" />
      )}
    </button>
  );
}

DropdownMenu.Button = DropdownButton;
