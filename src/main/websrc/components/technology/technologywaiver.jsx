import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class TechWaiver extends React.Component {
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
          <h1>Technology Submission Digital Waiver</h1>
          <p>
            Sample Text Sample Text Sample Text Sample Text Sample Text Sample
            Text Sample Text Sample Text Sample Text Sample Text Sample Text
            Sample Text Sample Text Sample Text Sample Text Sample Text Sample
            Text Sample Text Sample Text Sample Text Sample Text Sample Text
            Sample Text Sample Text Sample Text Sample Text Sample Text Sample
            Text Sample Text Sample Text Sample Text Sample Text Sample Text
            Sample Text Sample Text Sample Text Sample Text Sample Text Sample
            Text Sample Text Sample Text Sample Text{' '}
          </p>
          <div className='registration-form'>
            <button>
              <a href='technologyform.html'>
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

ReactDOM.render(<TechWaiver />, document.getElementById('app'));
