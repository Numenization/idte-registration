import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../header.jsx';
import NavBar from '../navbar.jsx';
import Footer from '../footer.jsx';
import '../../css/styles.css';
import '../../css/checkin.css';
import QRReader from 'react-qr-reader';
import Attendee from '../../data/attendee.js';

class Webcam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQR: false,
      result: '',
      delay: 300,
      eventDates: [],
      typingTimeout: 0,
      search: '',
      attendees: [],
      attendee: null,
      markEnabled: false,
      error: null,
      attendeeError: null,
      registrationStatus: '',
      eventDateText: '',
      eventDate: '',
      dayType: '',
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.req = this.req.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.searchAttendees = this.searchAttendees.bind(this);
    this.openImageDialog = this.openImageDialog.bind(this);
    this.getAttendee = this.getAttendee.bind(this);
    this.markAttended = this.markAttended.bind(this);
  }

  async searchAttendees() {
    if (this.state.search.length == 0) {
      this.setState({ attendees: [] });
      return;
    }

    const opts = { search: this.state.search };

    var suppliers = await Attendee.getAllSuppliers(opts);
    var evaluators = await Attendee.getAllEvaluators(opts);
    var presenters = await Attendee.getAllPresenters(opts);

    Array.prototype.push.apply(evaluators, presenters);
    Array.prototype.push.apply(suppliers, evaluators);

    this.setState({ attendees: suppliers });
  }

  handleTyping(e) {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      search: e.target.value,
      typingTimeout: setTimeout(() => {
        this.searchAttendees();
      }, 1000),
    });
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

  async getEventDates() {
    let res = await this.req('GET', '/idte/eventDateDetails');
    let dates = [];
    for (let event of Object.values(res)) {
      dates.push(event);
    }
    dates.sort();
    this.setState({ eventDates: dates }, () => {
      let d = new Date();
      // alright get this
      // getMonth() is 0 indexed. why?
      // and getDate() isnt! who came up with this?
      let month = `${d.getMonth() + 1}`.padStart(2, '0');
      let day = `${d.getDate()}`.padStart(2, '0');
      let year = d.getFullYear();

      let eventDate = month + '-' + day + '-' + year;
      let eventDateText = eventDate;

      if (this.state.eventDates.indexOf(eventDate) == -1) {
        eventDateText = eventDate + ' (No event running this day!)';
      }

      this.setState({ eventDateText: eventDateText, eventDate: eventDate });
    });
  }

  async markAttended() {
    if (!this.state.attendee) return;
    await this.req('POST', '/idte/admin/markAttended', {
      id: this.state.attendee.id,
      dayType: this.state.dayType,
    });
    this.getAttendee();
  }

  async getAttendee() {
    this.setState({ attendeeError: null }, async () => {
      let res = await this.req('POST', '/idte/admin/checkinFind', {
        id: this.state.result,
      });

      if (res.message) {
        this.setState({ attendeeError: res.message });
      } else {
        this.setState({ attendee: res }, () => {
          let registrationStatus = '';
          let attendee = this.state.attendee;
          let eventDate = this.state.eventDate;
          let canMark = false;
          let dayType = '';
          if (attendee) {
            if (attendee.setUpOne == eventDate) {
              canMark = true;
              dayType = 'setUpOne';
              registrationStatus =
                'Attended ' + eventDate + ': ' + attendee.setUpOneAttended;
            } else if (attendee.setUpTwo == eventDate) {
              canMark = true;
              dayType = 'setUpTwo';
              registrationStatus =
                'Attended ' + eventDate + ': ' + attendee.setUpTwoAttended;
            } else if (attendee.setUpThree == eventDate) {
              canMark = true;
              dayType = 'setUpThree';
              registrationStatus =
                'Attended ' + eventDate + ': ' + attendee.setUpThreeAttended;
            } else if (attendee.dryRun == eventDate) {
              canMark = true;
              dayType = 'dryRun';
              registrationStatus =
                'Attended ' + eventDate + ': ' + attendee.dryRunAttended;
            } else if (attendee.eventDayOne == eventDate) {
              canMark = true;
              dayType = 'eventDayOne';
              registrationStatus =
                'Attended ' + eventDate + ': ' + attendee.eventDayOneAttended;
            } else if (attendee.eventDayTwo == eventDate) {
              canMark = true;
              dayType = 'eventDayTwo';
              registrationStatus =
                'Attended ' + eventDate + ': ' + attendee.eventDayTwoAttended;
            } else if (attendee.eventDayThree == eventDate) {
              canMark = true;
              dayType = 'eventDayThree';
              registrationStatus =
                'Attended ' + eventDate + ': ' + attendee.eventDayThreeAttended;
            } else if (attendee.eventDayFour == eventDate) {
              canMark = true;
              dayType = 'eventDayFour';
              registrationStatus =
                'Attended ' + eventDate + ': ' + attendee.eventDayFourAttended;
            } else if (attendee.eventDayFive == eventDate) {
              canMark = true;
              dayType = 'eventDayFive';
              registrationStatus =
                'Attended ' + eventDate + ': ' + attendee.eventDayFiveAttended;
            } else {
              registrationStatus = 'Attendee is not registered for today!';
            }
          }
          this.setState({
            registrationStatus: registrationStatus,
            markEnabled: canMark,
            dayType: dayType,
          });
        });
      }
    });
  }

  handleScan(data) {
    console.log(data);
    if (data) {
      this.setState(
        {
          result: data,
        },
        this.getAttendee
      );
    }
  }

  handleError(err) {
    console.log(err);
    this.setState({ error: err.message });
  }

  openImageDialog() {
    this.refs.qrReader.openImageDialog();
  }

  async componentDidMount() {
    await this.getEventDates();
  }

  render() {
    let qr = null;
    if (this.state.showQR) {
      qr = this.state.error ? (
        <QRReader
          legacyMode
          ref='qrReader'
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '240px', margin: '0 auto' }}
        />
      ) : (
        <QRReader
          ref='qrReader'
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '240px', margin: '0 auto' }}
        />
      );
    }
    let uploadButton = this.state.error ? (
      <button id='link-button' onClick={this.openImageDialog}>
        Submit picture of QR Code
      </button>
    ) : null;
    let errorText = this.state.error
      ? 'Error accessing camera. Please choose a file to scan QR Code'
      : '';

    let attendeeName = this.state.attendee
      ? this.state.attendee.lastName + ', ' + this.state.attendee.firstName
      : '';

    let searchResults =
      this.state.attendees.length > 0
        ? this.state.attendees.map((attendee, i) => {
            let firstStyle = i == 0 ? { borderTop: '1px solid black' } : null;
            return (
              <div
                className='result'
                style={firstStyle}
                key={i}
                onClick={() => {
                  this.setState({ result: attendee.id }, this.getAttendee);
                }}
              >
                <p className='id'>{attendee.id}</p>
                <p className='info'>
                  {attendee.lastName}, {attendee.firstName}. {attendee.email},
                </p>
                <p className='info'>
                  Phone: {attendee.phoneNumber}, Cell: {attendee.cellNumber}
                </p>
              </div>
            );
          })
        : null;

    let attendeeError = this.state.attendeeError
      ? this.state.attendeeError
      : '';

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
          <div className='checkin-page'>
            <h1>Attendee Checkin</h1>
            <p>Event Date: {this.state.eventDateText}</p>
            <label htmlFor='id'>Attendee ID:</label>
            <input
              type='text'
              id='id'
              disabled
              value={this.state.result}
            ></input>
            <p>{attendeeName}</p>
            <p>{this.state.registrationStatus}</p>
            <p>{attendeeError}</p>
            <button
              id='link-button'
              disabled={!this.state.markEnabled}
              onClick={this.markAttended}
            >
              Mark as Attended
            </button>
            <div className='QR'>{qr}</div>
            <p>{errorText}</p>
            <button
              id='link-button'
              onClick={() => {
                this.setState({ showQR: !this.state.showQR });
              }}
            >
              Open QR Scanner
            </button>
            {uploadButton}
            <br />
            <label htmlFor='search'>Attendee Search:</label>
            <input type='text' id='search' onChange={this.handleTyping}></input>
            <br />
            <div className='search-results'>{searchResults}</div>
          </div>
        </div>
        <Footer />
      </div>
    ); //end return
  } //end render
}

ReactDOM.render(<Webcam />, document.getElementById('app'));
