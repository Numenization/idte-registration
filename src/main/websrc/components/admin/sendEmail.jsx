import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Email from '../../data/email.js'
//import Files from "react-butterfiles";

class SendEmail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            to: null,
            subject: null,
            body: null,
            file: null,
            isShowing: false,
            emailSent: false,
            fname: null,
            blastOption: '',
            useBlast: false
        };
        this.sendAnEmail = this.sendAnEmail.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.toggleFileInput = this.toggleFileInput.bind(this)
        this.fileInput = React.createRef()
        this.hideInputs = this.hideInputs.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.toggleBlast = this.toggleBlast.bind(this);
    }

    async sendAnEmail() {
      
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
      else if(this.state.useBlast == false && (this.state.to == "" || this.state.to == null)) {
        console.log(this.state.useBlast)
        document.getElementById('error_msg').innerHTML 
                = '*Enter the email to send to'
        return
      }
      else if(this.state.useBlast == false && !this.state.to.includes('@')) {
        document.getElementById('error_msg').innerHTML 
                = '*Enter a valid email'
        return
      }
      else if (this.state.file != null && this.state.file.includes('.bat') && !this.state.file.includes('.BAT')) {
        document.getElementById('error_msg').innerHTML 
                = '*bat files are not allowed'
        return
      }
      else if (this.state.file != null && this.state.file.includes('.jar') && !this.state.file.includes('.JAR')) {
        document.getElementById('error_msg').innerHTML 
                = '*jar files are not allowed'
        return
      }
      else if (this.state.file != null && this.state.file.includes('.zip') && !this.state.file.includes('.ZIP')) {
        document.getElementById('error_msg').innerHTML 
                = '*zip files are not allowed'
        return
      }
      else if (this.state.blastOption == '') {
        document.getElementById('error_msg').innerHTML 
                = '*Please choose a blast option'
        return
      }
      //check if there is attachment
      if (this.state.isShowing == false || this.fileInput.current.files[0] == null) {
        this.hideInputs();
        document.getElementById('sending_msg').innerHTML 
                = 'Sending email... '
        document.getElementById("loader").style.display = "inline";
        document.getElementById('error_msg').innerHTML = ''
        await Email.sendThatEmail(
          Email.createEmailObjectFromState(this.state)
        );
        this.state.emailSent = true
      }
      else {
        
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
          this.hideInputs();
          document.getElementById('sending_msg').innerHTML 
                = 'Sending email with file attachment... '
          document.getElementById("loader").style.display = "inline"
          this.state.fname = testFile.name
          await Email.uploadWithJSON(this.state, testFile)
          this.state.emailSent = true
        }
        
      }
      this.setState({emailSent: true})
      this.setState({useBlast: false})
      document.getElementById('sending_msg').innerHTML 
                = 'Email sent '
      document.getElementById('error_msg').innerHTML = ''
      document.getElementById("loader").style.display = "none"
    }// end sendAnEmail  

    async hideInputs() {
      document.getElementById('inputs').style.display = "none"
    }

    handleInputChange() {
      //update state variables on change 
      const target = event.target;
      const value = target.value;
      const name = target.name;
      
      this.setState({
      [name]: value
      })
    }// end handleInputChange

    handleOptionChange() {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      //this.state.blastOption = value
      this.setState({
        [name]: value
        })
    }

    toggleFileInput() {
      //toggle isShowing variable
      this.setState({
        isShowing: !this.state.isShowing,
        file: null
      })
    }// end toggleFileInput

    toggleBlast() {
      //toggle useBlast variable
      this.setState({
        useBlast: !this.state.useBlast,
        blastOption: ''
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
              {
                !this.state.emailSent?
                <div className='sendemail-buttons'>
                  <input id='field_button' className='email-button-style' type='button' value='Send blast email' onClick={this.toggleBlast} ></input>
                  {
                    this.state.useBlast?
                    <div>
                      <label>
                        Who do you want to send this to?
                      </label>

                      <div className="radio">
                        <label>
                          <input 
                          type="radio" 
                          name="blastOption"
                          value="allAttendees" 
                          checked={this.state.blastOption === 'allAttendees'} 
                          onChange={this.handleOptionChange}/>
                          All attendees
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input 
                            type="radio" 
                            name="blastOption"
                            value="allPresenters" 
                            checked={this.state.blastOption === 'allPresenters'} 
                            onChange={this.handleOptionChange}/>
                          All presenters
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input 
                            type="radio" 
                            name="blastOption"
                            value="allSuppliers" 
                            checked={this.state.blastOption === 'allSuppliers'} 
                            onChange={this.handleOptionChange}/>
                          All suppliers
                        </label>
                      </div>
                      <div className="radio">
                        <label>
                          <input 
                            type="radio" 
                            name="blastOption"
                            value="allEvaluators" 
                            checked={this.state.blastOption === 'allEvaluators'} 
                            onChange={this.handleOptionChange}/>
                          All evaluators
                        </label>
                      </div>
                    </div>
                    :null
                  }
                </div>
                :null
              }
              
              

              <div id='inputs'>
                <label id='field_subject'>Subject:
                  <input name='subject' type='text' value={this.subject} onChange={this.handleInputChange}/>
                </label>
                &emsp;
                {
                  !this.state.useBlast?
                  <label id='field_to'>To: 
                    <input name='to' type='text' value={this.to} onChange={this.handleInputChange}/>
                  </label >
                  :null
                }
                
                <br/>
                <label id='field_body'>Body: 
                  <textarea
                    rows='4'
                    cols='50'
                    name='body'
                    value={this.body}
                    style={{ resize: 'none', width: '100%' }}
                    onChange={this.handleInputChange}
                  ></textarea>
                </label><br/><br/>
              
                <div className='sendemail-buttons'>
                  <input id='field_button' className='email-button-style' type='button' value='Add attachment' onClick={this.toggleFileInput} ></input>
                  {
                    this.state.isShowing?
                    <div>
                      <h4>Upload a File:</h4>
                      <input id='field_fileup' className='email-button-style' type="file" name="file" value={this.file} onChange={this.handleInputChange} ref={this.fileInput}/> <br/><br/>
                    </div>
                    :null
                  }
                  <input className='email-button-style' style={{float: 'left'}} type="button" value="Send" onClick={this.sendAnEmail}/>
                </div>
              </div>

              <div className='sending-status'>
                <label id='sending_msg'/>
                <div className="loader" id="loader" style={{ display: 'none'}}></div>
              </div>
              <label style={{ color: '#FF0000'}} id='error_msg'/>

              {
                this.state.emailSent?
                <div className='sendemail-buttons'>
                  <a className='email-button-style' href="sendemail.html">Send another</a>
                  <a className='email-button-style' href="admin.html" >Back</a>
                </div>
                :null
              }
              
              
            </form>
          </div>
        </div>

        <Footer />
      </div>
    );//end return
  }//end render
}

ReactDOM.render(<SendEmail />, document.getElementById('app'));
