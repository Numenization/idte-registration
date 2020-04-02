import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header.jsx';
import NavBar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import './css/styles.css';
import QRReader from 'react-qr-reader'

class Webcam extends React.Component {

  state = {
    result: 'No result'
  }

  hadnleScan = data =>
  {
    if (data)
    {
      this.setState ({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
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

        <div className='QR'>
          <QRReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{width:'100%'}}
            />
            <p>{this.state.result}</p>
        </div>

        <div className='content'>
          <h1>Send an email</h1>
          <div>
            <form>
              <div id='inputs'>
                <label id='field_subject'>Subject:
                  <input name='subject' type='text' value={this.subject} onChange={this.handleInputChange}/>
                </label>
                &emsp;
                <label id='field_to'>To: 
                  <input name='to' type='text' value={this.to} onChange={this.handleInputChange}/>
                </label >
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

ReactDOM.render(<Webcam />, document.getElementById('app'));
