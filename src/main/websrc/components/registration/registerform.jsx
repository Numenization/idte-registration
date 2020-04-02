import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import ErrorTag from '../general/error.jsx';
import '../../css/styles.css';
import '../../css/registerform.css';
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
      errors: [],
      eventDates: [],
      technologies: [],
      showDropdowns: []
    };
    this.getRegStatus = this.getRegStatus.bind(this);
    this.req = this.req.bind(this);
    this.closeError = this.closeError.bind(this);
    this.addError = this.addError.bind(this);
    this.removeError = this.removeError.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
    this.getEventDates = this.getEventDates.bind(this);
    this.getTechnologies = this.getTechnologies.bind(this);
  }

  async getRegStatus() {
    let res = await this.req('GET', '/idte/getRegistrationStatus');
    this.setState({
      type: res.type
    });
    document.getElementById('mytype').innerText = this.state.type;
  }

  async getEventDates() {
    let res = await this.req('GET', '/idte/eventDates');
    this.setState({ eventDates: res.status.split(',') });
  }

  async getTechnologies() {
    let res = await this.req('GET', '/idte/technologies');
    this.setState({ technologies: res.status });
  }

  async componentDidMount() {
    this.getRegStatus();
    this.getEventDates();
    this.getTechnologies();
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

    let dateString = '';
    let dateSelectRows = document.getElementsByClassName(
      'date-tech-selector-row'
    );

    for (let element of dateSelectRows) {
      if (!element.childNodes) continue;

      let checkbox = element.childNodes[0];
      let select = element.childNodes[2];

      if (!checkbox.checked) continue;
      if (select.value != '-- select a technology --') {
        dateString = dateString + ',' + element.id + ':' + select.value;
      } else {
        this.addError({
          message: 'Select a technology for ' + element.id + '!'
        });
        return;
      }
    }

    if (dateString.length == 0) {
      this.addError({
        message: 'Select some dates to attend!'
      });
      return;
    }

    dateString = dateString.substring(1);

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
        country: this.state.country,
        dateString: dateString
      });
    } catch (e) {
      for (const error of e.errors) {
        this.addError(error);
      }
    }
    
    //Generate QR Code
    try {
      await this.req('POST', '/idte/MakeQRCode', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      });
    } catch (e) {
      for (const error of e.errors) {
        this.addError(error);
      }
    }

    let outmessage = "Thank you for registering for the Ford IDTE event, " 
    + "attached below is your QRCode which will be used to identify you at check in."
    

    // TODO: show that this is working somehow
    //Send email
    try {
      await this.req('POST', '/idte/emailqr', {
        subject: "Ford IDTE: Registration Confirmation",
        body: outmessage,
        to: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      });
      window.location.href = 'http://localhost:8080/idte/index.html';
    } catch (e) {
      for (const error of e.errors) {
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
              <h1>IDTE Registration</h1>

              <p>Please fill out the required information</p>

              <label>Attendee Type:</label>
              <span id='mytype'></span>

              <h3>Attendee Information</h3>

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
              <div className='date-tech-selector' id='date-tech-selector'>
                <h3>Dates of Attendance</h3>
                <p>
                  Select the days you wish to attend, as well as the technology
                  you wish to participate with on that day
                </p>
                <p>
                  Read the FAQ under the information tab to see what dates
                  coorespond with the type of activity to be performed on that
                  day (setup, dry run, presentations, etc..)
                </p>
                {this.state.eventDates.map((date, i) => {
                  return (
                    <div className='date-tech-selector-row' key={i} id={date}>
                      <input type='checkbox' id='checkbox'></input>
                      <label>{date}</label>
                      <select
                        defaultValue='-- select a technology --'
                        id='dropdown'
                      >
                        <option disabled value='-- select a technology --'>
                          -- select a technology --
                        </option>
                        {this.state.technologies.map((tech, k) => {
                          return (
                            <option key={k} value={tech}>
                              {tech}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  );
                })}
              </div>
            </form>
            <button onClick={this.register}>Submit Registration</button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<FormPage />, document.getElementById('app'));
