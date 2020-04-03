import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class ThankYou extends React.Component {
  render() {
    const styles = {
      textAlign: 'center'
    };
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
          <div style={styles}>
            <h1>Thank You!</h1>
            <p>
              We have recieved your submission. You will recieve a confirmation
              email shortly.
            </p>
            <a id='link-button' href='/idte/index.html'>
              Return to Home
            </a>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<ThankYou />, document.getElementById('app'));
