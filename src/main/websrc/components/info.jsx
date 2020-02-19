import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header.jsx';
import NavBar from './navbar.jsx';
import Footer from './footer.jsx';
import '../css/styles.css';

class InfoPage extends React.Component {
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
          <h1>IDTE Information Hub</h1>
          <p>Sample Text</p>
          <ul>
            <li>
              <a href='faq.html'>
                <font color='blue'>Event Info/FAQ</font>
              </a>
            </li>
            <li>
              <a href='map.html'>
                <font color='blue'>Event Map</font>
              </a>
            </li>
            <li>
              <a href='eventlayout.html'>
                <font color='blue'>Display Layout</font>
              </a>
            </li>
            <li>
              <a href='contact.html'>
                <font color='blue'>Contact IDTE Team</font>
              </a>
            </li>
          </ul>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<InfoPage />, document.getElementById('app'));
