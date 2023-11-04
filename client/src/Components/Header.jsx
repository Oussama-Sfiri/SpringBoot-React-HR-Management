import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div>
                  <NavLink className="navbar-brand" to="/">Employee Management App</NavLink>
                  <NavLink className="active" to="/employees">Employees</NavLink>
                  <NavLink className="active" to="/add-employee">Add Employee</NavLink>
                </div>
            </nav>
        </header>
    </div>
  );
};

export default Header;