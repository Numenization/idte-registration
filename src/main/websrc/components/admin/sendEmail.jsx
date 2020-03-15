import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Email from '../../data/email.js'
import Files from "react-butterfiles";

class SendEmail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            to: null,
            subject: null,
            body: null,
            file: null,
            isShowing: false,
            emailSent: false
        };
        this.sendAnEmail = this.sendAnEmail.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.toggleFileInput = this.toggleFileInput.bind(this)
        this.fileInput = React.createRef()
    }

    async sendAnEmail() {

      //send all data as formdata
      //HOW DO I HANDLE FORM DATA- lookup
      // var data = new FormData();
      // var attachment = document.querySelector('input[type="file"]').files[0]
      // data.append("attachment", attachment)
      // data.append( "to", "caz.polo@gmail.com")
      // data.append("subject", "Blank")
      // data.append("body", "This is an automated message from ford IDTE")

      // fetch("/idte/email", {
      //   mode: 'no-cors',
      //   method: "POST",
      //   body: data
      // }).then(function (res) {
      //   if (res.ok) {
      //     alert("Perfect! ");
      //   } else if (res.status == 401) {
      //     alert("Oops! ");
      //   }
      // }, function (e) {
      //   alert("Error submitting form!");
      // });

      //check email validity
      if(this.state.body == "" || this.state.body == null) {
        document.getElementById('error_msg').innerHTML 
                = '*Enter a body'
        return
      }
      else if(this.state.subject == "" || this.state.subject == null) {
        document.getElementById('error_msg').innerHTML 
                = '*Enter a subject'
        return
      }
      else if(this.state.to == "" || this.state.to == null) {
        document.getElementById('error_msg').innerHTML 
                = '*Enter the email to send to'
        return
      }
      else if(!this.state.to.includes('@')) {
        document.getElementById('error_msg').innerHTML 
                = '*Enter a valid email'
        return
      }
      else if (!this.state.file.includes('.png') && !this.state.file.includes('.jpg') && 
               !this.state.file.includes('.PNG') && !this.state.file.includes('.JPG')) {
        document.getElementById('error_msg').innerHTML 
                = '*Please enter a .jpg or a .png file'
        return
      }
      //check if there is attachment
      if (this.state.isShowing == false || this.fileInput.current.files[0] == null) {
        document.getElementById('sending_msg').innerHTML 
                = 'Sending email... '
        document.getElementById("loader").style.display = "inline";
        await Email.sendThatEmail(
          Email.createEmailObjectFromState(this.state)
        );
      }
      else {
        document.getElementById('sending_msg').innerHTML 
                = 'Sending email with image attachment... '
        document.getElementById("loader").style.display = "inline";
        const testFile = this.fileInput.current.files[0]
        if (testFile.size > 20971520) {
          document.getElementById('error_msg').innerHTML 
          = 'Ensure your attachment is less than 20 MB'
          document.getElementById('sending_msg').innerHTML 
                = ''
          document.getElementById("loader").style.display = "none";
          return
        }
        else {
          
          var x = await Email.uploadWithJSON(this.state, testFile)
          console.log('done with function')
        }
        
      }

      document.getElementById('sending_msg').innerHTML 
                = 'Email sent '
      document.getElementById('error_msg').innerHTML 
      = ''
      document.getElementById("loader").style.display = "none";
    }// end sendAnEmail  

    handleInputChange() {
      //update state variables on change 
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
        [name]: value
        })
    }// end handleInputChange

    toggleFileInput() {
      //toggle isShowing variable
      this.setState({
        isShowing: !this.state.isShowing
      })
    }// end toggleFileInput

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
          <div>
            <form>
              <label>Subject:
                <input name='subject' type='text' value={this.subject} onChange={this.handleInputChange}/>
              </label>
              &emsp;
              <label>To: 
                <input name='to' type='text' value={this.to} onChange={this.handleInputChange}/>
              </label>
              <br/>
              <label>Body: 
                <textarea
                  rows='4'
                  cols='50'
                  name='body'
                  value={this.body}
                  style={{ resize: 'none', width: '100%' }}
                  onChange={this.handleInputChange}
                ></textarea>
              </label>
              <br/>

              <br/>
              <div className='sendemail-buttons'>
                <input className='email-button-style' type='button' value='Attach image' onClick={this.toggleFileInput} ></input>
                {
                  this.state.isShowing?
                  <div>
                    <h4>Upload Single Image File:</h4>
                    <input className='email-button-style' type="file" name="file" onChange={this.handleInputChange} ref={this.fileInput}/> <br/><br/>
                  </div>
                  :null
                }
                <input className='email-button-style' style={{float: 'left'}} type="button" value="Send" onClick={this.sendAnEmail}/>
                <div className='sending-status'>
                  <label style={{float: 'left'}} id='sending_msg'/>
                  <div className="loader" id="loader" style={{float: 'left', display: 'none'}}></div>
                </div>
                <label style={{ color: '#FF0000'}} id='error_msg'/>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    );//end return
  }//end render
}

ReactDOM.render(<SendEmail />, document.getElementById('app'));
