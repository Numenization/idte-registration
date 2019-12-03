import React from "react";
import { NavLink } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <ul>
          <li>
            <a href='index.html'>Home</a>
          </li>

          <li>
            <a href='registerwaiver.html'>Register</a>
          </li>

          <li>
            <a href='index.html'>Technology<br/>Submission </a>
          </li>

          <li>
            <a id='tiered' href='index.html'>Information</a>

            <div className="navbar-second-tier">
              <ul>
                <li>
                  <a href='index.html'>Event Info/FAQ</a>
                </li>
                <li>
                  <a href='index.html'>Event Map</a>
                </li>
                <li>
                  <a href='index.html'>Display Layout</a>
                </li>
                <li>
                  <a href='index.html'>Contact IDTE</a>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <a href='index.html'>Admin</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
