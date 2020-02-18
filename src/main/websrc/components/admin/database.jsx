import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import { Table, TableRow } from '../general/table.jsx';
import '../../css/styles.css';
import Modal from '../general/modal.jsx';
import Attendee from '../../data/attendee.js';

// TODO: Dropdown type selector for adding attendee

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
      search: ''
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
      'type'
    ];
    for (let property of values) {
      this.setState({ [property]: undefined });
    }
  }

  setError(err) {
    this.setState({
      attendees: this.state.attendees,
      error: err,
      selectedUser: this.state.selectedUser,
      loading: this.state.loading,
      showEditModal: this.state.showEditModal,
      showAddModal: this.state.showAddModal
    });
  }

  setLoading(val) {
    this.setState({
      attendees: this.state.attendees,
      error: this.state.error,
      selectedUser: this.state.selectedUser,
      loading: val,
      showEditModal: this.state.showEditModal,
      showAddModal: this.state.showAddModal
    });
  }

  setData(val) {
    this.setState({
      attendees: val,
      error: this.state.error,
      selectedUser: this.state.selectedUser,
      loading: this.state.loading,
      showEditModal: this.state.showEditModal,
      showAddModal: this.state.showAddModal
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
        showAddModal: this.state.showAddModal
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
      page: val
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
      showAddModal: this.state.showAddModal
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
      showAddModal: !this.state.showAddModal
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
    await Attendee.postSupplier(
      Attendee.createAttendeeObjectFromState(this.state)
    );
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

  async componentDidMount() {
    this.getAttendees();
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
      9: 'city'
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
      'Modified By'
    ];

    const dataColumns = [
      'type',
      'firstName',
      'lastName',
      'email',
      'dateCreated',
      'lastModified',
      'modifiedBy'
    ];

    const buttonWidth = {
      width: '30%',
      display: 'inline-block',
      boxSizing: 'border-box'
    };

    const addModalInner = (
      <div>
        <h2>Create New Attendee</h2>
        <span>Attendee Type: [CHANGE THIS TO DROPDOWN SELECTION]</span>
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
                <span>Company: </span>
                <input
                  type='text'
                  name='company'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Technology Number: </span>
                <input
                  type='text'
                  name='technologyNumber'
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
          </tbody>
        </table>
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
            margin: '0.5em 0'
          }}
          onClick={this.postNewUser}
        >
          Post New Attendee
        </button>
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
                <span>Company: </span>
                <input
                  type='text'
                  defaultValue={selectedUser.company}
                  name='company'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Technology Number: </span>
                <input
                  type='text'
                  defaultValue={selectedUser.technologyNumber}
                  name='technologyNumber'
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
          </tbody>
        </table>
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
            margin: '0.5em 0'
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
            float: 'right'
          }}
        >
          Delete Attendee
        </button>
      </div>
    ) : null;

    const paginatedButtons = this.generatePaginationButtons(
      this.state.numPages
    );
    //          <img src={require('../../images/main.jpg')}></img>
    return (
      <div className='container'>
        <div className='background'></div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <h1>Database Administration Interface</h1>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <label htmlFor='sort-by-select'>Sort Table By: </label>
              <select
                id='sort-by-select'
                onChange={e => {
                  var sortBy = e.target.value;
                  this.setState({ sortBy: sortBy });
                }}
              >
                <option disabled selected value>
                  -- select an option --
                </option>
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
                onChange={e => {
                  this.setState({ search: e.target.value });
                }}
                onKeyDown={e => {
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
                onChange={e => {
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
          <a id='link-button' href='admin.html' style={buttonWidth}>
            Back to Admin Page
          </a>
        </div>

        <Footer />
        <Modal
          show={this.state.showEditModal}
          onClose={this.toggleEditModal}
          style={{ width: '600px' }}
        >
          {editModalInner}
        </Modal>
        <Modal
          show={this.state.showAddModal}
          onClose={this.toggleAddModal}
          style={{ width: '600px' }}
        >
          {addModalInner}
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<DatabasePage />, document.getElementById('app'));
