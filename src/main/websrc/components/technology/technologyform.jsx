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
        <div className='background'>
          <img src={require('../../images/main.jpg')}></img>
        </div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <div className='technology-form'>
            <h1>Technology Submission Form</h1>
            <p>Sample Text</p>
            <table>
              <tbody>
                <tr>
                  <td>
                    <span>*Concept Title:</span>
                    <input id='title' type='text'></input>
                  </td>
                  <td id='col2'>
                    <span>Concept Description:</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Technology Category:</span>
                    <input id='category' type='text'></input>
                  </td>
                  <td id='col2' rowSpan='9'>
                    <textarea id='description' cols='35' rows='15'></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Concept Type:</span>
                    <input id='type' type='text'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Shipping City:</span>
                    <input id='city' type='text'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Shipping Country:</span>
                    <input id='country' type='text'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Source:</span>
                    <input id='source' type='text'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Ford Contact:</span>
                    <input id='contact' type='text'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Ford Presenter:</span>
                    <input id='presenter' type='text'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Director:</span>
                    <input id='director' type='text'></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Supplier Company:</span>
                    <input id='company' type='text'></input>
                  </td>
                </tr>
              </tbody>
            </table>
            <button>Submit Registration</button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<TestPage />, document.getElementById('app'));
