import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header.jsx';
import NavBar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import './css/styles.css';

class TestPage extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='background'>
          <img src={require('./images/main.jpg')}></img>
        </div>

        <div className='top'></div>

        <div className='content'>
          <h1>Test Page</h1>
          <p>Sample Text</p>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<TestPage />, document.getElementById('app'));
