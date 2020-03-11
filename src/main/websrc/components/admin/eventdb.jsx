import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import { Table, TableRow } from '../general/table.jsx';
import '../../css/styles.css';
import Modal from '../general/modal.jsx';
import Event from '../../data/event.js';

class EventDB extends React.Component {

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
            
            const tableColumns =[
                'CurrentEvent'

            ];
<div>
<table align="center">
    <tbody>
    <tr>
    <th>CurrentEvent</th>
    <th>Reg. Start Date</th> 
    <th>Reg. End Date</th>
    <th>Tech. Sub. Start Date</th>
    <th>Tech. Sub. End Date</th>
    <th>Registration Status</th>
    <th>Tech. Submission Status</th>
    <th>EventID</th>
    </tr>
    </tbody>
   
</table>
</div>
            </div>
        )}
}




ReactDOM.render(<EventDB />, document.getElementById('app'));