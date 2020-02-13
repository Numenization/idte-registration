import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class WaiverPage extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='background'></div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <h1>Registration Digital Waiver</h1>
          <p>
            Hello, you are about to sign this form are you sure you want to do
            this{' '}
          </p>
          <div className='registration-form'>
            <button>
              <a href='registerform.html'>
                <font color='white'>Sign</font>
              </a>
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<WaiverPage />, document.getElementById('app'));
