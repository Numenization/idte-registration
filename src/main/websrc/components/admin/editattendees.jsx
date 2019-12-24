import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class EditAttendees extends React.Component {
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

          
          <div className="content">
          <h1>Search Attendee</h1>
             <label>Attendee Name:</label>
                <input type="text"></input>
                <select>
                 <option >Add</option>
                 <option >Edit</option>
                 <option >Remove</option>
                </select>
                <div className="submit">
                <a href="admin.html">Submit</a>
                </div>
            </div>   
        

          <Footer/>
        </div>
      )
    }
}
ReactDOM.render(<EditAttendees />, document.getElementById('app'));