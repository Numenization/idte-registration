import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class ContactPage extends React.Component {
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
          <h1>Contact IDTE Team</h1>
          <h3>Ways to contact us:</h3>
          <ul>
            <li>
              Email: <a href=''>example@email.com</a>
            </li>
            <li>Phone: (800) 555-5555</li>
          </ul>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<ContactPage />, document.getElementById('app'));
