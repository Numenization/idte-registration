import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header.jsx';
import NavBar from './navbar.jsx';
import Footer from './footer.jsx';
import '../css/styles.css';
import RegStatus from '../data/regStatus.js';

class RegistrationPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: ""
    }
    this.submitSupp = this.submitSupp.bind(this);
  }

  async submitSupp(regtype){
    this.setState({type: regtype})
    let requestbody = {
      type: regtype
    }
    try {
      let res = await RegStatus.req('POST', '/idte/setRegistrationStatus', requestbody);
      window.location.href = "registerwaiver.html";
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
      <div className='container'>
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
            <p>Sample Text</p>
            <a onClick={() => this.submitSupp("supplier")}>
              <font color='white'>Register as Supplier</font>
            </a>
            <a onClick={() => this.submitSupp("presenter")} href="registerwaiver.html">
              <font color='white'>Register as Presenter</font>
            </a>
            <a onClick={() => this.submitSupp("evaluator")} href="registerwaiver.html">
              <font color='white'>Register as Evaluator</font>
            </a>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<RegistrationPage />, document.getElementById('app'));
