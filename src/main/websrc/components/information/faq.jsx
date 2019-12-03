import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class FaqPage extends React.Component {
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
            <h1>Event information</h1>
            <p>
                Sample TextSample TextSample TextSample TextSample TextSample
                TextSample TextSample TextSample TextSample TextSample
                TextSample TextSample TextSample TextSample TextSample
                TextSample TextSample TextSample TextSample TextSample
                TextSample TextSample TextSample TextSample TextSample
                TextSample TextSample TextSample TextSample TextSample
                TextSample TextSample TextSample TextSample TextSample
                TextSample Text
            </p>
            <ul>
                <li>Sample Text</li>
                <li>Sample Text</li>
                <li>Sample Text</li>
                <li>Sample Text</li>
            </ul>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<FaqPage />, document.getElementById('app'));