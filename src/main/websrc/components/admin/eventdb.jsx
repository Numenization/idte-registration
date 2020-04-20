
import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Event from "../../data/changeregistration.js";
class EventDB extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            events: [],
            loading: false,
            error: null
        };
        this.getEvents = this.getEvents.bind(this);
    }
    async getEvents(){
        this.setState({loading: true});

        var events = await Event.getEvents();
        if (events.statusText){
            this.setState({error: events.statusText, loading: false});
            return;
        }
        this.setState({events: events, loading:false});
           
    }
    async componentDidMount(){
        this.getEvents();
    }
    
render(){
    const events = this.state.events;
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
          <h1>Event Database</h1>
        <div>
              <label>Archived Events: </label>
        </div>
        <table border="2px">
            
                <thead>
                    <tr>
                      <td ><b>Reg. Start</b></td>
                      <td><b>Reg. End</b></td> 
                      <td ><b>Sub. Start</b></td> 
                      <td ><b>Sub. End</b></td> 
                      <td ><b>Reg. Status</b></td> 
                      <td ><b>Tech. Status</b></td> 
                      <td><b>Current Event</b></td> 
                      <td ><b>Event ID</b></td>
                      </tr>
                      </thead>
                      <tbody>
                          {events.map((event, i) => {
                              return(
                              <tr key={i} id={event.eventID} className="event-row" >
                      
                      <td >{event.registrationStart}</td> 
                      <td >{event.registrationEnd}</td> 
                      <td>{event.technologyStart}</td> 
                      <td >{event.technologyEnd}</td>
                      <td >{event.registrationStatus.toString()}</td>
                      <td >{event.technologyStatus.toString()}</td>
                      <td >{event.currentEvent.toString()}</td> 
                      <td >{event.eventID}</td>
                        <button id= "link-button" 
                      onClick={
                        async e=> {
                            await Event.changeCurrent({
                                id: event.eventID
                            });
                            await this.getEvents();
                        }
                      }>Make Current</button> 
                      <button id="link-button"
                      onClick={
                          async e=> {
                              await Event.deleteEvent({
                                  id: event.eventID
                              });
                              await this.getEvents();
                          }}
                      >Delete</button>
                      </tr>
              )
          })
          }
          </tbody>
    </table>
        </div> 
        <Footer />
    </div>
    );
  }
}




ReactDOM.render(<EventDB />, document.getElementById('app'));