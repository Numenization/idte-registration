import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class ChangeRegistration extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='background'></div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <h1>Change Registration</h1>

          <div className='on-off-registration'>
            <select>
              <option>Enable Registration</option>
              <option>Disable Registration</option>
            </select>
            <div className='submit'>
              <a href='admin.html'>Submit</a>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<ChangeRegistration />, document.getElementById('app'));
