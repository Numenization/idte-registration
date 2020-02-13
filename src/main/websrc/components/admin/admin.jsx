import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class AdminPage extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='background'></div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <h1>Administration</h1>
          <p>Administration abilities listed below:</p>

          <div className='admin-buttons'>
            <a href='edittechnologies.html'> Edit Technologies</a>
            <a>Edit Event Dates</a>
            <a href='changeregistration.html'>Open/Close Registration</a>
            <a href='attendeecheckin.html'>Attendee Checkin</a>
            <a href='editattendees.html'>Edit Attendees</a>
            <a href='database.html'>Database Administration</a>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<AdminPage />, document.getElementById('app'));
