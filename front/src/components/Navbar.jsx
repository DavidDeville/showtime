import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          showtime
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/concerts">
                Concerts
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/groupes">
                Groupes
              </NavLink>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink to="/login">
              <button type="button" className="btn btn-outline-success">
                Login
              </button>
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <button type="button" className="btn btn-outline-danger">
              Register
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
