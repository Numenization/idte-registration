import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import ErrorTag from '../general/error.jsx';
import '../../css/styles.css';
import '../../css/accounts.css';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      admins: []
    };

    this.submit = this.submit.bind(this);
    this.closeError = this.closeError.bind(this);
    this.addError = this.addError.bind(this);
    this.removeError = this.removeError.bind(this);
    this.validate = this.validate.bind(this);
    this.getAdmins = this.getAdmins.bind(this);
    this.req = this.req.bind(this);
  }

  async submit() {
    for (let i = 0; i < this.state.errors.length; i++) {
      this.removeError(0);
    }
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;

    if (this.validate(username, password, email)) {
      return;
    }

    let requestBody = {
      name: username,
      pass: password,
      email: email
    };

    try {
      await this.req('POST', '/idte/admin/admins', requestBody);

      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      document.getElementById('email').value = '';
      this.getAdmins();
    } catch (e) {
      if (e.errors) {
        console.log(e.errors);
        for (const error of e.errors) {
          console.log(error);
          this.addError(error);
        }
      }
    }
  }

  closeError(e) {
    let error = e.target.parentNode.parentNode;
    console.log(error);
    let errorKey = error.id;

    if (!errorKey) {
      console.log('Key not set in error properly');
      return;
    }

    this.removeError(errorKey);
  }

  addError(error) {
    let newErrors = this.state.errors;
    newErrors.push(error);

    this.setState({ errors: newErrors });
  }

  removeError(errorKey) {
    let newErrors = this.state.errors;
    newErrors.splice(errorKey, 1);

    this.setState({ errors: newErrors });
  }

  validate(username, password, email) {
    let errors = false;
    if (username.length == 0) {
      this.addError({ message: 'Please fill out a username' });
      errors = true;
    }
    if (username.length > 50) {
      this.addError({ message: 'Username must be less than 50 characters!' });
      errors = true;
    }
    if (email.length == 0) {
      this.addError({ message: 'Please fill out an email address' });
      errors = true;
    }
    if (email.length > 100) {
      this.addError({ message: 'Username must be less than 100 characters!' });
      errors = true;
    }
    if (password.length < 6) {
      this.addError({
        message: 'Password must be at least 6 characters long!'
      });
      errors = true;
    }
    if (password.length > 50) {
      this.addError({
        message: 'Password must be less than 50 characters long!'
      });
      errors = true;
    }
    if (password.search(/[0-9]{1}/) == -1) {
      this.addError({ message: 'Password must have at least one number!' });
      errors = true;
    }
    if (password.search(/[a-zA-Z]{1}/) == -1) {
      this.addError({ message: 'Password must have at least one letter!' });
      errors = true;
    }
    if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
      this.addError({ message: 'Password contains invalid characters!' });
      errors = true;
    }
    return errors;
  }

  async getAdmins() {
    let admins = await this.req('GET', '/idte/admin/admins/all');

    this.setState({ admins: admins });
  }

  async req(method, url, opts = null) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response ? JSON.parse(xhr.response) : null);
        } else {
          reject({
            status: this.status,
            errors: xhr.response ? JSON.parse(xhr.response) : null
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

  async componentDidMount() {
    this.getAdmins();
  }

  render() {
    const buttonStyles = {
      width: '100%'
    };
    return (
      <div className='container'>
        <div className='background'>
          <img src={require('../../images/main.jpg')}></img>
        </div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <h1>Create Administrative Account</h1>
          <div className='admin-form-errors'>
            {this.state.errors.map((error, i) => {
              return (
                <ErrorTag onClose={this.closeError} key={i} index={i}>
                  {error.message.replace(/ *\[[^)]*\] */g, '')}
                </ErrorTag>
              );
            })}
          </div>
          <div className='admin-form'>
            <label htmlFor='username'>Username:</label>
            <input id='username' type='text'></input>
            <label htmlFor='email'>Email Address:</label>
            <input id='email' type='text'></input>
            <label htmlFor='password'>Password:</label>
            <input id='password' type='password'></input>
            <button id='link-button' onClick={this.submit}>
              Submit
            </button>
          </div>
          <h1>Administrative Accounts</h1>
          <div className='admin-account'>
            <table>
              <thead>
                <tr>
                  <td>Username</td>
                  <td>Email</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {this.state.admins.map((admin, i) => {
                  return (
                    <tr key={i} id={admin.id}>
                      <td>{admin.username}</td>
                      <td>{admin.email}</td>
                      <td id={admin.username}>
                        <button
                          id='link-button'
                          style={buttonStyles}
                          onClick={async e => {
                            let confirm = window.confirm(
                              'Really delete ' + e.target.parentNode.id + '?'
                            );
                            if (!confirm) return;
                            let row = e.target.parentNode.parentNode;
                            let id = row.id;

                            try {
                              await this.req('DELETE', '/idte/admin/admins', {
                                id: id
                              });
                            } catch (e) {
                              console.log(e);
                            }

                            this.getAdmins();
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<AccountPage />, document.getElementById('app'));
