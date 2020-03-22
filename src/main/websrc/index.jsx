import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header.jsx';
import NavBar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import './css/styles.css';
import Event from "./data/changeregistration.js";
class App extends React.Component {
  constructor(props){
    super(props);
    this.getRegStatus = this.getRegStatus.bind(this);
    this.getTechStatus = this.getTechStatus.bind(this);
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
  render() {
    return (
      
      <div className='container' onLoad={async e => {
        await this.getTechStatus();
        await this.getRegStatus();
      }}>
        <div className='background'>
          <img src={require('./images/main.jpg')}></img>
        </div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <div className='home-container'>
            <div className='home-container-row'>
              <h1>Innovation Drive and Technology Expo</h1>
            </div>
            <div className='home-container-row'>
              <p style={{ width: '40%' }}>
                Sample Text Sample Text Sample Text Sample Text Sample Text
                Sample Text Sample Text Sample Text Sample TextSample Text
                Sample Text Sample Text Sample Text Sample Text Sample Text
                Sample Text Sample Text Sample Text
              </p>
              <div className='home-container-cell'>
                <h3>Technology Submission</h3>
                <span id = "techStatus" ></span>
                
              </div>
              <div className='home-container-cell'>
                <h3>IDTE Registration</h3>
                <span id = "regStatus" ></span>
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
