import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class TestPage extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='background'></div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <div className='technology-form'>
            <h1>Technology submission page</h1>
            <p>Sample Text</p>
            <form>
              <label>*Concept Title:</label>
              <input type='text'></input>

              <label>Concept Description:</label>
              <input type='text'></input>

              <label>*Technology Category:</label>
              <input type='text'></input>

              <label>*Concept Type:</label>
              <input type='text'></input>

              <label>*Shipping City:</label>
              <input type='text'></input>

              <label>*Shipping Country:</label>
              <input type='text'></input>

              <label>*Source:</label>
              <input type='text'></input>

              <label>*Ford Contact:</label>
              <input type='text'></input>

              <label>*Ford Presenter:</label>
              <input type='text'></input>

              <label>*Director:</label>
              <input type='text'></input>

              <label>*Supplier Company:</label>
              <input type='text'></input>
            </form>
            <button>Submit Registration</button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<TestPage />, document.getElementById('app'));
