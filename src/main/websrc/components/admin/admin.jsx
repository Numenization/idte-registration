import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class AdminPage extends React.Component {
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
          <h1>Admin page Title</h1>
          <p>test</p>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<AdminPage />, document.getElementById('app'));