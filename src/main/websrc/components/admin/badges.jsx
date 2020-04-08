import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/badges.css';
import Attendee from '../../data/attendee.js';

class BadgePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attendees: [],
      pages: [],
    };

    this.getAttendees = this.getAttendees.bind(this);
    this.pagifyAttendees = this.pagifyAttendees.bind(this);
    this.req = this.req.bind(this);
  }

  async req(method, url, opts = null) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(
            xhr.response
              ? xhr.getResponseHeader('Content-Type') == 'application/json'
                ? JSON.parse(xhr.response)
                : xhr.response
              : null
          );
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

  async getAttendees() {
    // first get all the attendees and put them in our attendee array
    var suppliers = await Attendee.getAllSuppliers(null);
    var evaluators = await Attendee.getAllEvaluators(null);
    var presenters = await Attendee.getAllPresenters(null);

    Array.prototype.push.apply(evaluators, presenters);
    Array.prototype.push.apply(suppliers, evaluators);

    await this.addQRCodes(suppliers);

    this.setState({ attendees: suppliers }, this.pagifyAttendees);
  }

  async addQRCodes(attendees) {
    for (let attendee of attendees) {
      try {
        let res = await this.req('POST', '/idte/admin/attendeeQR', {
          id: attendee.id,
        });

        attendee.qrCode = 'data:image/png;base64,' + res;
      } catch (e) {
        console.log(e);
      }
    }
  }

  pagifyAttendees() {
    // only about 6 badges fit to a page, so we gotta break up the attendees
    // into groups of 6
    let attendees = this.state.attendees;
    let pages = [];
    let currentPage = [];
    for (let i = 0; i < attendees.length; i++) {
      currentPage.push(attendees[i]);
      if (currentPage.length >= 6) {
        pages.push(currentPage);
        currentPage = [];
      }
    }

    if (currentPage.length > 0) pages.push(currentPage);

    this.setState({ pages: pages });
  }

  componentDidMount() {
    this.getAttendees();
  }

  render() {
    return (
      <div className='body'>
        {this.state.pages.map((page, i) => {
          return (
            <div className='container'>
              <div className='page' key={i}>
                {page.map((attendee, j) => {
                  const company = attendee.company
                    ? attendee.company
                    : 'Ford Motor Company';

                  let typeClass = 'supplier-title';
                  if (attendee.type == 'Presenter')
                    typeClass = 'presenter-title';
                  if (attendee.type == 'Evaluator')
                    typeClass = 'evaluator-title';
                  const nameClass = attendee.nickname ? 'name' : 'nickname';
                  return (
                    <div className='badge' key={j}>
                      <img
                        className='logo'
                        src={require('../../images/ford_badge.png')}
                      ></img>
                      <img
                        className='banner'
                        src={require('../../images/IDTE.png')}
                      ></img>
                      <span className='nickname'>{attendee.nickname}</span>
                      <span className={nameClass}>
                        {attendee.firstName} {attendee.lastName}
                      </span>
                      <span className='company'>{company}</span>
                      <span className='location'>
                        {attendee.city}, {attendee.country}
                      </span>
                      <img className='qrCode' src={attendee.qrCode}></img>
                      <span className='dates-of-attendance'>
                        9 10 11 12 13{' '}
                      </span>
                      <span className={typeClass}>
                        {attendee.type.toUpperCase()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<BadgePage />, document.getElementById('app'));
