import React from 'react';
import Event from '../data/changeregistration.js';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTechSub: false,
      showReg: false,
      showAdmin: false
    };

    this.req = this.req.bind(this);
  }

  async componentDidMount() {
    (await this.req('GET', '/idte/navbar')) == 'ROLE_ADMIN'
      ? this.setState({ showAdmin: true })
      : this.setState({ showAdmin: false });
    (await Event.getTechStatus()).status == 'true'
      ? this.setState({ showTechSub: true })
      : this.setState({ showTechSub: false });
    (await Event.getRegStatus()).status == 'true'
      ? this.setState({ showReg: true })
      : this.setState({ showReg: false });
  }

  async req(method, url, opts = null) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response ? xhr.response : null);
        } else {
          reject({
            status: this.status,
            errors: xhr.response
          });
        }
      };
      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send(JSON.stringify(opts));
    }).catch(err => {
      throw err;
    });
  }

  render() {
    const admin = this.state.showAdmin ? (
      <li>
        <a href='/idte/admin/admin.html'>Admin</a>
      </li>
    ) : null;

    const tech = this.state.showTechSub ? (
      <li>
        <a href='/idte/technologyform.html'>
          Technology
          <br />
          Submission
        </a>
      </li>
    ) : null;

    const reg = this.state.showReg ? (
      <li>
        <a href='/idte/registration.html'>Register</a>
      </li>
    ) : null;

    return (
      <div className='navbar'>
        <ul>
          <li>
            <a href='/idte/index.html'>Home</a>
          </li>
          {tech}
          {reg}
          <li>
            <a id='tiered' href='/idte/info.html'>
              Information
            </a>

            <div className='navbar-second-tier'>
              <ul>
                <li>
                  <a href='/idte/faq.html'>Event Info/FAQ</a>
                </li>
                <li>
                  <a href='/idte/map.html'>Event Map</a>
                </li>
                <li>
                  <a href='/idte/eventlayout.html'>Display Layout</a>
                </li>
                <li>
                  <a href='/idte/contact.html'>Contact IDTE</a>
                </li>
              </ul>
            </div>
          </li>
          {admin}
        </ul>
      </div>
    );
  }
}

export default NavBar;
