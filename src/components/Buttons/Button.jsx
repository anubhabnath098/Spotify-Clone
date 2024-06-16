import React from 'react';
import './Button.css';
import { NavLink } from 'react-router-dom';

export default function Button({ url, text }) {
  return (
    <div>
      <NavLink
        to={url}
        className={({ isActive }) => (isActive ? 'btn active' : 'btn')}
      >
        {text}
      </NavLink>
    </div>
  );
}
