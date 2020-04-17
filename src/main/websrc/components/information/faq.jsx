import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class FaqPage extends React.Component {
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
          <h1>Event information</h1>
          <p>
            This is the page where you can see information regarding IDTE.
            Any other questions that need to be answered, please refer to the contact page.
          </p>
          <ul>
            <li>Technologies can be submitted through the Technology tab</li>
            <li>Attendee registration is submitted through the Registration tab</li>
            <li>Technology and Registration dates are shown on the homepage</li>
          </ul>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<FaqPage />, document.getElementById('app'));
