import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Event from '../../data/event.js';
class ChangeRegistration extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        regStatus: false,
        techStatus: false,
        currentEvent: true
    };
    this.getRegStatus = this.getRegStatus.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }
  

  async getRegStatus(){
    var status = await Event.regStatus;
    return status;
  }
  

  
  async changeStatus(){
    await Event.updateStatus(
      Event.regStatus = !Event.regStatus
    );
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
          <h1>Event Administration</h1>

        
            <label>Registration Status:<label value = {this.getRegStatus()}> </label></label>
                  
            <button>
              <a href='changeregistration.html' >Enable/Disable</a>
            </button>
            
            <label><br></br>Technology Submission Status: <label></label></label> 
        
            <button onClick = {regStatus = !regStatus}>
              <a href= 'changeregistration.html' >Enable/Disable<br></br></a>
            </button>
            <div className = 'submit'>
              <a href='events.html'> Create Event </a>
            </div>
            <div className = 'submit'>
              <a href='eventdb.html'> View Events </a>
            </div>
            
          </div>

        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<ChangeRegistration />, document.getElementById('app'));
