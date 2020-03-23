import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Attendee from '../../data/attendee.js'
class FormPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: "_"
    }
    this.getRegStatus = this.getRegStatus.bind(this);
   
  }
  


  async getRegStatus() {
    let res = await Attendee.req("GET", "/idte/getRegistrationStatus", this.state)
    this.setState({
      type: res.type
    })
    document.getElementById("mytype").innerText = this.state.type
  }

  async componentDidMount(){
    this.getRegStatus();
  }

  render() {
    return (
      <div className='container' >
        <div className='background'>
          <img src={require('../../images/main.jpg')}></img>
        </div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <div className='registration-form'>
            <form>
              <label>Attendee Type:</label>
              <label id="mytype"></label>

              <label>*First/Given Name:</label>
              <input type='text'></input>

              <label>*Last/Family Name: </label>
              <input type='text'></input>

              <label>*Email Address:</label>
              <input type='text'></input>

              <label>Nickname (What you prefer to be called):</label>
              <input type='text'></input>

              <label>*Phone Number:</label>
              <input type='text'></input>

              <label>Cell Number (For use to contact during event):</label>
              <input type='text'></input>

              <label>*Company:</label>
              <input type='text'></input>

              <label>*City:</label>
              <input type='text'></input>

              <label>*Country:</label>
              <input type='text'></input>

              <label>*Technologies:</label>
              <input type='text'></input>

              <label>*Dates to Attend:</label>
              <input type='text'></input>
            </form>
            <button>Submit Registration</button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<FormPage />, document.getElementById('app'));
