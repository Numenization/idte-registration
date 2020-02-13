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
        <div className='background'></div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <h1>Event Layout Map</h1>
          <p>Display a map?</p>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<EventLayout />, document.getElementById('app'));
