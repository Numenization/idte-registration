import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Event from "../../data/changeregistration.js";
class ChangeRegistration extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      registrationStart: "",
      registrationEnd: "",
      techSubStart: "",
      techSubEnd: ""
  };
  this.handleChange = this.handleChange.bind(this);
   this.changeRegStatus = this.changeRegStatus.bind(this);
   this.changeTechStatus = this.changeTechStatus.bind(this);
   this.getRegStatus = this.getRegStatus.bind(this);
   this.getTechStatus = this.getTechStatus.bind(this);
   this.getTechEndDate = this.getTechEndDate.bind(this);
   this.getTechStartDate = this.getTechStartDate.bind(this);
   this.getRegEndDate = this.getRegEndDate.bind(this);
   this.getRegStartDate = this.getRegStartDate.bind(this);
   
  }
  async getTechStartDate(){
    const opts = null;
   let k = await Event.getTechStart(opts); 
   document.getElementById("techStart").innerText = k.date;
  }
  async getTechEndDate(){
    const opts = null;
    let k = await Event.getTechEnd(opts); 
    document.getElementById("techEnd").innerText = k.date;

  }
  async getRegStartDate( ){
    const opts = null;
    let k = await Event.getRegStart(opts); 
    document.getElementById("regStart").innerText = k.date;

  }
  async getRegEndDate(){
    const opts = null;
    let k = await Event.getRegEnd(opts); 
    document.getElementById("regEnd").innerText = k.date;
  }
    async changeRegStatus(){
      const opts = null;
     await Event.changeCurrentReg(opts);

    }
    async changeTechStatus(){
      const opts = null;
      await Event.changeCurrentTech(opts);  
        
    }
    async getTechStatus(){
      let k = await Event.getTechStatus();
      if (k.status == "true" || k.status == "false"){
        if(k.status== "true"){
          document.getElementById("techStatus").innerText= "Open";
        }
        else{
          document.getElementById("techStatus").innerText= "Closed";
        }
      }
      
    }
    async getRegStatus(){
    let k = await Event.getRegStatus();
    if (k.status == "true" || k.status == "false"){
      if(k.status == "true"){
        document.getElementById("regStatus").innerText= "Open";
      }
      else{
        document.getElementById("regStatus").innerText= "Closed";
      }
    }
  }

async updatesEventDates(){
  const opts = null;
  await Event.updateEvent(
Event.updateObjectFromState(this.state)
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
  
  render() {
    

    return (
     
      <div className='container' onLoad={async e => {
        await this.getTechStatus();
        await this.getRegStatus();
        await this.getRegEndDate();
        await this.getRegStartDate();
        await this.getTechEndDate();
        await this.getTechStartDate();
      }}>
        
        <div className='background'>
          <img src={require('../../images/main.jpg')}></img>
        </div>
        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <h1>Event Administration</h1>

            <label>Registration Status: <label id="regStatus"></label></label>
                  
            <button onClick={async e => {
                        await this.changeRegStatus();
                        await this.getRegStatus();
                      }}>Enable/Disable
            </button>
            <label><br></br>Technology Submission Status: <label id="techStatus"></label></label> 
        
            <button onClick={async e => {
                        await this.changeTechStatus();
                        await this.getTechStatus();
                      }}>
              Enable/Disable<br></br>
            </button>
            <br></br>
            <br></br>
            <label>Reg. Start Date:<label id="regStart"></label></label> <input name = 'registrationStart' type='date' value={this.registrationStart} onChange={this.handleChange}></input>
            <br></br>
            <label>Reg. End Date:<label id="regEnd"></label></label> <input name = 'registrationEnd' type='date' value={this.registrationEnd} onChange={this.handleChange}></input>
            <br></br>
            <label>Tech. Sub. Start Date:<label id="techStart"></label></label> <input name = 'techSubStart' type='date' value={this.techSubStart} onChange={this.handleChange}></input>
            <br></br>
            <label>Tech. Sub. Start Date:<label id="techEnd"></label></label> <input name = 'techSubEnd' type='date' value={this.techSubEnd} onChange={this.handleChange}></input>
            <br></br>
            <div className = 'submit'>
              <button onClick={
                async e => {
                  await this.updatesEventDates();
                  await this.getRegStartDate();
                  await this.getRegEndDate();
                  await this.getTechStartDate();
                  await this.getTechEndDate();
                }
              }
              >Submit</button>
              <a href='events.html'> Create Event </a>
              <a href='eventdb.html'> Event Database </a>
            </div>
            
          </div>

        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<ChangeRegistration />, document.getElementById('app'));
