
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          WhatToDo
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-secondary" : "text-white")}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Tasks"
              className={({ isActive }) => (isActive ? "text-secondary" : "text-white")}
            >
              Tasks
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
