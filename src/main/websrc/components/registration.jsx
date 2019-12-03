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
        <div className='background'>
          <img src={require('../images/main.jpg')}></img>
        </div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <div className='registration-buttons'>
            <h1>Registration Page</h1>
            <p>Sample Text</p>
            <a href='/register/form'>Register as Supplier (Ford)</a>
            <a href='/register/form'>Register as Supplier (Other)</a>
            <a href='/register/form'>Register as Presenter</a>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<RegistrationPage />, document.getElementById('app'));
