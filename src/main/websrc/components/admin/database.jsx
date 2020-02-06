import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import { Table, TableRow } from '../general/table.jsx';
import '../../css/styles.css';
import Modal from '../general/modal.jsx';
import Attendee from '../../data/attendee.js';

class DatabasePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendees: [],
      error: null,
      selectedUser: null,
      loading: false,
      showEditModal: false,
      showAddModal: false
    };

    this.getAttendees = this.getAttendees.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.rowClick = this.rowClick.bind(this);
    this.setError = this.setError.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.setData = this.setData.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.updateField = this.updateField.bind(this);
    this.clearUserValues = this.clearUserValues.bind(this);
    this.postNewUser = this.postNewUser.bind(this);
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

    // call the backend for attendee data
    let suppliers = await Attendee.getAllSuppliers();
    let evaluators = await Attendee.getAllEvaluators();

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

    this.setData(suppliers);
    this.setLoading(false);
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
    // TODO: check if supplier or evaluator
    await Attendee.postSupplier(
      Attendee.createAttendeeObjectFromState(this.state)
    );
    this.getAttendees();
    this.toggleAddModal();
  }

  async componentDidMount() {
    this.getAttendees();
  }

  render() {
    if (this.state.error) {
      console.log(this.state.error);
    }

    //console.log(this.state.attendees);

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

    const tbody = this.state.attendees
      ? this.state.attendees.map((user, key) => {
          return (
            <TableRow
              key={key}
              data={user}
              columns={dataColumns}
              onClick={this.rowClick}
            />
          );
        })
      : null;

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
          style={{ resize: 'none' }}
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
                  value={selectedUser.firstName}
                  name='firstName'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Last Name: </span>
                <input
                  type='text'
                  value={selectedUser.lastName}
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
                  value={selectedUser.nickname}
                  name='nickname'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Email: </span>
                <input
                  type='text'
                  value={selectedUser.email}
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
                  value={selectedUser.phoneNumber}
                  name='phoneNumber'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Cell Number: </span>
                <input
                  type='text'
                  value={selectedUser.cellNumber}
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
                  value={selectedUser.company}
                  name='company'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Technology Number: </span>
                <input
                  type='text'
                  value={selectedUser.technologyNumber}
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
                  value={selectedUser.country}
                  name='country'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>City: </span>
                <input
                  type='text'
                  value={selectedUser.city}
                  onChange={this.updateField}
                  name='city'
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <span>Comments:</span>
        <br />
        <textarea rows='4' cols='50' name='comments' style={{ resize: 'none' }}>
          {selectedUser.comments}
        </textarea>
        <br />
        <span>Date Created: {selectedUser.dateCreated}</span>
        <br />
        <span>Date Last Modified: {selectedUser.lastModified}</span>
        <br />
        <span>Last Modified By: {selectedUser.modifiedBy}</span>
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
        >
          Update Attendee Fields
        </button>
        <button
          id='link-button'
          onClick={() => {
            console.log(Attendee.createAttendeeObjectFromState(this.state));
          }}
          style={{
            width: '250px',
            display: 'inline-block',
            boxSizing: 'border-box',
            fontSize: '1em',
            margin: '0.5em 0'
          }}
        >
          Print selected user values
        </button>
      </div>
    ) : null;

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
          <h1>Database Administration Interface</h1>

          <Table
            className='admin-database-table'
            columns={tableColumns}
            loading={this.state.loading}
            columns={tableColumns}
          >
            {tbody}
          </Table>

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
