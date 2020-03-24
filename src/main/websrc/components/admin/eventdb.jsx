
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
        <table>
                      <td width="110px"><b>Reg. Start</b></td>
                      <td width="120px"><b>Reg. End</b></td> 
                      <td width="110px"><b>Tech. Sub. Start</b></td> 
                      <td width="110px"><b>Tech. Sub. End</b></td> 
                      <td width="80px"><b>Reg. Status</b></td> 
                      <td width="80px"><b>Tech. Status</b></td> 
                      <td width="80px"><b>Event Dates</b></td> 
                      <td width="80px"><b>Current Event</b></td> 
                      <td width="110px"><b>Event ID</b></td> 
                      </table>
          {events.map((event, i) => {
              return(
                  <div>
                      
                  <div key={i} id={event.eventID} className="event-row" >
                      
                      <table  border="2">
                    <tbody>
                      <tr>
                      <td width="110px">{event.registrationStart}</td> 
                      <td width="110px">{event.registrationEnd}</td> 
                      <td width="110px">{event.technologyStart}</td> 
                      <td width="110px">{event.technologyEnd}</td>
                      <td width="80px">{event.registrationStatus.toString()}</td>
                      <td width="80px">{event.technologyStatus.toString()}</td>
                      <td width="80px">{event.eventDates}</td>
                      <td width="80px">{event.currentEvent.toString()}</td> 
                      <td width="180px">{event.eventID}</td> 
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
                       </tbody>
                      </table>
                      </div>
                      
                  </div>
              )
          })
          }
    
        </div> 
        <Footer />
    </div>
    );
  }
}




ReactDOM.render(<EventDB />, document.getElementById('app'));