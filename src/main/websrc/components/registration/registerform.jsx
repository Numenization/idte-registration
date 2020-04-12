import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import ErrorTag from '../general/error.jsx';
import '../../css/styles.css';
import '../../css/registerform.css';
import { DateSelector, TechDropdown } from '../general/registerhelpers.jsx';
import Technology from '../../data/technologies.js';
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
      setup1: '',
      setup2: '',
      setup3: '',
      dryRun: '',
      event1: '',
      event2: '',
      event3: '',
      event4: '',
      event5: '',
      setup1Tech: '',
      setup2Tech: '',
      setup3Tech: '',
      dryRunTech: '',
      event1Tech: '',
      event2Tech: '',
      event3Tech: '',
      event4Tech: '',
      event5Tech: '',
      errors: [],
      eventDates: [],
      technologies: [],
      showDropdowns: [],
      categories: [],
      checkedOption: '',
      category1: '',
      category2: '',
      category3: '',
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
    this.dateSelectorUpdate = this.dateSelectorUpdate.bind(this);
    this.dateSelectorUpdateEvaluator = this.dateSelectorUpdateEvaluator.bind(
      this
    );
    this.dateSelectorEvaluatorClick = this.dateSelectorEvaluatorClick.bind(
      this
    );
    this.getTechCategories = this.getTechCategories.bind(this);
  }

  async getTechCategories() {
    var categories = await Technology.getCategories();
    this.setState({ categories: categories });
  }

  async getRegStatus() {
    let res = await this.req('GET', '/idte/getRegistrationStatus');
    this.setState({
      type: res.type,
    });
    if (res.type == 'supplier') {
      document.getElementById('mytype').innerText = 'Supplier';
    } else if (res.type == 'evaluator') {
      document.getElementById('mytype').innerText = 'Evaluator';
    } else if (res.type == 'presenter') {
      document.getElementById('mytype').innerText = 'Presenter';
    } else {
      document.getElementById('mytype').innerText = '';
    }
  }

  async getEventDates() {
    let res = await this.req('GET', '/idte/eventDateDetails');
    this.setState({ eventDates: res });
  }

  async getTechnologies() {
    let res = await this.req('GET', '/idte/technologies');
    this.setState({ technologies: res.status });
  }

  async componentDidMount() {
    this.getRegStatus();
    this.getEventDates();
    this.getTechnologies();
    this.getTechCategories();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  dateSelectorEvaluatorClick(e) {
    const div = e.target.parentNode;
    const checkbox = div.childNodes[0];
    const label = div.childNodes[1];
    let date = label.id;
    let value = checkbox.value;
    let otherValues = ['event1', 'event2', 'event3', 'event4', 'event5'];
    let found = otherValues.indexOf(value);
    otherValues.splice(found, 1);
    let stateObj = {
      [value]: date,
    };
    for (let s of otherValues) {
      stateObj[s] = '';
    }
    this.setState(stateObj, () => {
      this.setState({ checkedOption: value });
    });
  }

  dateSelectorUpdateEvaluator(e) {
    /*
    const div = e.target.parentNode;
    const checkbox = div.childNodes[0];
    const label = div.childNodes[1];
    const name = div.id;

    let value = checkbox.value;
    let checked = value == this.state.checkedOption;
    console.log(checked);
    if (!checked) date = '';
    this.setState({ [name]: date });
    */
  }

  dateSelectorUpdate(e) {
    const div = e.target.parentNode;
    const checkbox = div.childNodes[0];
    const label = div.childNodes[1];
    const dropdown = div.childNodes[2];
    const name = div.id;
    const techName = name + 'Tech';
    let date = label.id;
    let techId = dropdown.value;
    let checked = checkbox.checked;
    if (techId == '-- select a technology --') techId = '';
    if (!checked) date = '';
    this.setState({ [name]: date, [techName]: techId });
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

    let outmessage =
      'Thank you for registering for the Ford IDTE event, ' +
      'attached below is your QRCode which will be used to identify you at check in.';

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
        setup1: this.state.setup1,
        setup2: this.state.setup2,
        setup3: this.state.setup3,
        dryRun: this.state.dryRun,
        event1: this.state.event1,
        event2: this.state.event2,
        event3: this.state.event3,
        event4: this.state.event4,
        event5: this.state.event5,
        setup1Tech: this.state.setup1Tech,
        setup2Tech: this.state.setup2Tech,
        setup3Tech: this.state.setup3Tech,
        dryRunTech: this.state.dryRunTech,
        event1Tech: this.state.event1Tech,
        event2Tech: this.state.event2Tech,
        event3Tech: this.state.event3Tech,
        event4Tech: this.state.event4Tech,
        event5Tech: this.state.event5Tech,
        category1: this.state.category1,
        category2: this.state.category2,
        category3: this.state.category3,
        subject: 'Ford IDTE: Registration Confirmation',
        body: outmessage,
      });
      window.location.href = '/idte/thankyou.html';
    } catch (e) {
      for (const error of e.errors) {
        this.addError(error);
      }
    }

    // // TODO: show that this is working somehow
    // //Send email
    // try {
    //   this.req('POST', '/idte/emailqr', {
    //     subject: 'Ford IDTE: Registration Confirmation',
    //     body: outmessage,
    //     to: this.state.email,
    //     firstName: this.state.firstName,
    //     lastName: this.state.lastName,
    //     email: this.state.email,
    //   });
    //   window.location.href = '/idte/thankyou.html';
    // } catch (e) {
    //   for (const error of e.errors) {
    //     this.addError(error);
    //   }
    // }
  }

  async req(method, url, opts = null) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response ? JSON.parse(xhr.response) : null);
        } else {
          reject({
            status: this.status,
            errors: xhr.response ? JSON.parse(xhr.response) : null,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      };
      xhr.send(JSON.stringify(opts));
    }).catch((err) => {
      throw err;
    });
  }

  render() {
    const phoneDisabled = this.state.type == 'evaluator' ? 'hidden' : '';
    const companyDisabled =
      this.state.type == 'presenter' || this.state.type == 'evaluator'
        ? 'hidden'
        : '';

    const categories = this.state.categories;

    const selector =
      this.state.type == 'supplier' || this.state.type == 'presenter' ? (
        <div className='date-tech-selector' id='date-tech-selector'>
          <h3>Dates of Attendance</h3>
          <p>
            Select the days you wish to attend, as well as the technology you
            wish to participate with on that day
          </p>
          <p>
            Read the FAQ under the information tab to see what dates coorespond
            with the type of activity to be performed on that day (setup, dry
            run, presentations, etc..)
          </p>
          <div className='date-tech-selector-row' id='setup1'>
            <input
              type='checkbox'
              id='checkbox-setup1'
              onChange={this.dateSelectorUpdate}
            ></input>
            <label htmlFor='checkbox-setup1' id={this.state.eventDates.setUp1}>
              Setup Day 1: {this.state.eventDates.setUp1}
            </label>
            <TechDropdown
              id='dropdown-setup1'
              technologies={this.state.technologies}
              onChange={this.dateSelectorUpdate}
            ></TechDropdown>
          </div>
          <div className='date-tech-selector-row' id='setup2'>
            <input
              type='checkbox'
              id='checkbox-setup2'
              onChange={this.dateSelectorUpdate}
            ></input>
            <label htmlFor='checkbox-setup2' id={this.state.eventDates.setUp2}>
              Setup Day 2: {this.state.eventDates.setUp2}
            </label>
            <TechDropdown
              id='dropdown-setup2'
              technologies={this.state.technologies}
              onChange={this.dateSelectorUpdate}
            ></TechDropdown>
          </div>
          <div className='date-tech-selector-row' id='setup3'>
            <input
              type='checkbox'
              id='checkbox-setup3'
              onChange={this.dateSelectorUpdate}
            ></input>
            <label htmlFor='checkbox-setup3' id={this.state.eventDates.setUp3}>
              Setup Day 3: {this.state.eventDates.setUp3}
            </label>
            <TechDropdown
              id='dropdown-setup3'
              technologies={this.state.technologies}
              onChange={this.dateSelectorUpdate}
            ></TechDropdown>
          </div>
          <div className='date-tech-selector-row' id='dryRun'>
            <input
              type='checkbox'
              id='checkbox-dryrun'
              onChange={this.dateSelectorUpdate}
            ></input>
            <label htmlFor='checkbox-dryrun' id={this.state.eventDates.dryRun}>
              Dry Run Day: {this.state.eventDates.dryRun}
            </label>
            <TechDropdown
              id='dropdown-dryrun'
              technologies={this.state.technologies}
              onChange={this.dateSelectorUpdate}
            ></TechDropdown>
          </div>
          <div className='date-tech-selector-row' id='event1'>
            <input
              type='checkbox'
              id='checkbox-event1'
              onChange={this.dateSelectorUpdate}
            ></input>
            <label
              htmlFor='checkbox-event1'
              id={this.state.eventDates.eventDay1}
            >
              Event Day 1: {this.state.eventDates.eventDay1}
            </label>
            <TechDropdown
              id='dropdown-event1'
              technologies={this.state.technologies}
              onChange={this.dateSelectorUpdate}
            ></TechDropdown>
          </div>
          <div className='date-tech-selector-row' id='event2'>
            <input
              type='checkbox'
              id='checkbox-event2'
              onChange={this.dateSelectorUpdate}
            ></input>
            <label
              htmlFor='checkbox-event2'
              id={this.state.eventDates.eventDay2}
            >
              Event Day 2: {this.state.eventDates.eventDay2}
            </label>
            <TechDropdown
              id='dropdown-event1'
              technologies={this.state.technologies}
              onChange={this.dateSelectorUpdate}
            ></TechDropdown>
          </div>
          <div className='date-tech-selector-row' id='event3'>
            <input
              type='checkbox'
              id='checkbox-event3'
              onChange={this.dateSelectorUpdate}
            ></input>
            <label
              htmlFor='checkbox-event3'
              id={this.state.eventDates.eventDay3}
            >
              Event Day 3: {this.state.eventDates.eventDay3}
            </label>
            <TechDropdown
              id='dropdown-event1'
              technologies={this.state.technologies}
              onChange={this.dateSelectorUpdate}
            ></TechDropdown>
          </div>
          <div className='date-tech-selector-row' id='event4'>
            <input
              type='checkbox'
              id='checkbox-event4'
              onChange={this.dateSelectorUpdate}
            ></input>
            <label
              htmlFor='checkbox-event4'
              id={this.state.eventDates.eventDay4}
            >
              Event Day 4: {this.state.eventDates.eventDay4}
            </label>
            <TechDropdown
              id='dropdown-event1'
              technologies={this.state.technologies}
              onChange={this.dateSelectorUpdate}
            ></TechDropdown>
          </div>
          <div className='date-tech-selector-row' id='event5'>
            <input
              type='checkbox'
              id='checkbox-event5'
              onChange={this.dateSelectorUpdate}
            ></input>
            <label
              htmlFor='checkbox-event5'
              id={this.state.eventDates.eventDay5}
            >
              Event Day 5: {this.state.eventDates.eventDay5}
            </label>
            <TechDropdown
              id='dropdown-event1'
              technologies={this.state.technologies}
              onChange={this.dateSelectorUpdate}
            ></TechDropdown>
          </div>
        </div>
      ) : (
        <div className='evaluator-selector'>
          <h3>Attendance</h3>
          <p>
            Pick the day you wish to attend, as well as your top three picks for
            the types of technologies you wish to see.
          </p>
          <p>
            There is no gaurantee that your top pick for the technology
            categories will be ran during the event.
          </p>
          <div className='date-tech-selector-row' id='event1'>
            <input
              type='radio'
              id='radio-event1'
              onChange={this.dateSelectorUpdateEvaluator}
              onClick={this.dateSelectorEvaluatorClick}
              value='event1'
              checked={this.state.checkedOption == 'event1'}
            ></input>
            <label htmlFor='radio-event1' id={this.state.eventDates.eventDay1}>
              Event Day 1: {this.state.eventDates.eventDay1}
            </label>
          </div>
          <div className='date-tech-selector-row' id='event2'>
            <input
              type='radio'
              id='radio-event2'
              onChange={this.dateSelectorUpdateEvaluator}
              onClick={this.dateSelectorEvaluatorClick}
              value='event2'
              checked={this.state.checkedOption == 'event2'}
            ></input>
            <label htmlFor='radio-event2' id={this.state.eventDates.eventDay2}>
              Event Day 2: {this.state.eventDates.eventDay2}
            </label>
          </div>
          <div className='date-tech-selector-row' id='event3'>
            <input
              type='radio'
              id='radio-event3'
              onChange={this.dateSelectorUpdateEvaluator}
              onClick={this.dateSelectorEvaluatorClick}
              value='event3'
              checked={this.state.checkedOption == 'event3'}
            ></input>
            <label htmlFor='radio-event3' id={this.state.eventDates.eventDay3}>
              Event Day 3: {this.state.eventDates.eventDay3}
            </label>
          </div>
          <div className='date-tech-selector-row' id='event4'>
            <input
              type='radio'
              id='radio-event4'
              onChange={this.dateSelectorUpdateEvaluator}
              onClick={this.dateSelectorEvaluatorClick}
              value='event4'
              checked={this.state.checkedOption == 'event4'}
            ></input>
            <label htmlFor='radio-event4' id={this.state.eventDates.eventDay4}>
              Event Day 4: {this.state.eventDates.eventDay4}
            </label>
          </div>
          <div className='date-tech-selector-row' id='event5'>
            <input
              type='radio'
              id='radio-event5'
              onChange={this.dateSelectorUpdateEvaluator}
              onClick={this.dateSelectorEvaluatorClick}
              value='event5'
              checked={this.state.checkedOption == 'event5'}
            ></input>
            <label htmlFor='radio-event5' id={this.state.eventDates.eventDay5}>
              Event Day 5: {this.state.eventDates.eventDay5}
            </label>
          </div>
          <div className='category-selector-row' id='categories'>
            <select
              id='category1'
              name='category1'
              defaultValue='-- select a category --'
              onChange={(e) => {
                this.setState({ category1: e.target.value });
              }}
            >
              <option disabled value='-- select a category --'>
                -- select a category --
              </option>
              {categories.map((category, i) => {
                return (
                  <option key={i} id={category.id} value={this.category}>
                    {category.category}
                  </option>
                );
              })}
            </select>
            <select
              id='category2'
              name='category2'
              defaultValue='-- select a category --'
              onChange={(e) => {
                this.setState({ category2: e.target.value });
              }}
            >
              <option disabled value='-- select a category --'>
                -- select a category --
              </option>
              {categories.map((category, i) => {
                return (
                  <option key={i} id={category.id} value={this.category}>
                    {category.category}
                  </option>
                );
              })}
            </select>
            <select
              id='category3'
              name='category3'
              defaultValue='-- select a category --'
              onChange={(e) => {
                this.setState({ category3: e.target.value });
              }}
            >
              <option disabled value='-- select a category --'>
                -- select a category --
              </option>
              {categories.map((category, i) => {
                return (
                  <option key={i} id={category.id} value={this.category}>
                    {category.category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      );
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

              <label hidden={phoneDisabled}>*Phone Number:</label>
              <input
                type='text'
                id='phone'
                name='phone'
                onChange={this.handleChange}
                hidden={phoneDisabled}
              ></input>

              <label>Cell Number (For use to contact during event):</label>
              <input
                type='text'
                id='cell'
                name='cell'
                onChange={this.handleChange}
              ></input>

              <label hidden={companyDisabled}>*Company:</label>
              <input
                type='text'
                id='company'
                name='company'
                onChange={this.handleChange}
                hidden={companyDisabled}
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
              {selector}
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
