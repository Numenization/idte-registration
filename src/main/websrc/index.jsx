import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header.jsx';
import NavBar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import './css/styles.css';
import Event from './data/changeregistration.js';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.getRegStatus = this.getRegStatus.bind(this);
    this.getTechStatus = this.getTechStatus.bind(this);
    this.getTechEndDate = this.getTechEndDate.bind(this);
    this.getTechStartDate = this.getTechStartDate.bind(this);
    this.getRegEndDate = this.getRegEndDate.bind(this);
    this.getRegStartDate = this.getRegStartDate.bind(this);
  }
  async getTechStartDate() {
    const opts = null;
    await Event.getTechStart(opts);
  }
  async getTechEndDate() {
    const opts = null;
    await Event.getTechEnd(opts);
  }
  async getRegStartDate() {
    const opts = null;
    await Event.getRegStart(opts);
  }
  async getRegEndDate() {
    const opts = null;
    await Event.getRegEnd(opts);
  }

  async getTechStatus() {
    let k = await Event.getTechStatus();
    let j = await Event.getTechEnd();
    let i = await Event.getTechStart();
    if (k.status == 'true' || k.status == 'false') {
      if (k.status == 'true') {
        document.getElementById('techStatus').innerText = 'Open';
        document.getElementById('techMessage').innerText = 'Closing: ' + j.date;
      } else {
        document.getElementById('techStatus').innerText = 'Closed';
        document.getElementById('techMessage').innerText = 'Opening: ' + i.date;
      }
    }
  }
  async getRegStatus() {
    let k = await Event.getRegStatus();
    let j = await Event.getRegEnd();
    let i = await Event.getRegStart();
    if (k.status == 'true' || k.status == 'false') {
      if (k.status == 'true') {
        document.getElementById('regStatus').innerText = 'Open';
        document.getElementById('regMessage').innerText = 'Closing: ' + j.date;
      } else {
        document.getElementById('regStatus').innerText = 'Closed';
        document.getElementById('regMessage').innerText = 'Opening: ' + i.date;
      }
    }
  }
  render() {
    return (
      <div
        className='container'
        onLoad={async (e) => {
          await this.getTechStatus();
          await this.getRegStatus();
        }}
      >
        <div className='background'>
          <img src={require('./images/main.jpg')}></img>
        </div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <div className='home-container'>
            <div className='home-container-row'>
              <h1>Innovation Drive and Technology Expo</h1>
            </div>
            <div className='home-container-row'>
              <p style={{ width: '40%', minWidth: '250px' }}>
                Welcome to the IDTE site.
              </p>
              <div className='home-container-cell'>
                <h3>Technology Submission</h3>
                <span id='techStatus'></span>
                <span id='techMessage'></span>
              </div>
              <div className='home-container-cell'>
                <h3>Attendee Registration</h3>
                <span id='regStatus'></span>
                <span id='regMessage'></span>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
