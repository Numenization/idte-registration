import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import { Table, TableRow } from '../general/table.jsx';
import '../../css/styles.css';
import Modal from '../general/modal.jsx';
import Attendee from '../../data/attendee.js';
import { DateSelector, TechDropdown } from '../general/registerhelpers.jsx';
import '../../css/registerform.css';

class DatabasePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendees: [],
      error: null,
      selectedUser: null,
      loading: false,
      showEditModal: false,
      showAddModal: false,
      rowsPerPage: 10,
      numPages: 0,
      page: 0,
      attendeesOnPage: [],
      sortBy: null,
      search: '',
      eventDates: [],
      technologies: [],
    };

    this.getAttendees = this.getAttendees.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.rowClick = this.rowClick.bind(this);
    this.setError = this.setError.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.setData = this.setData.bind(this);
    this.setNumPages = this.setNumPages.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setRowsPerPage = this.setRowsPerPage.bind(this);
    this.setAttendeesOnPage = this.setAttendeesOnPage.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.updateField = this.updateField.bind(this);
    this.clearUserValues = this.clearUserValues.bind(this);
    this.postNewUser = this.postNewUser.bind(this);
    this.pageButtonClick = this.pageButtonClick.bind(this);
    this.updateExistingUser = this.updateExistingUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getRows = this.getRows.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.generatePaginationButtons = this.generatePaginationButtons.bind(this);
    this.runChild = this.runChild.bind(this);
    this.sortAttendees = this.sortAttendees.bind(this);
    this.getEventDates = this.getEventDates.bind(this);
    this.getTechnologies = this.getTechnologies.bind(this);
    this.req = this.req.bind(this);
    this.updateDateString = this.updateDateString.bind(this);
    this.dateSelectorUpdate = this.dateSelectorUpdate.bind(this);
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

  dateSelectorUpdate(e) {
    const div = e.target.parentNode;
    const checkbox = div.childNodes[0];
    const label = div.childNodes[1];
    const dropdown = div.childNodes[2];
    const name = div.id;
    let techName = name + 'Tech';
    let date = label.id;
    let checked = checkbox.checked;

    if (!checked) {
      dropdown.value = '-- select a technology --';
      date = '';
    }
    let techId = dropdown.value;
    if (techId == '-- select a technology --') techId = 0;

    this.setState({ [name]: date, [techName]: techId });
  }

  clearUserValues() {
    var values = [
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'cellNumber',
      'city',
      'country',
      'technologyNumber',
      'nickname',
      'company',
      'comments',
      'id',
      'lastModified',
      'dateCreated',
      'modifiedBy',
      'type',
      'setUpOne',
      'setUpTwo',
      'setUpThree',
      'dryRun',
      'eventDayOne',
      'eventDayTwo',
      'eventDayThree',
      'eventDayFour',
      'eventDayFive',
      'setUpOneTech',
      'setUpTwoTech',
      'setUpThreeTech',
      'dryRunTech',
      'eventDayOneTech',
      'eventDayTwoTech',
      'eventDayThreeTech',
      'eventDayFourTech',
      'eventDayFiveTech',
      'setUpOneAttended',
      'setUpTwoAttended',
      'setUpThreeAttended',
      'dryRunAttended',
      'eventDayOneAttended',
      'eventDayTwoAttended',
      'eventDayThreeAttended',
      'eventDayFourAttended',
      'eventDayFiveAttended',
    ];
    for (let property of values) {
      this.setState({ [property]: '' });
    }
  }

  setError(err) {
    this.setState({
      attendees: this.state.attendees,
      error: err,
      selectedUser: this.state.selectedUser,
      loading: this.state.loading,
      showEditModal: this.state.showEditModal,
      showAddModal: this.state.showAddModal,
    });
  }

  setLoading(val) {
    this.setState({
      attendees: this.state.attendees,
      error: this.state.error,
      selectedUser: this.state.selectedUser,
      loading: val,
      showEditModal: this.state.showEditModal,
      showAddModal: this.state.showAddModal,
    });
  }

  setData(val) {
    this.setState({
      attendees: val,
      error: this.state.error,
      selectedUser: this.state.selectedUser,
      loading: this.state.loading,
      showEditModal: this.state.showEditModal,
      showAddModal: this.state.showAddModal,
    });
  }

  setSelected(value, cb) {
    for (let [key, val] of Object.entries(value)) {
      if (val === null) value[key] = undefined;
      this.setState({ [key]: val });
    }
    this.setState(
      {
        attendees: this.state.attendees,
        error: this.state.error,
        selectedUser: value,
        loading: this.state.loading,
        showEditModal: this.state.showEditModal,
        showAddModal: this.state.showAddModal,
      },
      cb
    );
  }

  setNumPages(val) {
    this.setState({ numPages: val });
  }

  setPage(val) {
    // if (val < 0 || val > this.state.numPages - 1) return;
    // var n = val * this.state.rowsPerPage;
    // var m = n + this.state.rowsPerPage;
    // var attendeesToPutOnPage = [];
    // for (var i = n; i < m; i++) {
    //   var attendee = this.state.attendees[i];
    //   if (attendee) attendeesToPutOnPage.push(attendee);
    // }
    this.setState({
      page: val,
    });
    //this.setAttendeesOnPage(attendeesToPutOnPage);
  }

  nextPage() {
    if (this.state.page < this.state.numPages - 1)
      this.setPage(this.state.page + 1);
  }

  prevPage() {
    if (this.state.page > 0) this.setPage(this.state.page - 1);
  }

  setRowsPerPage(val) {
    this.setState({ rowsPerPage: val }, () => {
      var numPages = 0;
      if (this.state.attendees.length > this.state.rowsPerPage) {
        numPages = Math.ceil(
          this.state.attendees.length / this.state.rowsPerPage
        );
      }
      this.setNumPages(numPages);
      this.setPage(0);
    });
  }

  setAttendeesOnPage(val) {
    this.setState({ attendeesOnPage: val });
  }

  toggleEditModal() {
    if (this.state.showEditModal) this.clearUserValues();
    this.setState({
      attendees: this.state.attendees,
      error: this.state.error,
      selectedUser: this.state.selectedUser,
      loading: this.state.loading,
      showEditModal: !this.state.showEditModal,
      showAddModal: this.state.showAddModal,
    });
  }

  toggleAddModal() {
    if (this.state.showAddModal) this.clearUserValues();
    this.setState({
      attendees: this.state.attendees,
      error: this.state.error,
      selectedUser: this.state.selectedUser,
      loading: this.state.loading,
      showEditModal: this.state.showEditModal,
      showAddModal: !this.state.showAddModal,
    });
  }

  async getAttendees() {
    // because suppliers and evaluators cannot be determined from a normal get without some
    // parsing and checking, we're just going to get them separately and append their type to them here

    // set ourselves to loading and start
    this.setLoading(true);

    const opts =
      this.state.search.length > 0 ? { search: this.state.search } : null;

    // call the backend for attendee data
    var suppliers = await Attendee.getAllSuppliers(opts);
    var evaluators = await Attendee.getAllEvaluators(opts);
    var presenters = await Attendee.getAllPresenters(opts);

    if (suppliers.statusText) {
      this.setError(suppliers.statusText);
      this.setLoading(false);
      return;
    }

    if (evaluators.statusText) {
      this.setError(evaluators.statusText);
      this.setLoading(false);
      return;
    }

    Array.prototype.push.apply(evaluators, presenters);
    Array.prototype.push.apply(suppliers, evaluators);

    var numPages = 0;

    if (suppliers.length > this.state.rowsPerPage) {
      numPages = Math.ceil(suppliers.length / this.state.rowsPerPage);
    } else {
      numPages = 1;
    }

    this.setNumPages(numPages);
    this.setData(suppliers);
    this.setPage(0);
    this.setLoading(false);
  }

  async searchAttendees() {
    if (this.state.search.length == 0) return;

    this.setLoading(true);

    var suppliers = await Attendee.getAllSuppliers();
    var evaluators = await Attendee.getAllEvaluators();
    var presenters = await Attendee.getAllPresenters();

    if (suppliers.statusText) {
      this.setError(suppliers.statusText);
      this.setLoading(false);
      return;
    }

    if (evaluators.statusText) {
      this.setError(evaluators.statusText);
      this.setLoading(false);
      return;
    }

    Array.prototype.push.apply(evaluators, presenters);
    Array.prototype.push.apply(suppliers, evaluators);

    var numPages = 0;

    if (suppliers.length > this.state.rowsPerPage) {
      numPages = Math.ceil(suppliers.length / this.state.rowsPerPage);
    } else {
      numPages = 1;
    }

    this.setNumPages(numPages);
    this.setData(suppliers);
    this.setPage(0);
    this.setLoading(false);
  }

  pageButtonClick(e) {
    this.setPage(parseInt(e.target.id));
  }

  rowClick(e) {
    const columnData = JSON.parse(
      e.target.parentElement.getAttribute('data-columns')
    );

    this.setSelected(columnData, () => {
      this.toggleEditModal();
    });
  }

  updateField(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async postNewUser() {
    const selection = document.getElementById('attendee-type');
    if (!selection) return;

    const value = selection.value;
    if (value == 'supplier') {
      await Attendee.postSupplier(
        Attendee.createAttendeeObjectFromState(this.state)
      );
    } else if (value == 'evaluator') {
      await Attendee.postEvaluator(
        Attendee.createAttendeeObjectFromState(this.state)
      );
    } else if (value == 'presenter') {
      await Attendee.postPresenter(
        Attendee.createAttendeeObjectFromState(this.state)
      );
    }

    this.getAttendees();
    this.toggleAddModal();
  }

  async updateExistingUser() {
    await Attendee.updateAttendee(
      Attendee.createAttendeeObjectFromState(this.state)
    );
    this.getAttendees();
    this.toggleEditModal();
  }

  async deleteUser() {
    var response = window.confirm('Are you sure you want to delete this user?');
    if (!response) return;
    await Attendee.deleteAttendee({ email: this.state.email });
    this.getAttendees();
    this.toggleEditModal();
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
    this.getAttendees();
    this.getEventDates();
    this.getTechnologies();
  }

  getRows(dataColumns) {
    if (!this.state.attendees) return null;

    var sortedAttendees = this.sortAttendees(this.state.sortBy);
    var val = this.state.page;

    if (val < 0 || val > this.state.numPages - 1) return;
    var n = val * this.state.rowsPerPage;
    var m = n + this.state.rowsPerPage;
    var attendeesToPutOnPage = [];
    for (var i = n; i < m; i++) {
      var attendee = sortedAttendees[i];
      if (attendee) attendeesToPutOnPage.push(attendee);
    }

    return attendeesToPutOnPage.map((user, key) => {
      return (
        <TableRow
          key={
            key +
            this.state.page * this.state.rowsPerPage +
            this.state.sortBy * 1000
          }
          data={user}
          columns={dataColumns}
          onClick={this.rowClick}
        />
      );
    });
  }

  runChild(fun) {
    return fun();
  }

  generatePaginationButtons(numPages) {
    if (numPages <= 1) return null;
    if (numPages <= 10) {
      return (
        <div className='pagination-buttons'>
          <button className='back-button' onClick={this.prevPage} key='909090'>
            &larr;
          </button>
          {Array.from({ length: this.state.numPages }, (item, index) => {
            var cName = '';
            if (this.state.page == index) {
              cName = 'selected';
            }
            return (
              <button
                className='page-button'
                key={index}
                onClick={this.pageButtonClick}
                id={index}
                className={cName}
              >
                {index + 1}
              </button>
            );
          })}
          <button
            className='forward-button'
            onClick={this.nextPage}
            key='909091'
          >
            &rarr;
          </button>
        </div>
      );
    } else {
      const currentPage = this.state.page;
      return (
        <div className='pagination-buttons'>
          {this.runChild(() => {
            if (currentPage >= 2)
              return (
                <div>
                  <button
                    className='first-button'
                    id='0'
                    onClick={this.pageButtonClick}
                  >
                    First
                  </button>
                  <button className='back-button' onClick={this.prevPage}>
                    &larr;
                  </button>
                  <span> </span>
                  <button
                    key={currentPage - 2}
                    id={currentPage - 2}
                    onClick={this.pageButtonClick}
                  >
                    {currentPage - 1}
                  </button>
                  <button
                    key={currentPage - 1}
                    id={currentPage - 1}
                    onClick={this.pageButtonClick}
                  >
                    {currentPage}
                  </button>
                </div>
              );
          })}
          {this.runChild(() => {
            if (currentPage == 1)
              return (
                <button
                  key={currentPage - 1}
                  id={currentPage - 1}
                  onClick={this.pageButtonClick}
                >
                  {currentPage}
                </button>
              );
          })}
          <button
            className='selected'
            key={currentPage}
            id={currentPage}
            onClick={this.pageButtonClick}
          >
            {currentPage + 1}
          </button>
          {this.runChild(() => {
            if (currentPage == numPages - 2)
              return (
                <button
                  key={currentPage + 1}
                  id={currentPage + 1}
                  onClick={this.pageButtonClick}
                >
                  {currentPage + 2}
                </button>
              );
          })}
          {this.runChild(() => {
            if (currentPage < numPages - 2)
              return (
                <div>
                  <button
                    key={currentPage + 1}
                    id={currentPage + 1}
                    onClick={this.pageButtonClick}
                  >
                    {currentPage + 2}
                  </button>
                  <button
                    key={currentPage + 2}
                    id={currentPage + 2}
                    onClick={this.pageButtonClick}
                  >
                    {currentPage + 3}
                  </button>
                  <span> </span>
                  <button className='forward-button' onClick={this.nextPage}>
                    &rarr;
                  </button>
                  <button
                    className='last-button'
                    id={numPages - 1}
                    onClick={this.pageButtonClick}
                  >
                    Last
                  </button>
                </div>
              );
          })}
        </div>
      );
    }
  }

  updateDateString(e) {
    let element = e.target;
    if (element.id == 'checkbox') {
      // update the cooresponding field to make sure we have valid values
      let dropdown = element.parentElement.childNodes[2];

      if (element.checked) {
        if (dropdown.value == '-- select a technology --') {
          dropdown.selectedIndex = 1;
        }
      } else {
        dropdown.selectedIndex = 0;
      }
    } else if (element.id == 'dropdown') {
      // update the cooresponding field to make sure we have valid values
      let checkbox = element.parentElement.childNodes[0];

      if (element.value != '-- select a technology --') {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    }
    // start generating the date string
    let rawRows = element.parentElement.parentElement.childNodes;
    let rows = [];
    for (let row of rawRows) {
      if (row.tagName == 'DIV') {
        rows.push(row);
      }
    }

    let dateString = '';

    for (let row of rows) {
      let rowCheckbox = row.childNodes[0];
      let rowDropdown = row.childNodes[2];

      if (rowCheckbox.checked) {
        let stringlet = row.id;
        stringlet = stringlet + ':' + rowDropdown.value;

        dateString = dateString + ',' + stringlet;
      }
    }

    if (dateString.length > 0) {
      dateString = dateString.substring(1);
    }

    this.setState({ dateString: dateString });
  }

  sortAttendees(sortBy) {
    const dict = {
      0: 'lastName',
      1: 'firstName',
      2: 'email',
      3: 'type',
      4: 'dateCreated',
      5: 'lastModified',
      6: 'modifiedBy',
      7: 'company',
      8: 'country',
      9: 'city',
    };
    var listToSort = this.state.attendees;

    listToSort.sort((a, b) => (a[dict[sortBy]] > b[dict[sortBy]] ? 1 : -1));
    return listToSort;
  }

  render() {
    if (this.state.error) {
      console.log(this.state.error);
    }

    const tableColumns = [
      'Type',
      'First Name',
      'Last Name',
      'Email',
      'Date Created',
      'Last Modified',
      'Modified By',
    ];

    const dataColumns = [
      'type',
      'firstName',
      'lastName',
      'email',
      'dateCreated',
      'lastModified',
      'modifiedBy',
    ];

    const buttonWidth = {
      width: '30%',
      display: 'inline-block',
      boxSizing: 'border-box',
    };

    const addModalInner = (
      <div>
        <h2>Create New Attendee</h2>
        <label htmlFor='attendee-type'>Attendee Type: </label>
        <select id='attendee-type'>
          <option value='supplier'>Supplier</option>
          <option value='presenter'>Presenter</option>
          <option value='evaluator'>Evaluator</option>
        </select>
        <br />
        <table className='modal-two-col-table'>
          <tbody>
            <tr>
              <td>
                <span>First Name: </span>
                <input
                  type='text'
                  name='firstName'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Last Name: </span>
                <input
                  type='text'
                  name='lastName'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Nickname: </span>
                <input
                  type='text'
                  name='nickname'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Email: </span>
                <input
                  type='text'
                  name='email'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Phone Number: </span>
                <input
                  type='text'
                  name='phoneNumber'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Cell Number: </span>
                <input
                  type='text'
                  name='cellNumber'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Country: </span>
                <input
                  type='text'
                  name='country'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>City: </span>
                <input
                  type='text'
                  name='city'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Company*: </span>
                <input
                  type='text'
                  name='company'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <DateSelector
          id='setUpOne'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Setup Day 1:' + this.state.eventDates.setUp1}
          date={this.state.eventDates.setUp1}
        ></DateSelector>
        <DateSelector
          id='setUpTwo'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Setup Day 2:' + this.state.eventDates.setUp2}
          date={this.state.eventDates.setUp2}
        ></DateSelector>
        <DateSelector
          id='setUpThree'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Setup Day 3:' + this.state.eventDates.setUp3}
          date={this.state.eventDates.setUp3}
        ></DateSelector>
        <DateSelector
          id='dryRun'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Dry Run Day:' + this.state.eventDates.dryRun}
          date={this.state.eventDates.dryRun}
        ></DateSelector>
        <DateSelector
          id='eventDayOne'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Event Day 1:' + this.state.eventDates.eventDay1}
          date={this.state.eventDates.eventDay1}
        ></DateSelector>
        <DateSelector
          id='eventDayTwo'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Event Day 2:' + this.state.eventDates.eventDay2}
          date={this.state.eventDates.eventDay2}
        ></DateSelector>
        <DateSelector
          id='eventDayThree'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Event Day 3:' + this.state.eventDates.eventDay3}
          date={this.state.eventDates.eventDay3}
        ></DateSelector>
        <DateSelector
          id='eventDayFour'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Event Day 4:' + this.state.eventDates.eventDay4}
          date={this.state.eventDates.eventDay4}
        ></DateSelector>
        <DateSelector
          id='eventDayFive'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Event Day 5:' + this.state.eventDates.eventDay5}
          date={this.state.eventDates.eventDay5}
        ></DateSelector>
        <span>Comments:</span>
        <br />
        <textarea
          rows='4'
          cols='50'
          name='comments'
          style={{ resize: 'none', width: '100%' }}
          onChange={this.updateField}
        ></textarea>
        <br />
        <button
          id='link-button'
          style={{
            width: '250px',
            display: 'inline-block',
            boxSizing: 'border-box',
            fontSize: '1em',
            margin: '0.5em 0',
          }}
          onClick={this.postNewUser}
        >
          Post New Attendee
        </button>
        <br />
        <span style={{ fontSize: '0.8em' }}>* - Supplier Only Fields</span>
      </div>
    );

    const selectedUser = this.state.selectedUser;
    const editModalInner = selectedUser ? (
      <div>
        <h2>Edit Attendee</h2>
        <span>Attendee ID: {selectedUser.id}</span>
        <br />
        <span>Attendee Type: {selectedUser.type}</span>
        <br />
        <table className='modal-two-col-table'>
          <tbody>
            <tr>
              <td>
                <span>First Name: </span>
                <input
                  type='text'
                  defaultValue={selectedUser.firstName}
                  name='firstName'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Last Name: </span>
                <input
                  type='text'
                  defaultValue={selectedUser.lastName}
                  name='lastName'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Nickname: </span>
                <input
                  type='text'
                  defaultValue={selectedUser.nickname}
                  name='nickname'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Email: </span>
                <input
                  type='text'
                  defaultValue={selectedUser.email}
                  name='email'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Phone Number: </span>
                <input
                  type='text'
                  defaultValue={selectedUser.phoneNumber}
                  name='phoneNumber'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Cell Number: </span>
                <input
                  type='text'
                  defaultValue={selectedUser.cellNumber}
                  name='cellNumber'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Country: </span>
                <input
                  type='text'
                  defaultValue={selectedUser.country}
                  name='country'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>City: </span>
                <input
                  type='text'
                  defaultValue={selectedUser.city}
                  onChange={this.updateField}
                  name='city'
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Company*: </span>
                <input
                  type='text'
                  defaultValue={selectedUser.company}
                  name='company'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <DateSelector
          id='setUpOne'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Setup Day 1:' + this.state.eventDates.setUp1}
          checked={this.state.setUpOne.length > 0 ? true : false}
          date={this.state.eventDates.setUp1}
          selected={this.state.setUpOneTech}
        ></DateSelector>
        <DateSelector
          id='setUpTwo'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Setup Day 2:' + this.state.eventDates.setUp2}
          checked={this.state.setUpTwo.length > 0 ? true : false}
          date={this.state.eventDates.setUp2}
          selected={this.state.setUpTwoTech}
        ></DateSelector>
        <DateSelector
          id='setUpThree'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Setup Day 3:' + this.state.eventDates.setUp3}
          checked={this.state.setUpThree.length > 0 ? true : false}
          date={this.state.eventDates.setUp3}
          selected={this.state.setUpThreeTech}
        ></DateSelector>
        <DateSelector
          id='dryRun'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Dry Run Day:' + this.state.eventDates.dryRun}
          checked={this.state.dryRun.length > 0 ? true : false}
          date={this.state.eventDates.dryRun}
          selected={this.state.dryRunTech}
        ></DateSelector>
        <DateSelector
          id='eventDayOne'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Event Day 1:' + this.state.eventDates.eventDay1}
          checked={this.state.eventDayOne.length > 0 ? true : false}
          date={this.state.eventDates.eventDay1}
          selected={this.state.eventDayOneTech}
        ></DateSelector>
        <DateSelector
          id='eventDayTwo'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Event Day 2:' + this.state.eventDates.eventDay2}
          checked={this.state.eventDayTwo.length > 0 ? true : false}
          date={this.state.eventDates.eventDay2}
          selected={this.state.eventDayTwoTech}
        ></DateSelector>
        <DateSelector
          id='eventDayThree'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Event Day 3:' + this.state.eventDates.eventDay3}
          checked={this.state.eventDayThree.length > 0 ? true : false}
          date={this.state.eventDates.eventDay3}
          selected={this.state.eventDayThreeTech}
        ></DateSelector>
        <DateSelector
          id='eventDayFour'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Event Day 4:' + this.state.eventDates.eventDay4}
          checked={this.state.eventDayFour.length > 0 ? true : false}
          date={this.state.eventDates.eventDay4}
          selected={this.state.eventDayFourTech}
        ></DateSelector>
        <DateSelector
          id='eventDayFive'
          onChange={this.dateSelectorUpdate}
          technologies={this.state.technologies}
          text={'Event Day 5:' + this.state.eventDates.eventDay5}
          checked={this.state.eventDayFive.length > 0 ? true : false}
          date={this.state.eventDates.eventDay5}
          selected={this.state.eventDayFiveTech}
        ></DateSelector>
        <span>Comments:</span>
        <br />
        <textarea
          rows='4'
          cols='50'
          name='comments'
          onChange={this.updateField}
          style={{ resize: 'none', width: '100%' }}
          defaultValue={selectedUser.comments}
        ></textarea>
        <br />
        <span>Date Created: {selectedUser.dateCreated}</span>
        <br />
        <span>Date Last Modified: {selectedUser.lastModified}</span>
        <br />
        <span>Last Modified By: {selectedUser.modifiedBy}</span>
        <br />
        <button
          id='link-button'
          onClick={this.updateExistingUser}
          style={{
            width: '250px',
            display: 'inline-block',
            boxSizing: 'border-box',
            fontSize: '1em',
            margin: '0.5em 0',
          }}
        >
          Update Attendee Fields
        </button>
        <button
          id='link-button'
          onClick={this.deleteUser}
          style={{
            width: '250px',
            display: 'inline-block',
            boxSizing: 'border-box',
            fontSize: '1em',
            margin: '0.5em 0',
            float: 'right',
          }}
        >
          Delete Attendee
        </button>
        <br />
        <span style={{ fontSize: '0.8em' }}>* - Supplier Only Fields</span>
      </div>
    ) : null;

    const paginatedButtons = this.generatePaginationButtons(
      this.state.numPages
    );
    //          <img src={require('../../images/main.jpg')}></img>
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
          <h1>Attendee Database</h1>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <label htmlFor='sort-by-select'>Sort Table By: </label>
              <select
                id='sort-by-select'
                onChange={(e) => {
                  var sortBy = e.target.value;
                  this.setState({ sortBy: sortBy });
                }}
                defaultValue='-- select an option --'
              >
                <option disabled>-- select an option --</option>
                <option value={0}>Last Name</option>
                <option value={1}>First Name</option>
                <option value={2}>Email</option>
                <option value={3}>Type</option>
                <option value={4}>Date Created</option>
                <option value={5}>Date Last Modified</option>
                <option value={6}>Last Modified By</option>
                <option value={7}>Company</option>
                <option value={8}>Country</option>
                <option value={9}>City</option>
              </select>
            </div>
            <div>
              <label htmlFor='search-input'>Search: </label>
              <input
                type='text'
                onChange={(e) => {
                  this.setState({ search: e.target.value });
                }}
                onKeyDown={(e) => {
                  if (e.keyCode == 13) {
                    this.setState(
                      { search: e.target.value },
                      this.getAttendees
                    );
                  }
                }}
              ></input>
              <button onClick={this.getAttendees}>Submit Search</button>
            </div>
            <div>
              <label htmlFor='rows-per-page-select'>Entries per page: </label>
              <select
                id='rows-per-page-select'
                onChange={(e) => {
                  this.setRowsPerPage(parseInt(e.target.value));
                }}
              >
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value='75'>75</option>
                <option value='100'>100</option>
              </select>
            </div>
          </div>

          <Table
            className='admin-database-table'
            columns={tableColumns}
            loading={this.state.loading}
            columns={tableColumns}
          >
            {this.getRows(dataColumns, this.state.attendeesOnPage)}
          </Table>
          {paginatedButtons}

          <button
            id='link-button'
            style={buttonWidth}
            onClick={this.toggleAddModal}
          >
            Add entry to Attendees
          </button>
          <br />
          <button
            id='link-button'
            style={buttonWidth}
            onClick={async () => {
              window.open('/idte/admin/attendeeExcel.xlsx');
            }}
          >
            Export to Excel Sheet
          </button>
          <br />
          <a id='link-button' href='admin.html' style={buttonWidth}>
            Back to Admin Page
          </a>
        </div>

        <Footer />
        <Modal
          show={this.state.showEditModal}
          onClose={this.toggleEditModal}
          style={{ width: '700px' }}
        >
          {editModalInner}
        </Modal>
        <Modal
          show={this.state.showAddModal}
          onClose={this.toggleAddModal}
          style={{ width: '700px' }}
        >
          {addModalInner}
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<DatabasePage />, document.getElementById('app'));
