import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Email from '../../data/email.js'

class SendEmail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            to: "caz.polo@gmail.com",
            subject: "Boi",
            body: "Did I really just work?"
        };
        
        this.sendAnEmail = this.sendAnEmail.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async sendAnEmail() {

        await Email.sendThatEmail(
            Email.createEmailObjectFromState(this.state)
          );
        
        console.log(alert('The email should arrive within the next couple minutes'))
    }

    handleInputChange() {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
        [name]: value
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
          <h1>Send an email</h1>
          <div className='attendee-search'>
            <label>Subject:</label>
            <input name='subject' type='text' value={this.subject} onChange={this.handleInputChange}></input>
            <label>To:</label>
            <input name='to' type='text' value={this.to} onChange={this.handleInputChange}></input>
            <label>Body:</label>
            <input name='body' type='text' value={this.body} onChange={this.handleInputChange}></input>
            <button onClick={this.sendAnEmail}  >Send it!</button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<SendEmail />, document.getElementById('app'));
