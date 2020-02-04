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
      showModal: false
    };

    this.getAttendees = this.getAttendees.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.rowClick = this.rowClick.bind(this);
    this.setError = this.setError.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.setData = this.setData.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }

  setError(err) {
    this.setState({
      attendees: this.state.attendees,
      error: err,
      selectedUser: this.state.selectedUser,
      loading: this.state.loading,
      showModal: this.state.showModal
    });
  }

  setLoading(val) {
    this.setState({
      attendees: this.state.attendees,
      error: this.state.error,
      selectedUser: this.state.selectedUser,
      loading: val,
      showModal: this.state.showModal
    });
  }

  setData(val) {
    this.setState({
      attendees: val,
      error: this.state.error,
      selectedUser: this.state.selectedUser,
      loading: this.state.loading,
      showModal: this.state.showModal
    });
  }

  setSelected(val) {
    this.setState({
      attendees: this.state.attendees,
      error: this.state.error,
      selectedUser: val,
      loading: this.state.loading,
      showModal: this.state.showModal
    });
  }

  toggleModal() {
    this.setState({
      attendees: this.state.attendees,
      error: this.state.error,
      selectedUser: this.state.selectedUser,
      loading: this.state.loading,
      showModal: !this.state.showModal
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

    this.setState(
      {
        attendees: this.state.attendees,
        error: this.state.error,
        selectedUser: columnData,
        loading: this.state.loading,
        showModal: this.state.showModal
      },
      () => {
        this.toggleModal();
      }
    );
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
                  id='fname'
                ></input>
              </td>
              <td>
                <span>Last Name: </span>
                <input
                  type='text'
                  value={selectedUser.lastName}
                  id='lname'
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Nickname: </span>
                <input
                  type='text'
                  value={selectedUser.nickname}
                  id='nickname'
                ></input>
              </td>
              <td>
                <span>Email: </span>
                <input
                  type='text'
                  value={selectedUser.email}
                  id='email'
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Phone Number: </span>
                <input
                  type='text'
                  value={selectedUser.phoneNumber}
                  id='phone'
                ></input>
              </td>
              <td>
                <span>Cell Number: </span>
                <input
                  type='text'
                  value={selectedUser.cellNumber}
                  id='cell'
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Company: </span>
                <input
                  type='text'
                  value={selectedUser.company}
                  id='company'
                ></input>
              </td>
              <td>
                <span>Technology Number: </span>
                <input
                  type='text'
                  value={selectedUser.technologyNumber}
                  id='technologyNumber'
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Country: </span>
                <input
                  type='text'
                  value={selectedUser.country}
                  id='country'
                ></input>
              </td>
              <td>
                <span>City: </span>
                <input type='text' value={selectedUser.city} id='city'></input>
              </td>
            </tr>
          </tbody>
        </table>
        <span>Comments:</span>
        <br />
        <textarea rows='4' cols='50' id='comments' style={{ resize: 'none' }}>
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

          <button id='link-button' style={buttonWidth}>
            Add entry to Attendees
          </button>
          <br />
          <a id='link-button' href='admin.html' style={buttonWidth}>
            Back to Admin Page
          </a>
        </div>

        <Footer />
        <Modal
          show={this.state.showModal}
          onClose={this.toggleModal}
          style={{ width: '600px' }}
        >
          {editModalInner}
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<DatabasePage />, document.getElementById('app'));
