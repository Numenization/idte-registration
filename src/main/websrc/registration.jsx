import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/header.jsx';
import NavBar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import './css/styles.css';

class Registration extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <div className='background'>
            <img src={require('images/main.jpg')}></img>
          </div>

          <div className='top'>
            <Header />
            <NavBar />
          </div>

          <div className='content'>
            <Switch>
              <Route path='/register/form'>
                <div className='registration-form'>
                  <form>
                    <label>*First Name:</label>
                    <input type='text'></input>

                    <label>*Last Name: </label>
                    <input type='text'></input>

                    <label>*Email Address:</label>
                    <input type='text'></input>

                    <label>Nickname:</label>
                    <input type='text'></input>

                    <label>*Phone Number:</label>
                    <input type='text'></input>

                    <label>Cell Number:</label>
                    <input type='text'></input>

                    <label>*Company:</label>
                    <input type='text'></input>

                    <label>*City:</label>
                    <input type='text'></input>

                    <label>*Country:</label>
                    <input type='text'></input>

                    <label>*Technologies:</label>
                    <input type='text'></input>

                    <label>*Dates to Attend:</label>
                    <input type='text'></input>
                  </form>
                  <button>Submit Registration</button>
                </div>
              </Route>

              <Route path='/register/waiver'>
                <h1>Digital Waiver</h1>
                <p>
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text{' '}
                </p>
                <a href='/register'>Sign</a>
              </Route>

              <Route path='/register'>
                <div className='registration-buttons'>
                  <h1>Registration Page</h1>
                  <p>Sample Text</p>
                  <a href='/register/form'>Register as Supplier (Ford)</a>
                  <a href='/register/form'>Register as Supplier (Other)</a>
                  <a href='/register/form'>Register as Presenter</a>
                </div>
              </Route>

              <Route path='/technologies/waiver'>
                <h1>Digital Waiver</h1>
                <p>
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text Sample Text Sample Text Sample Text
                  Sample Text Sample Text{' '}
                </p>
                <a href='/technologies'>Sign</a>
              </Route>

              <Route path='/technologies'>
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
              </Route>

              <Route path='/admin'>
                <h1>Admin Panel</h1>
                <p>Sample Text</p>
              </Route>

              <Route path='/info/faq'>
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
              </Route>

              <Route path='/info/map'>
                <h1>Event Map</h1>
                <img id='map' src={require('./images/map.png')}></img>
              </Route>

              <Route path='/info/display'>
                <h1>Display Layout</h1>
                <h3>?</h3>
              </Route>

              <Route path='/info/contact'>
                <h1>Contact IDTE Team</h1>
                <h3>Ways to contact us:</h3>
                <ul>
                  <li>
                    Email: <a href=''>example@email.com</a>
                  </li>
                  <li>Phone: (800) 555-5555</li>
                </ul>
              </Route>

              <Route path='/info'>
                <h1>IDTE Information Hub</h1>
                <p>Sample Text</p>
                <ul>
                  <li>
                    <a href='/info/faq'>Event Info/FAQ</a>
                  </li>
                  <li>
                    <a href='/info/map'>Event Map</a>
                  </li>
                  <li>
                    <a href='/info/display'>Display Layout</a>
                  </li>
                  <li>
                    <a href='/info/contact'>Contact IDTE Team</a>
                  </li>
                </ul>
              </Route>

              <Route path='/'>
                <div class='home-container'>
                  <div class='home-container-row'>
                    <h1>Innovation and Drive Technology Expo</h1>
                  </div>
                  <div class='home-container-row'>
                    <p style={{ width: '40%' }}>
                      Sample Text Sample Text Sample Text Sample Text Sample
                      Text Sample Text Sample Text Sample Text Sample TextSample
                      Text Sample Text Sample Text Sample Text Sample Text
                      Sample Text Sample Text Sample Text Sample Text
                    </p>
                    <div class='home-container-cell'>
                      <h3>Technology Submission</h3>
                      <span>Closed!</span>
                      <a href='/technologies'>Click to Submit</a>
                    </div>
                    <div class='home-container-cell'>
                      <h3>IDTE Registration</h3>
                      <span>Closed!</span>
                      <a href='/register/waiver'>Click to Register</a>
                    </div>
                  </div>
                </div>
              </Route>
            </Switch>
          </div>

          <Footer />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Registration />, document.getElementById('app'));
