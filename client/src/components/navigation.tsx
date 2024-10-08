import { NavLink } from "react-router-dom";

export default function Navigation() {
    return (
        <div className="header">
            <h1>WhatToDo</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Tasks">Tasks</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}