import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';

class EditTechnologies extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='background'></div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <h1>Edit Technologies</h1>
          <label>Technology Name: </label>
          <input type='text'></input>
          <select>
            <option>Add</option>
            <option>Remove</option>
          </select>
          <div className='submit'>
            <a>Submit</a>
          </div>
          <label>Category Name: </label>
          <input type='text'></input>
          <select>
            <option>Add</option>
            <option>Remove</option>
          </select>
          <div className='submit'>
            <a>Submit</a>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<EditTechnologies />, document.getElementById('app'));
