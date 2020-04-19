import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Event from '../../data/event.js';
import change from '../../data/changeregistration.js';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationStart: '',
      registrationEnd: '',
      techSubStart: '',
      techSubEnd: '',
      setUpOne: '',
      setUpTwo: '',
      setUpThree: '',
      dryRun: '',
      eventDayOne: '',
      eventDayTwo: '',
      eventDayThree: '',
      eventDayFour: '',
      eventDayFive: '',
    };
    this.postAnEvent = this.postAnEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async postAnEvent() {
    const opts = null;
    await change.replaceCurrent(opts);
    await Event.postEvent(Event.createEventObjectFromState(this.state));
    //window.location.href = '/idte/admin/changeregistration.html';
     
            
  }

  handleChange() {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
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
          <h1>Event Details</h1>
          <p>Creating an event will replace the last active event. </p>
          <p>Both technology submission dates must take place before both registration dates.</p>
          <div>
            <table align='center'>
              <tbody>
                <tr>
                  <td>Registration Start Date:</td>
                  <td>
                    <input
                      name='registrationStart'
                      type='date'
                      value={this.registrationStart}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Registration End Date</td>
                  <td>
                    <input
                      name='registrationEnd'
                      type='date'
                      value={this.registrationEnd}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Tech. Submission Start Date</td>
                  <td>
                    <input
                      name='techSubStart'
                      type='date'
                      value={this.techSubStart}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>Tech. Submission End Date</td>
                  <td>
                    <input
                      name='techSubEnd'
                      type='date'
                      value={this.techSubEnd}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
    <tr><h2>Event Dates</h2></tr>
    <tr> 
      <td>Setup Day 1:</td>
      <td><input name='setUpOne' type='date' value={this.setUpOne} onChange={this.handleChange}></input></td>
    </tr>
    <tr>
      <td>Setup Day 2:</td>
      <td><input name='setUpTwo' type='date' value={this.setupTwo} onChange={this.handleChange}></input></td>
    </tr>
    <tr>
      <td>Setup Day 3:</td>
      <td><input name='setUpThree' type='date' value={this.setUpThree} onChange={this.handleChange}></input></td>
    </tr>
    <tr>
      <td>Dry Run:</td>
      <td><input name='dryRun' type='date' value={this.dryRun} onChange={this.handleChange}></input></td>
    </tr>
    <tr>
      <td>Event Day 1</td>
      <td><input name='eventDayOne' type='date' value={this.eventDayOne} onChange={this.handleChange}></input></td>
    </tr>
    <tr>
      <td>Event Day 2</td>
      <td><input name='eventDayTwo' type='date' value={this.eventDayTwo} onChange={this.handleChange}></input></td>
    </tr>
    <tr>
      <td>Event Day 3</td>
      <td><input name='eventDayThree' type='date' value={this.eventDayThree} onChange={this.handleChange}></input></td>
    </tr>
    <tr>
      <td>Event Day 4</td>
      <td><input name='eventDayFour' type='date' value={this.eventDayFour} onChange={this.handleChange}></input></td>
    </tr>
    <tr>
      <td>Event Day 5</td>
      <td><input name='eventDayFive' type='date' value={this.eventDayFive} onChange={this.handleChange}></input></td>
    </tr>
  </tbody>
</table>
    </div>
     <div  align= "center">
      <button onClick= {this.postAnEvent} >Create Event</button>
            </div>
            
            </div>
    
       
      </div>
    );
  }
}

ReactDOM.render(<Events />, document.getElementById('app'));
