import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import Technology from '../../data/technologies.js';
import Event from '../../data/changeregistration.js';
import ErrorTag from '../general/error.jsx';
class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      type: '',
      category: '',
      shippingCity: '',
      shippingCountry: '',
      description: '',
      source: '',
      fordContact: '',
      fordPresenter: '',
      director: '',
      supplierCompany: '',
      categories: [],
      loading: false,
      errors: [],
      email: '',
      to: '',
      body: '',
      subject: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.postATech = this.postATech.bind(this);
    this.getTechCategories = this.getTechCategories.bind(this);
    this.req = this.req.bind(this);
    this.closeError = this.closeError.bind(this);
    this.addError = this.addError.bind(this);
    this.removeError = this.removeError.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postATech = this.postATech.bind(this);
    this.getTechCategories = this.getTechCategories.bind(this);
  }

  async getTechStatus() {
    let k = await Event.getTechStatus();
    if (k.status == 'false') {
      window.location.href = 'http://localhost:8080/idte/index.html';
      alert('Technology Submission is Closed.');
    }
  }

  async getTechCategories() {
    this.setState({ loading: true });
    var categories = await Technology.getCategories();
    if (categories.statusText) {
      this.setState({ error: categories.statusText, loading: false });
    }
    this.setState({ categories: categories, loading: false });
  }

  async componentDidMount() {
    this.getTechCategories();
  }

  async postATech() {
    for (let i = 0; i < this.state.errors.length; i++) {
      this.removeError(0);
    }
    let tech = Technology.createTechnologyObjectFromState(this.state);
    try {
      await this.req('POST', '/idte/technologies', tech);
      window.location.href = 'http://localhost:8080/idte/thankyou.html';
    } catch (e) {
      console.log(e.errors);
      for (const error of e.errors) {
        console.log(error);
        this.addError(error);
      }
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  closeError(e) {
    let error = e.target.parentNode.parentNode;
    console.log(error);
    let errorKey = error.id;

    if (!errorKey) {
      console.log('Key not set in error properly');
      return;
    }

    this.removeError(errorKey);
  }

  addError(error) {
    let newErrors = this.state.errors;
    newErrors.push(error);

    this.setState({ errors: newErrors });
  }

  removeError(errorKey) {
    let newErrors = this.state.errors;
    newErrors.splice(errorKey, 1);

    this.setState({ errors: newErrors });
  }

  async req(method, url, opts = null) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response ? JSON.parse(xhr.response) : null);
        } else {
          reject({
            status: this.status,
            errors: xhr.response ? JSON.parse(xhr.response) : null,
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      };
      xhr.send(JSON.stringify(opts));
    }).catch((err) => {
      throw err;
    });
  }

  render() {
    const categories = this.state.categories;
    return (
      <div
        className='container'
        onLoad={async (e) => {
          await this.getTechStatus();
        }}
      >
        <div className='background'>
          <img src={require('../../images/main.jpg')}></img>
        </div>

        <div className='top'>
          <Header />
          <NavBar />
        </div>

        <div className='content'>
          <div className='admin-form-errors'>
            {this.state.errors.map((error, i) => {
              return (
                <ErrorTag onClose={this.closeError} key={i} index={i}>
                  {error.message.replace(/ *\[[^)]*\] */g, '')}
                </ErrorTag>
              );
            })}
          </div>
          <div className='technology-form'>
            <h1>Technology Submission Form</h1>
            <table>
              <tbody>
                <tr>
                  <td>
                    <span>*Concept Title:</span>
                    <input
                      id='title'
                      name='title'
                      type='text'
                      value={this.title}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                  <td id='col2'>
                    <span>Concept Description:</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Technology Category:</span>
                    <select
                      id='category'
                      name='category'
                      onChange={(e) => {
                        this.setState({ category: e.target.value });
                      }}
                    >
                      <option disabled selected value>
                        -- select a category --
                      </option>
                      {categories.map((category, i) => {
                        return (
                          <option
                            key={i}
                            id={category.id}
                            value={this.category}
                          >
                            {category.category}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td id='col2' rowSpan='9'>
                    <textarea
                      id='description'
                      name='description'
                      cols='35'
                      rows='15'
                      value={this.description}
                      onChange={this.handleChange}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Concept Type:</span>
                    <input
                      id='type'
                      type='text'
                      name='type'
                      value={this.type}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Shipping City:</span>
                    <input
                      id='city'
                      type='text'
                      name='shippingCity'
                      value={this.shippingCity}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Shipping Country:</span>
                    <input
                      id='country'
                      type='text'
                      name='shippingCountry'
                      value={this.shippingCountry}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Source:</span>
                    <input
                      id='source'
                      type='text'
                      name='source'
                      value={this.source}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Ford Contact:</span>
                    <input
                      id='contact'
                      type='text'
                      name='fordContact'
                      value={this.fordContact}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Ford Presenter:</span>
                    <input
                      id='presenter'
                      type='text'
                      name='fordPresenter'
                      value={this.fordPresenter}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Director:</span>
                    <input
                      id='director'
                      type='text'
                      name='director'
                      value={this.director}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Supplier Company:</span>
                    <input
                      id='company'
                      type='text'
                      name='supplierCompany'
                      value={this.supplierCompany}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>*Email:</span>
                    <input
                      id='email'
                      type='text'
                      name='email'
                      value={this.email}
                      onChange={this.handleChange}
                    ></input>
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={this.postATech}>Submit Registration</button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<TestPage />, document.getElementById('app'));
