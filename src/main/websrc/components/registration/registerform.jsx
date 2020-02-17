import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class FormPage extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='background'></div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <div className='registration-form'>
            <form>
              <label>*First Name/Given Name:</label>
              <input type='text'></input>

              <label>*Last Name/Family Name: </label>
              <input type='text'></input>

              <label>*Email Address:</label>
              <input type='text'></input>

              <label>Nickname (What you prefer to be called):</label>
              <input type='text'></input>

              <label>*Phone Number:</label>
              <input type='text'></input>

              <label>Cell Number (For use to contact during event):</label>
              <input type='text'></input>

              <label>*Company:</label>
              <input type='text'></input>

              <label>*City:</label>
              <input type='text'></input>

              <label>*Country:</label>
              <input type='text'></input>

              <label>*Technologies:</label>
              <input type='text'></input>

              <label>*Dates to Attend:</label>
              <input type='text'></input>
            </form>
            <button>Submit Registration</button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<FormPage />, document.getElementById('app'));
