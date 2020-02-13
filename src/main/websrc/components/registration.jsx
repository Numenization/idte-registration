import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header.jsx';
import NavBar from './navbar.jsx';
import Footer from './footer.jsx';
import '../css/styles.css';

class RegistrationPage extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='background'></div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <div className='registration-buttons'>
            <h1>Registration</h1>
            <p>Sample Text</p>
            <a href='registerwaiver.html'>
              <font color='white'>Register as Supplier (Ford)</font>
            </a>
            <a href='registerwaiver.html'>
              <font color='white'>Register as Supplier (Other)</font>
            </a>
            <a href='registerwaiver.html'>
              <font color='white'>Register as Presenter</font>
            </a>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<RegistrationPage />, document.getElementById('app'));
