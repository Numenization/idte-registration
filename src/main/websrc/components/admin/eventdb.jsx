
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Events from "../../data/changeregistration.js";
class EventDB extends React.Component {
render(){
<div className='container'>

        <div className='background'>
          <img src={require('../../images/main.jpg')}></img>
        </div>
        <div className='top'>
          <Header />
          <NavBar />
        </div>
        <div className='content'>


        </div>

    
</div>

}
}




ReactDOM.render(<EventDB />, document.getElementById('app'));