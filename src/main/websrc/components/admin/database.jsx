import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class DatabasePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendees: [],
      error: null,
      selectedUser: null
    };

    this.getAttendees = this.getAttendees.bind(this);
  }

  getAttendees() {
    // because suppliers and evaluators cannot be determined from a normal get without some
    // parsing and checking, we're just going to get them separately and append their type to them here
    fetch('/idte/suppliers', {
      // send request to server
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        // check to see if we got a good response
        if (res.ok) return res.json();
        else return Promise.reject(Error(res.status));
      })
      .then(body => {
        // check for an error message in the response
        if (body.message) {
          // theres an error
          return Promise.reject(Error(body.message));
        }
        body.forEach(supplier => {
          supplier.type = 'Supplier';
          var newAttendees = this.state.attendees;
          newAttendees.push(supplier);
          this.setState({
            // no error, lets set up the data
            attendees: newAttendees,
            error: this.state.error,
            selectedUser: this.state.selectedUser
          });
        });
      })
      .catch(err => {
        // error handling
        this.setState({
          // put it in the state
          attendees: this.state.attendees,
          error: err,
          selectedUser: this.state.selectedUser
        });
      });

    fetch('/idte/evaluators', {
      // send request to server
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        // check to see if we got a good response
        if (res.ok) return res.json();
        else return Promise.reject(Error(res.status));
      })
      .then(body => {
        // check for an error message in the response
        if (body.message) {
          // theres an error
          return Promise.reject(Error(body.message));
        }
        body.forEach(evaluator => {
          evaluator.type = 'Evaluator';
          var newAttendees = this.state.attendees;
          newAttendees.push(evaluator);
          this.setState({
            // no error, lets set up the data
            attendees: newAttendees,
            error: this.state.error,
            selectedUser: this.state.selectedUser
          });
        });
      })
      .catch(err => {
        // error handling
        this.setState({
          // put it in the state
          attendees: this.state.attendees,
          error: err,
          selectedUser: this.state.selectedUser
        });
      });
  }

  componentDidMount() {
    this.getAttendees();
  }

  render() {
    if (this.state.error) {
      console.log(this.state.error);
    }

    //console.log(this.state.attendees);

    const tbody = this.state.attendees
      ? this.state.attendees.map((user, i) => {
          return (
            <tr key={i}>
              <td>{user.type}</td>
              <td>{user.firstName + ' ' + user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.dateCreated}</td>
              <td>{user.lastModified}</td>
              <td>{user.modifiedBy}</td>
            </tr>
          );
        })
      : null;

    const buttonWidth = {
      width: '30%',
      display: 'inline-block',
      boxSizing: 'border-box'
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
          <h1>Database Administration Interface</h1>

          <table className='admin-database-table'>
            <thead>
              <tr>
                <td>Type</td>
                <td>Name</td>
                <td>Email</td>
                <td>Date Created</td>
                <td>Last Modified</td>
                <td>Modified By</td>
              </tr>
            </thead>
            <tbody>{tbody}</tbody>
          </table>

          <button id='link-button' style={buttonWidth}>
            Add entry to Attendees
          </button>
          <br />
          <a id='link-button' href='admin.html' style={buttonWidth}>
            Back to Admin Page
          </a>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<DatabasePage />, document.getElementById('app'));
