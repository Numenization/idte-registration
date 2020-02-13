import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header.jsx';
import NavBar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import './css/styles.css';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='background'></div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <div class='home-container'>
            <div class='home-container-row'>
              <h1>Innovation and Drive Technology Expo</h1>
            </div>
            <div class='home-container-row'>
              <p style={{ width: '40%' }}>
                Sample Text Sample Text Sample Text Sample Text Sample Text
                Sample Text Sample Text Sample Text Sample TextSample Text
                Sample Text Sample Text Sample Text Sample Text Sample Text
                Sample Text Sample Text Sample Text
              </p>
              <div class='home-container-cell'>
                <h3>Technology Submission</h3>
                <span>Closed!</span>
                <a href='technologywaiver.html'>Click to Submit</a>
              </div>
              <div class='home-container-cell'>
                <h3>IDTE Registration</h3>
                <span>Closed!</span>
                <a href='registration.html'>Click to Register</a>
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
