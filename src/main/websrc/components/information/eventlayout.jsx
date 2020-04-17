import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class EventLayout extends React.Component {
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
          <h1>Event Layout Map</h1>
          <p>Below is the map of IDTE</p>
          <img id='LayoutMap' src={require('../../images/LayoutMap.png')}></img>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<EventLayout />, document.getElementById('app'));
