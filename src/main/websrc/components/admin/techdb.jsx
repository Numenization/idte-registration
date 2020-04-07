
import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import { Table, TableRow } from '../general/table.jsx';
import '../../css/styles.css';
import Modal from '../general/modal.jsx';
import Technology from '../../data/technologies.js';
import '../../css/registerform.css';
class TechDB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      selectedTech: null,
      loading: false,
      showEditModal: false,
      showAddModal: false,
      rowsPerPage: 10,
      numPages: 0,
      page: 0,
      technologiesOnPage: [],
      sortBy: null,
      search: '',
      technologies: [],
      categories: []
    };

    this.getTechnologies = this.getTechnologies.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.rowClick = this.rowClick.bind(this);
    this.setError = this.setError.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.setData = this.setData.bind(this);
    this.setNumPages = this.setNumPages.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setRowsPerPage = this.setRowsPerPage.bind(this);
    this.setTechnologiesOnPage = this.setTechnologiesOnPage.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.updateField = this.updateField.bind(this);
    this.clearTechValues = this.clearTechValues.bind(this);
    this.postNewTech = this.postNewTech.bind(this);
    this.pageButtonClick = this.pageButtonClick.bind(this);
    this.updateExistingUser = this.updateExistingUser.bind(this);
    this.deleteTechnology = this.deleteTechnology.bind(this);
    this.getRows = this.getRows.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.generatePaginationButtons = this.generatePaginationButtons.bind(this);
    this.runChild = this.runChild.bind(this);
    this.sortTechnologies = this.sortTechnologies.bind(this);
    this.getTechnologies = this.getTechnologies.bind(this);
    this.req = this.req.bind(this);
    this.updateDateString = this.updateDateString.bind(this);
    this.postATech = this.postATech.bind(this);
    this.getTechCategories = this.getTechCategories.bind(this);
  }
  async postATech() {
    for (let i = 0; i < this.state.errors.length; i++) {
      this.removeError(0);
    }
    try {
      await this.req(
        'POST',
        '/idte/technologies',
        Technology.createTechnologyObjectFromState(this.state)
      );
      window.location.href = 'http://localhost:8080/idte/index.html';
    } catch (e) {
      console.log(e.errors);
      for (const error of e.errors) {
        console.log(error);
        this.addError(error);
      }
    }
  }
  async req(method, url, opts = null) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response ? JSON.parse(xhr.response) : null);
        } else {
          reject({
            status: this.status,
            errors: xhr.response ? JSON.parse(xhr.response) : null
          });
        }
      };
      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send(JSON.stringify(opts));
    }).catch(err => {
      throw err;
    });
  }

  clearTechValues() {
    var values = [
     'id',
     'category',
     'comments',
     'dateCreated',
     'description',
     'director',
     'fordContact',
     'fordPresenter',
     'lastModified',
     'modifiedBy',
     'shippingCity',
     'shippingCounrty',
     'source',
     'supplierCompany',
     'title',
     'type',
     'categoryID'
    ];
    for (let property of values) {
      this.setState({ [property]: undefined });
    }
  }

  setError(err) {
    this.setState({
      technologies: this.state.technologies,
      error: err,
      selectedTech: this.state.selectedTech,
      loading: this.state.loading,
      showEditModal: this.state.showEditModal,
      showAddModal: this.state.showAddModal
    });
  }

  setLoading(val) {
    this.setState({
      technologies: this.state.technologies,
      error: this.state.error,
      selectedTech: this.state.selectedTech,
      loading: val,
      showEditModal: this.state.showEditModal,
      showAddModal: this.state.showAddModal
    });
  }

  setData(val) {
    this.setState({
      technologies: val,
      error: this.state.error,
      selectedTech: this.state.selectedTech,
      loading: this.state.loading,
      showEditModal: this.state.showEditModal,
      showAddModal: this.state.showAddModal
    });
  }

  setSelected(value, cb) {
    for (let [key, val] of Object.entries(value)) {
      if (val === null) value[key] = undefined;
      this.setState({ [key]: val });
    }
    this.setState(
      {
        technologies: this.state.technologies,
        error: this.state.error,
        selectedTech: value,
        loading: this.state.loading,
        showEditModal: this.state.showEditModal,
        showAddModal: this.state.showAddModal
      },
      cb
    );
  }

  setNumPages(val) {
    this.setState({ numPages: val });
  }

  setPage(val) {
    // if (val < 0 || val > this.state.numPages - 1) return;
    // var n = val * this.state.rowsPerPage;
    // var m = n + this.state.rowsPerPage;
    // var attendeesToPutOnPage = [];
    // for (var i = n; i < m; i++) {
    //   var attendee = this.state.attendees[i];
    //   if (attendee) attendeesToPutOnPage.push(attendee);
    // }
    this.setState({
      page: val
    });
    //this.setAttendeesOnPage(attendeesToPutOnPage);
  }

  nextPage() {
    if (this.state.page < this.state.numPages - 1)
      this.setPage(this.state.page + 1);
  }

  prevPage() {
    if (this.state.page > 0) this.setPage(this.state.page - 1);
  }

  setRowsPerPage(val) {
    this.setState({ rowsPerPage: val }, () => {
      var numPages = 0;
      if (this.state.technologies.length > this.state.rowsPerPage) {
        numPages = Math.ceil(
          this.state.technologies.length / this.state.rowsPerPage
        );
      }
      this.setNumPages(numPages);
      this.setPage(0);
    });
  }

  setTechnologiesOnPage(val) {
    this.setState({ technologiesOnPage: val });
  }

  toggleEditModal() {
    if (this.state.showEditModal) this.clearTechValues();
    this.setState({
      technologies: this.state.technologies,
      error: this.state.error,
      selectedTech: this.state.selectedTech,
      loading: this.state.loading,
      showEditModal: !this.state.showEditModal,
      showAddModal: this.state.showAddModal
    });
  }

  toggleAddModal() {
    if (this.state.showAddModal) this.clearTechValues();
    this.setState({
      technologies: this.state.technologies,
      error: this.state.error,
      selectedTech: this.state.selectedTech,
      loading: this.state.loading,
      showEditModal: this.state.showEditModal,
      showAddModal: !this.state.showAddModal
    });
  }

  async getTechnologies() {
    

    // set ourselves to loading and start
    this.setLoading(true);

    const opts =
      this.state.search.length > 0 ? { search: this.state.search } : null;

    
    var techs = await Technology.getTechnologies(opts);
    if (techs.statusText) {
      this.setError(techs.statusText);
      this.setLoading(false);
      return;
    }
 
    Array.push(tech);
   
  
    var numPages = 0;

    if (techs.length > this.state.rowsPerPage) {
      numPages = Math.ceil(techs.length / this.state.rowsPerPage);
    } else {
      numPage = 1;
    }s

    this.setNumPages(numPages);
    
    this.setPage(0);
    this.setLoading(false);
  }

  async searchTechnologies() {
    if (this.state.search.length == 0) return;

    this.setLoading(true);

    var techs = await Technology.findAllTechnologies();
    

    if (techs.statusText) {
      this.setError(techs.statusText);
      this.setLoading(false);
      return;
    }

    if (evaluators.statusText) {
  
    var numPages = 0;

    if (techs.length > this.state.rowsPerPage) {
      numPages = Math.ceil(techs.length / this.state.rowsPerPage);
    } else {
      numPages = 1;
    }

    this.setNumPages(numPages);
    this.setData(techs);
    this.setPage(0);
    this.setLoading(false);
  }
  }
  pageButtonClick(e) {
    this.setPage(parseInt(e.target.id));
  }

  rowClick(e) {
    const columnData = JSON.parse(
      e.target.parentElement.getAttribute('data-columns')
    );

    this.setSelected(columnData, () => {
      this.toggleEditModal();
    });
  }

  updateField(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async postNewTech() {
    const selection = document.getElementById('technology');
    if (!selection) return;
    await Technology.postTechnology(
      Technology.createTechnologyObjectFromState(this.state)
    );
    

    this.getTechnologies();
    this.toggleAddModal();
  }

  async updateExistingUser() {
    await Technology.updateTechnology(
      Technology.createTechnologyObjectFromState(this.state)
    );
    this.getTechnologies();
    this.toggleEditModal();
  }

  async deleteTechnology() {
    var response = window.confirm('Are you sure you want to delete this technology?');
    if (!response) return;
    await Technology.deleteTechnology({ email: this.state.email });
    this.getTechnologies();
    this.toggleEditModal();
  }

  async getTechCategories() {
    const opts = null;
    this.setState({ loading: true });
    var categories = await Technology.getCategories(opts);
    if (categories.statusText) {
      this.setState({ error: categories.statusText, loading: false });
    }
    this.setState({ categories: categories, loading: false });
  }

  async componentDidMount() {
    this.getTechCategories();
  }

  async getTechnologies() {
    let res = await this.req('GET', '/idte/technologies');
    this.setState({ technologies: res.status });
  }

  async componentDidMount() {
    this.getTechnologies();
   
    this.getTechnologies();
  }

  getRows(dataColumns) {
    if (!this.state.technologies) return null;

    var sortedTechnologies = this.sortTechnologies(this.state.sortBy);
    var val = this.state.page;

    if (val < 0 || val > this.state.numPages - 1) return;
    var n = val * this.state.rowsPerPage;
    var m = n + this.state.rowsPerPage;
    var technologiesToPutOnPage = [];
    for (var i = n; i < m; i++) {
      var technology = sortedTechnologies[i];
      if (technology) technologiesToPutOnPage.push(technology);
    }

    return technologiesToPutOnPage.map((user, key) => {
      return (
        <TableRow
          key={
            key +
            this.state.page * this.state.rowsPerPage +
            this.state.sortBy * 1000
          }
          data={user}
          columns={dataColumns}
          onClick={this.rowClick}
        />
      );
    });
  }

  runChild(fun) {
    return fun();
  }

  generatePaginationButtons(numPages) {
    if (numPages <= 1) return null;
    if (numPages <= 10) {
      return (
        <div className='pagination-buttons'>
          <button className='back-button' onClick={this.prevPage} key='909090'>
            &larr;
          </button>
          {Array.from({ length: this.state.numPages }, (item, index) => {
            var cName = '';
            if (this.state.page == index) {
              cName = 'selected';
            }
            return (
              <button
                className='page-button'
                key={index}
                onClick={this.pageButtonClick}
                id={index}
                className={cName}
              >
                {index + 1}
              </button>
            );
          })}
          <button
            className='forward-button'
            onClick={this.nextPage}
            key='909091'
          >
            &rarr;
          </button>
        </div>
      );
    } else {
      const currentPage = this.state.page;
      return (
        <div className='pagination-buttons'>
          {this.runChild(() => {
            if (currentPage >= 2)
              return (
                <div>
                  <button
                    className='first-button'
                    id='0'
                    onClick={this.pageButtonClick}
                  >
                    First
                  </button>
                  <button className='back-button' onClick={this.prevPage}>
                    &larr;
                  </button>
                  <span> </span>
                  <button
                    key={currentPage - 2}
                    id={currentPage - 2}
                    onClick={this.pageButtonClick}
                  >
                    {currentPage - 1}
                  </button>
                  <button
                    key={currentPage - 1}
                    id={currentPage - 1}
                    onClick={this.pageButtonClick}
                  >
                    {currentPage}
                  </button>
                </div>
              );
          })}
          {this.runChild(() => {
            if (currentPage == 1)
              return (
                <button
                  key={currentPage - 1}
                  id={currentPage - 1}
                  onClick={this.pageButtonClick}
                >
                  {currentPage}
                </button>
              );
          })}
          <button
            className='selected'
            key={currentPage}
            id={currentPage}
            onClick={this.pageButtonClick}
          >
            {currentPage + 1}
          </button>
          {this.runChild(() => {
            if (currentPage == numPages - 2)
              return (
                <button
                  key={currentPage + 1}
                  id={currentPage + 1}
                  onClick={this.pageButtonClick}
                >
                  {currentPage + 2}
                </button>
              );
          })}
          {this.runChild(() => {
            if (currentPage < numPages - 2)
              return (
                <div>
                  <button
                    key={currentPage + 1}
                    id={currentPage + 1}
                    onClick={this.pageButtonClick}
                  >
                    {currentPage + 2}
                  </button>
                  <button
                    key={currentPage + 2}
                    id={currentPage + 2}
                    onClick={this.pageButtonClick}
                  >
                    {currentPage + 3}
                  </button>
                  <span> </span>
                  <button className='forward-button' onClick={this.nextPage}>
                    &rarr;
                  </button>
                  <button
                    className='last-button'
                    id={numPages - 1}
                    onClick={this.pageButtonClick}
                  >
                    Last
                  </button>
                </div>
              );
          })}
        </div>
      );
    }
  }

  updateDateString(e) {
    let element = e.target;
    if (element.id == 'checkbox') {
      // update the cooresponding field to make sure we have valid values
      let dropdown = element.parentElement.childNodes[2];

      if (element.checked) {
        if (dropdown.value == '-- select a technology --') {
          dropdown.selectedIndex = 1;
        }
      } else {
        dropdown.selectedIndex = 0;
      }
    } else if (element.id == 'dropdown') {
      // update the cooresponding field to make sure we have valid values
      let checkbox = element.parentElement.childNodes[0];

      if (element.value != '-- select a technology --') {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    }
    // start generating the date string
    let rawRows = element.parentElement.parentElement.childNodes;
    let rows = [];
    for (let row of rawRows) {
      if (row.tagName == 'DIV') {
        rows.push(row);
      }
    }

    let dateString = '';

    for (let row of rows) {
      let rowCheckbox = row.childNodes[0];
      let rowDropdown = row.childNodes[2];

      if (rowCheckbox.checked) {
        let stringlet = row.id;
        stringlet = stringlet + ':' + rowDropdown.value;

        dateString = dateString + ',' + stringlet;
      }
    }

    if (dateString.length > 0) {
      dateString = dateString.substring(1);
    }

    this.setState({ dateString: dateString });
  }

  sortTechnologies(sortBy) {
    const dict = {
      0: 'id',
      1: 'category',
      2: 'comments',
      3: 'type',
      4: 'dateCreated',
      5: 'lastModified',
      6: 'modifiedBy',
      7: 'company',
      8: 'country',
      9: 'city'
    };
    var listToSort = this.state.technologies;

    listToSort.sort((a, b) => (a[dict[sortBy]] > b[dict[sortBy]] ? 1 : -1));
    return listToSort;
  }

  render() {
    
    const categories = this.state.categories;
    if (this.state.error) {
      console.log(this.state.error);
    }

    const tableColumns = [
      'Type',
      'Category',
      'Comments',
      'Date Created',
      'Description',
      'Director',
      'Ford Contact',
      'Ford Presenter',
      'Last Modified',
      'Modified By',
      'Shipping City',
      'Shipping Country',
      'Source',
      'Supplier Company',
      'Title',
      'Category ID'
    ];

    const dataColumns = [
      'type',
      'category',
      'comments',
      'dateCreated',
      'description',
      'director',
      'fordContact',
      'fordPresenter',
      'lastModified',
      'modifiedBy',
      'shippingCity',
      'shippingCountry',
      'source',
      'supplierCompany',
      'title',
      'categoryID'
    ];

    const buttonWidth = {
      width: '30%',
      display: 'inline-block',
      boxSizing: 'border-box'
    };

    const addModalInner = (   
      <div>
        <h2>Create New Technology</h2>
        <label id='technology'>New Technology: </label> 
        <br />
        <table className='modal-two-col-table'>
          <tbody>
            <tr>
              <td>
                <span>Type: </span>
                <input
                  type='text'
                  name='type'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                    <span>Technology Category:</span>
                    <select
                      id='category'
                      name='category'
                      onChange={e => {
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
            </tr>
            <tr>
              <td>
                <span>Director: </span>
                <input
                  type='text'
                  name='director'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Ford Contact: </span>
                <input
                  type='text'
                  name='fordContact'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Ford Presenter: </span>
                <input
                  type='text'
                  name='fordPresenter'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Shipping City: </span>
                <input
                  type='text'
                  name='shippingCity'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Shipping Country: </span>
                <input
                  type='text'
                  name='shippingCountry'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Source: </span>
                <input
                  type='text'
                  name='source'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Supplier Company: </span>
                <input
                  type='text'
                  name='supplierCompany'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Title: </span>
                <input
                  type='text'
                  name='title'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <span>Comments:</span>
        <br />
        <textarea
          rows='4'
          cols='50'
          name='comments'
          style={{ resize: 'none', width: '100%' }}
          onChange={this.updateField}
        ></textarea>
        <br />
        <button
          id='link-button'
          style={{
            width: '250px',
            display: 'inline-block',
            boxSizing: 'border-box',
            fontSize: '1em',
            margin: '0.5em 0'
          }}
          onClick={this.postNewTech}
        >
          Post New Technology
        </button>
      </div>
    );

    const selectedTech = this.state.selectedTech;
    const editModalInner = selectedTech ? (
      <div>
        <h2>Edit Technology</h2>
        <span>Technology ID: {selectedTech.id}</span>
        <br />
        <span>Technology Type: {selectedTech.type}</span>
        <br />
        <table className='modal-two-col-table'>
          <tbody>
            <tr>
              <td>
                <span>First Name: </span>
                <input
                  type='text'
                  defaultValue={selectedTech.firstName}
                  name='firstName'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Last Name: </span>
                <input
                  type='text'
                  defaultValue={selectedTech.lastName}
                  name='lastName'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Nickname: </span>
                <input
                  type='text'
                  defaultValue={selectedTech.nickname}
                  name='nickname'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Email: </span>
                <input
                  type='text'
                  defaultValue={selectedTech.email}
                  name='email'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Phone Number: </span>
                <input
                  type='text'
                  defaultValue={selectedTech.phoneNumber}
                  name='phoneNumber'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>Cell Number: </span>
                <input
                  type='text'
                  defaultValue={selectedTech.cellNumber}
                  name='cellNumber'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Country: </span>
                <input
                  type='text'
                  defaultValue={selectedTech.country}
                  name='country'
                  onChange={this.updateField}
                ></input>
              </td>
              <td>
                <span>City: </span>
                <input
                  type='text'
                  defaultValue={selectedTech.city}
                  onChange={this.updateField}
                  name='city'
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <span>Company*: </span>
                <input
                  type='text'
                  defaultValue={selectedTech.company}
                  name='company'
                  onChange={this.updateField}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        {this.state.eventDates.map((date, i) => {
          const dateString = this.state.dateString;
          if (!dateString) return;

          const dateStrings = dateString.split(',');
          let dates = [];
          let techs = [];

          for (let str of dateStrings) {
            let dateStr = str.split(':')[0];
            let techOnDate = str.split(':')[1];

            dates.push(dateStr);
            techs.push(techOnDate);
          }

          let checked = (
            <input
              type='checkbox'
              id='checkbox'
              onChange={this.updateDateString}
            ></input>
          );
          let tech = '-- select a technology --';

          for (let i = 0; i < dates.length; i++) {
            if (dates[i] == date) {
              checked = (
                <input
                  type='checkbox'
                  id='checkbox'
                  defaultChecked
                  onChange={this.updateDateString}
                ></input>
              );
              tech = techs[i];
            }
          }

          return (
            <div className='date-tech-selector-row' key={i} id={date}>
              {checked}
              <label>{date}</label>
              <select
                defaultValue={tech}
                id='dropdown'
                onChange={this.updateDateString}
              >
                <option disabled value='-- select a technology --'>
                  -- select a technology --
                </option>
                {this.state.technologies.map((tech, k) => {
                  return (
                    <option key={k} value={tech}>
                      {tech}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
        <span>Comments:</span>
        <br />
        <textarea
          rows='4'
          cols='50'
          name='comments'
          onChange={this.updateField}
          style={{ resize: 'none', width: '100%' }}
          defaultValue={selectedTech.comments}
        ></textarea>
        <br />
        <span>Date Created: {selectedTech.dateCreated}</span>
        <br />
        <span>Date Last Modified: {selectedTech.lastModified}</span>
        <br />
        <span>Last Modified By: {selectedTech.modifiedBy}</span>
        <br />
        <button
          id='link-button'
          onClick={this.updateExistingUser}
          style={{
            width: '250px',
            display: 'inline-block',
            boxSizing: 'border-box',
            fontSize: '1em',
            margin: '0.5em 0'
          }}
        >
          Update Technology Fields
        </button>
        <button
          id='link-button'
          onClick={this.deleteTechnology}
          style={{
            width: '250px',
            display: 'inline-block',
            boxSizing: 'border-box',
            fontSize: '1em',
            margin: '0.5em 0',
            float: 'right'
          }}
        >
          Delete Technology
        </button>
        <br />
        <span style={{ fontSize: '0.8em' }}>* - Supplier Only Fields</span>
      </div>
    ) : null;

    const paginatedButtons = this.generatePaginationButtons(
      this.state.numPages
    );
    //          <img src={require('../../images/main.jpg')}></img>
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
          <h1>Database Administration Interface</h1>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <label htmlFor='sort-by-select'>Sort Table By: </label>
              <select
                id='sort-by-select'
                onChange={e => {
                  var sortBy = e.target.value;
                  this.setState({ sortBy: sortBy });
                }}
                defaultValue='-- select an option --'
              >
                <option disabled>-- select an option --</option>
                <option value={0}>Last Name</option>
                <option value={1}>First Name</option>
                <option value={2}>Email</option>
                <option value={3}>Type</option>
                <option value={4}>Date Created</option>
                <option value={5}>Date Last Modified</option>
                <option value={6}>Last Modified By</option>
                <option value={7}>Company</option>
                <option value={8}>Country</option>
                <option value={9}>City</option>
              </select>
            </div>
            <div>
              <label htmlFor='search-input'>Search: </label>
              <input
                type='text'
                onChange={e => {
                  this.setState({ search: e.target.value });
                }}
                onKeyDown={e => {
                  if (e.keyCode == 13) {
                    this.setState(
                      { search: e.target.value },
                      this.getTechnologies
                    );
                  }
                }}
              ></input>
              <button onClick={this.getTechnologies}>Submit Search</button>
            </div>
            <div>
              <label htmlFor='rows-per-page-select'>Entries per page: </label>
              <select
                id='rows-per-page-select'
                onChange={e => {
                  this.setRowsPerPage(parseInt(e.target.value));
                }}
              >
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value='75'>75</option>
                <option value='100'>100</option>
              </select>
            </div>
          </div>

          <Table
            className='admin-database-table'
            columns={tableColumns}
            loading={this.state.loading}
            columns={tableColumns}
          >
            {this.getRows(dataColumns, this.state.technologiesOnPage)}
          </Table>
          {paginatedButtons}

          <button
            id='link-button'
            style={buttonWidth}
            onClick={this.toggleAddModal}
          >
            Add entry to Technologies
          </button>
          <br />
          <a id='link-button' href='admin.html' style={buttonWidth}>
            Back to Admin Page
          </a>
        </div>

        <Footer />
        <Modal
          show={this.state.showEditModal}
          onClose={this.toggleEditModal}
          style={{ width: '700px' }}
        >
          {editModalInner}
        </Modal>
        <Modal
          show={this.state.showAddModal}
          onClose={this.toggleAddModal}
          style={{ width: '700px' }}
        >
          {addModalInner}
        </Modal>
      </div>
    );
  }
}







ReactDOM.render(<TechDB/>, document.getElementById('app'));