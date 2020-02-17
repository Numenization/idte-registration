import React from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <div className='navbar'>
        <ul>
          <li>
            <a href='index.html'>Home</a>
          </li>

          <li>
            <a href='technologywaiver.html'>
              Technology
              <br />
              Submission
            </a>
          </li>

          <li>
            <a href='registration.html'>Register</a>
          </li>

          <li>
            <a id='tiered' href='info.html'>
              Information
            </a>

            <div className='navbar-second-tier'>
              <ul>
                <li>
                  <a href='faq.html'>Event Info/FAQ</a>
                </li>
                <li>
                  <a href='map.html'>Event Map</a>
                </li>
                <li>
                  <a href='eventlayout.html'>Display Layout</a>
                </li>
                <li>
                  <a href='contact.html'>Contact IDTE</a>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <a href='admin.html'>Admin</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
