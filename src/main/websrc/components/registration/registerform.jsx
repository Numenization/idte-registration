import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Attendee from '../../data/attendee.js';
class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '_',
      firstName: '',
      lastName: '',
      email: '',
      nickname: '',
      phone: '',
      cell: '',
      company: '',
      city: '',
      country: '',
      errors: []
    };
    this.getRegStatus = this.getRegStatus.bind(this);
    this.req = this.req.bind(this);
    this.closeError = this.closeError.bind(this);
    this.addError = this.addError.bind(this);
    this.removeError = this.removeError.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  async getRegStatus() {
    let res = await Attendee.req(
      'GET',
      '/idte/getRegistrationStatus',
      this.state
    );
    this.setState({
      type: res.type
    });
    document.getElementById('mytype').innerText = this.state.type;
  }

  async componentDidMount() {
    this.getRegStatus();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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

  async register() {
    for (let i = 0; i < this.state.errors.length; i++) {
      this.removeError(0);
    }
    try {
      await this.req('POST', '/idte/attendees', {
        type: this.state.type,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        nickname: this.state.nickname,
        phone: this.state.phone,
        cell: this.state.cell,
        company: this.state.company,
        city: this.state.city,
        country: this.state.country
      });
      //window.location.href = 'http://localhost:8080/idte/index.html';
    } catch (e) {
      console.log(e.errors);
      for (const error of e.errors) {
        console.log(error);
        this.addError(error);
      }
    }
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
          <div className='admin-form-errors'>
            {this.state.errors.map((error, i) => {
              return (
                <ErrorTag onClose={this.closeError} key={i} index={i}>
                  {error.message.replace(/ *\[[^)]*\] */g, '')}
                </ErrorTag>
              );
            })}
          </div>
          <div className='registration-form'>
            <form>
              <label>Attendee Type:</label>
              <span id='mytype'></span>

              <label>*First/Given Name:</label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                onChange={this.handleChange}
              ></input>

              <label>*Last/Family Name: </label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                onChange={this.handleChange}
              ></input>

              <label>*Email Address:</label>
              <input
                type='text'
                id='email'
                name='email'
                onChange={this.handleChange}
              ></input>

              <label>Nickname (What you prefer to be called):</label>
              <input
                type='text'
                id='nickname'
                name='nickname'
                onChange={this.handleChange}
              ></input>

              <label>*Phone Number:</label>
              <input
                type='text'
                id='phone'
                name='phone'
                onChange={this.handleChange}
              ></input>

              <label>Cell Number (For use to contact during event):</label>
              <input
                type='text'
                id='cell'
                name='cell'
                onChange={this.handleChange}
              ></input>

              <label>*Company:</label>
              <input
                type='text'
                id='company'
                name='company'
                onChange={this.handleChange}
              ></input>

              <label>*City:</label>
              <input
                type='text'
                id='city'
                name='city'
                onChange={this.handleChange}
              ></input>

              <label>*Country:</label>
              <input
                type='text'
                id='country'
                name='country'
                onChange={this.handleChange}
              ></input>
            </form>
            <button>Submit Registration</button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<FormPage />, document.getElementById('app'));
