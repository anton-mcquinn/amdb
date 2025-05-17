import React from 'react';
import { DropdownContext } from './Menu';

function DropdownList({ children, ...props }) {
  const { setOpen } = React.useContext(DropdownContext); // get the context
  
  return (
    <ul onClick={() => setOpen(false)} className="divide-y divide-gray-200 text-gray-700" {...props}>
      { children }  
    </ul>
  );
};

// optional - but I like this pattern to know it must be a child of Dropdown
Dropdown.List = DropdownList;
