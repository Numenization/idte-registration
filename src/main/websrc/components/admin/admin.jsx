import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class AdminPage extends React.Component {
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
          <h1>Administration</h1>
          <p>Administration abilities listed below:</p>

          <div className='admin-buttons'>
            <a href='accounts.html'>Admin Accounts</a>
            <a href='changeregistration.html'>Events</a>
            <a href='attendeecheckin.html'>Attendee Checkin</a>
            <a href='database.html'>Attendees</a>
            <a href='technologyCategories.html'>Technology Categories</a>
            <a href='techdb.html'>Technologies</a>
            <a href='badges.html' target='_blank'>
              Print Badges
            </a>
            <a href='sendemail.html'>Send Email</a>
            <a href='/idte/logout'>Log out of Admin Account</a>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<AdminPage />, document.getElementById('app'));
