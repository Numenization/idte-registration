import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import QRReader from 'react-qr-reader'

class Webcam extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result: 'No result',
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
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

            <Footer />
        </div>
      </div>
    );//end return
  }//end render
}

ReactDOM.render(<Webcam />, document.getElementById('app'));
