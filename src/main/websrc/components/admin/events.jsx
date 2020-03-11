import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Event from '../../data/event.js';



class Events extends React.Component {
constructor(props){
  super(props);
  this.state = {
      registrationStart: "",
      registrationEnd: "",
      techSubStart: "",
      techSubEnd: "",
      regStatus: false,
      techStatus: false,
      currentEvent: true
  };
  this.postAnEvent = this.postAnEvent.bind(this);
  this.handleChange = this.handleChange.bind(this);
}
  async postAnEvent(){
    await Event.postEvent(
        Event.createEventObjectFromState(this.state)
    );
  }


  
  handleChange() {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
    [name]: value
    });
}
    render(){
        return(
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
   <div>
    <table align="center">
  <tbody>
    <tr>
      <td>Registration Start Date(mm/dd/yyyy):</td>
      <td><input name = 'registrationStart' type='text' value={this.registrationStart} onChange={this.handleChange}></input></td>
    </tr>
    <tr>
      <td>Registration End Date(mm/dd/yyyy):</td>
      <td><input name='registrationEnd' type='text' value={this.registrationEnd} onChange={this.handleChange}></input></td>
    </tr>
    <tr>
      <td>Tech. Submission Start Date(mm/dd/yyyy)</td>
      <td><input name='techSubStart' type='text' value={this.techSubStart} onChange={this.handleChange}></input></td>
    </tr>
    <tr>
      <td>Tech. Submission End Date(mm/dd/yyyy)</td>
      <td><input name='techSubEnd' type='text' value={this.techSubEnd} onChange={this.handleChange}></input></td>
    </tr>
    
  </tbody>
</table>
    </div>
    
     <div  align= "center">
            <button onClick={this.postAnEvent}>Create Event</button>
            </div>
            
            </div>
    
            <Footer />
          </div>
        );
        


        }
}

ReactDOM.render(<Events />, document.getElementById('app'));