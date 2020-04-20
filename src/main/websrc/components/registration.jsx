import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header.jsx';
import NavBar from './navbar.jsx';
import Footer from './footer.jsx';
import '../css/styles.css';
import RegStatus from '../data/regStatus.js';
import Event from '../data/changeregistration.js';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
    };
    this.submitSupp = this.submitSupp.bind(this);
    this.isRegOpen = this.isRegOpen.bind(this);
  }
  async isRegOpen() {
    let k = await Event.getRegStatus();
    if (k.status == 'false') {
      window.location.href = 'http://localhost:8080/idte/index.html';
      alert('Registration is Closed.');
    }
  }
  async submitSupp(regtype) {
    this.setState({ type: regtype });
    let requestbody = {
      type: regtype,
    };
    try {
      let res = await RegStatus.req(
        'POST',
        '/idte/setRegistrationStatus',
        requestbody
      );
      if (res.iid) {
        window.location.href = '/idte/registerwaiver.html';
      }
    } catch (e) {
      if (e.errors) {
        console.log(e.errors);
        for (const error of e.errors) {
          console.log(error);
          this.addError(error);
        }
      }
    }
  }

  render() {
    return (
      <div
        className='container'
        onLoad={async (e) => {
          await this.isRegOpen();
        }}
      >
        <div className='background'>
          <img src={require('../images/main.jpg')}></img>
        </div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <div className='registration-buttons'>
            <h1>Registration</h1>
            <button
              id='link-button'
              onClick={async () => this.submitSupp('supplier')}
            >
              Register as Supplier
            </button>
            <button
              id='link-button'
              onClick={async () => this.submitSupp('presenter')}
              href='registerwaiver.html'
            >
              Register as Presenter
            </button>
            <button
              id='link-button'
              onClick={async () => this.submitSupp('evaluator')}
              href='registerwaiver.html'
            >
              Register as Evaluator
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<RegistrationPage />, document.getElementById('app'));
