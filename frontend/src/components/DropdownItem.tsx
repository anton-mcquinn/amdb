import React from 'react';
import { DropdownContext } from './Menu';

function DropdownItem({ children, ...props }) {
  return (
    <li>
      <button className="py-3 px-5 whitespace-nowrap hover:underline" {...props}>{ children }</button> 
    </li>
  );
};

Dropdown.Item = DropdownItem;
