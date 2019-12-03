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
        <div className='background'>
          <img src={require('../../images/main.jpg')}></img>
        </div>

        <div className='top'>
          <Header/>
          <NavBar/>
        </div>

        <div className='content'>
            <p>
                Hello, you are about to sign this form are you sure you want to do this
                {' '}
            </p>
            <div className="registration-form">
              <button>
              < a href='registration.html'>Sign</a>  
              </button>
            </div>
            
          
          <h1>Digital Waiver</h1>
            
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<WaiverPage />, document.getElementById('app'));
