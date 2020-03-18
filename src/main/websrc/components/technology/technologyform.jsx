import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Technology from "../../data/technologies.js";
class TestPage extends React.Component {
constructor(props){
  super(props);
  this.state = {
    title : "",
    type : "",
    category :"",
    shippingCity : "",
    shippingCountry : "",
    description: "",
    source : "",
    fordContact : "",
    fordPresenter : "",
    director : "",
    supplierCompany : "",
    categories: [],
    loading: false,
    error:null
  }
  this.handleChange = this.handleChange.bind(this);
  this.postATech = this.postATech.bind(this);
  this.getTechCategories = this.getTechCategories.bind(this);
}
async getTechCategories(){
  this.setState({loading: true});

  var categories = await Technology.getCategories();
  if (categories.statusText){
    this.setState({error: categories.statusText, loading:false});
  }
  this.setState({categories: categories, loading:false});
}

async componentDidMount(){
  this.getTechCategories();
}

async postATech(){
  await Technology.postTechnology(
      Technology.createTechnologyObjectFromState(this.state)
  );
}

handleChange() {
  const target = event.target;
  const value = target.value;
  const name = target.name;

  this.setState({
  [name]: value
  });
}
  render() {
    const categories = this.state.categories;
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
                    <input id='title' name='title' type='text' value={this.title} onChange={this.handleChange}></input>
                  </td>
                  <td id='col2'>
                    <span>Concept Description:</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Technology Category:</span>
                    <select id='category' name='category'>
                    <option disabled selected value>
                       -- select a category --
                    </option>
                  {categories.map((category,i) =>{
                    return(
                        <option key={i} id={category.id} value={this.category}>
                          {category.category}
                       </option>
                    )
                  }
                  )}
                    </select>
                  </td>
                  <td id='col2' rowSpan='9'>
                    <textarea id='description' name='description' cols='35' rows='15' value = {this.description} onChange={this.handleChange}></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Concept Type:</span>
                    <input id='type' type='text' name='type' value={this.type} onChange={this.handleChange}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Shipping City:</span>
                    <input id='city' type='text'  name='shippingCity' value={this.shippingCity} onChange={this.handleChange}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Shipping Country:</span>
                    <input id='country' type='text' name='shippingCountry' value={this.shippingCountry} onChange={this.handleChange}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Source:</span>
                    <input id='source' type='text' name='source' value={this.source} onChange={this.handleChange}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Ford Contact:</span>
                    <input id='contact' type='text' name='fordContact' value={this.fordContact} onChange={this.handleChange}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Ford Presenter:</span>
                    <input id='presenter' type='text' name='fordPresenter' value={this.fordPresenter} onChange={this.handleChange}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Director:</span>
                    <input id='director' type='text' name='director' value={this.director} onChange={this.handleChange}></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Supplier Company:</span>
                    <input id='company' type='text' name='supplierCompany' value={this.supplierCompany} onChange={this.handleChange}></input>
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick= {this.postATech}>Submit Registration</button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<TestPage />, document.getElementById('app'));
