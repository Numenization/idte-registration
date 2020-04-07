class Attendee {
  static createAttendeeObjectFromState(state = null) {
    if (!state) return;
    var attendee = {
      firstName: state.firstName,
      lastName: state.lastName,
      nickname: state.nickname,
      phoneNumber: state.phoneNumber,
      cellNumber: state.cellNumber,
      email: state.email,
      company: state.company,
      country: state.country,
      comments: state.comments,
      city: state.city,
      setUpOne: state.setUpOne,
      setUpTwo: state.setUpTwo,
      setUpThree: state.setUpThree,
      dryRun: state.dryRun,
      eventDayOne: state.eventDayOne,
      eventDayTwo: state.eventDayTwo,
      eventDayThree: state.eventDayThree,
      eventDayFour: state.eventDayFour,
      eventDayFive: state.eventDayFive,
      setUpOneTech: state.setUpOneTech,
      setUpTwoTech: state.setUpTwoTech,
      setUpThreeTech: state.setUpThreeTech,
      dryRunTech: state.dryRunTech,
      eventDayOneTech: state.eventDayOneTech,
      eventDayTwoTech: state.eventDayTwoTech,
      eventDayThreeTech: state.eventDayThreeTech,
      eventDayFourTech: state.eventDayFourTech,
      eventDayFiveTech: state.eventDayFiveTech,
    };

    for (let [key, val] of Object.entries(attendee)) {
      if (val === undefined) attendee[key] = null;
    }

    return attendee;
  }
  static async postSupplier(opts = null) {
    try {
      if (!opts) return;
      let res = await Attendee.req('POST', '/idte/admin/suppliers', opts);
      return res;
    } catch (e) {
      console.log(e.request);
      alert(
        'Error: ' +
          e.status +
          '\n' +
          e.statusText +
          '\n' +
          'Make sure all required fields are filled with valid values'
      );
    }
  }

  static async postEvaluator(opts = null) {
    try {
      if (!opts) return;
      let res = await Attendee.req('POST', '/idte/admin/evaluators', opts);
      return res;
    } catch (e) {
      console.log(e.request);
      alert(
        'Error: ' +
          e.status +
          '\n' +
          e.statusText +
          '\n' +
          'Make sure all required fields are filled with valid values'
      );
    }
  }

  static async postPresenter(opts = null) {
    try {
      if (!opts) return;
      let res = await Attendee.req('POST', '/idte/admin/presenters', opts);
      return res;
    } catch (e) {
      console.log(e.request);
      alert(
        'Error: ' +
          e.status +
          '\n' +
          e.statusText +
          '\n' +
          'Make sure all required fields are filled with valid values'
      );
    }
  }

  static async updateAttendee(opts = null) {
    try {
      if (!opts) return;
      let res = await Attendee.req('PUT', '/idte/admin/attendees', opts);
      return res;
    } catch (e) {
      console.log(e.request);
      alert(
        'Error: ' +
          e.status +
          '\n' +
          e.statusText +
          '\n' +
          'Make sure all required fields are filled with valid values'
      );
    }
  }

  static async deleteAttendee(opts = null) {
    try {
      if (!opts) return;
      let res = await Attendee.req('DELETE', '/idte/admin/attendees', opts);
      return res;
    } catch (e) {
      console.log(e.request);
      alert(
        'Error: ' +
          e.status +
          '\n' +
          e.statusText +
          '\n' +
          'Make sure all required fields are filled with valid values'
      );
    }
  }

  static async getAllSuppliers(opts = null) {
    let url = opts ? '/idte/admin/suppliers/search' : '/idte/admin/suppliers';
    let method = opts ? 'POST' : 'GET';
    let res = await Attendee.req(method, url, opts);
    if (res.statusText) {
      return res;
    }
    res.forEach((attendee) => {
      attendee.type = 'Supplier';
    });
    return res;
  }

  static async getAllEvaluators(opts = null) {
    let url = opts ? '/idte/admin/evaluators/search' : '/idte/admin/evaluators';
    let method = opts ? 'POST' : 'GET';
    let res = await Attendee.req(method, url, opts);
    if (res.statusText) {
      return res;
    }
    res.forEach((attendee) => {
      attendee.type = 'Evaluator';
    });
    return res;
  }

  static async getAllPresenters(opts = null) {
    let url = opts ? '/idte/admin/presenters/search' : '/idte/admin/presenters';
    let method = opts ? 'POST' : 'GET';
    let res = await Attendee.req(method, url, opts);
    if (res.statusText) {
      return res;
    }
    res.forEach((attendee) => {
      attendee.type = 'Presenter';
    });
    return res;
  }

  static async req(method, url, opts = null) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response ? xhr.response : null));
        } else {
          reject({
            status: this.status,
            errors: JSON.parse(xhr.response),
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
}

export default Attendee;
