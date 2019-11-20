import React from "react";
import { NavLink } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/register/waiver" activeClassName="active">
              Register
            </NavLink>
          </li>

          <li>
            <NavLink to="/technologies" activeClassName="active">
              Technology Submission
            </NavLink>
          </li>

          <li>
            <NavLink id="tiered" to="/info" activeClassName="active">
              Information
            </NavLink>

            <div className="navbar-second-tier">
              <ul>
                <li>
                  <NavLink to="/info/faq">Event Info/FAQ</NavLink>
                </li>
                <li>
                  <NavLink to="/info/map">Event Map</NavLink>
                </li>
                <li>
                  <NavLink to="/info/display">Display Layout</NavLink>
                </li>
                <li>
                  <NavLink className="last" to="/info/contact">
                    Contact IDTE
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <NavLink to="/admin" activeClassName="active">
              Admin
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
