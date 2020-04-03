import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class WaiverPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      continueDisabled: true
    };
  }
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
          <h1>Registration Digital Waiver</h1>
          <p>User agreement goes here</p>
          <input
            type='checkbox'
            id='checkbox'
            onChange={e => {
              this.setState({ continueDisabled: !e.target.checked });
            }}
          ></input>
          <label htmlFor='checkbox'>I agree to the User Agreement above</label>
          <a
            id='link-button'
            href='registerform.html'
            disabled={this.state.continueDisabled}
          >
            Continue
          </a>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<WaiverPage />, document.getElementById('app'));
