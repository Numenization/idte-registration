import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class AttendeeCheckin extends React.Component {
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
          <h1>Attendee Checkin</h1>
          <div className='admin-buttons'>
            <a href='qrsignin.html'> Scan QR Code</a>
            <a href='attendeesearch.html'> Search Attendee</a>
            <div className='submit'>
              <a href='/idte/admin.html'>Submit</a>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<AttendeeCheckin />, document.getElementById('app'));
