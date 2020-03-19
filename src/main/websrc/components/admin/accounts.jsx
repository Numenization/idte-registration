import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import ErrorTag from '../general/error.jsx';
import '../../css/styles.css';
import '../../css/accounts.css';
import Attendee from '../../data/attendee.js';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };

    this.submit = this.submit.bind(this);
    this.closeError = this.closeError.bind(this);
    this.addError = this.addError.bind(this);
    this.removeError = this.removeError.bind(this);
    this.validate = this.validate.bind(this);
  }

  async submit() {
    this.setState({ errors: [] });
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
      await Attendee.req('POST', '/idte/admin/admins', requestBody);

      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      document.getElementById('email').value = '';
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
    if (password.search('/d/') == -1) {
      this.addError({ message: 'Password must have at least one number!' });
      errors = true;
    }
    if (password.search('/[a-zA-Z]/') == -1) {
      this.addError({ message: 'Password must have at least one letter!' });
      errors = true;
    }
    if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
      this.addError({ message: 'Password contains invalid characters!' });
      errors = true;
    }
    return errors;
  }

  render() {
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
          <h1>Edit Administrative Accounts</h1>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<AccountPage />, document.getElementById('app'));
