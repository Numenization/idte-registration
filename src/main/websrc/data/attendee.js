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
      technologyNumber: state.technologyNumber
    };

    for (let [key, val] of Object.entries(attendee)) {
      if (val === undefined) attendee[key] = null;
    }

    return attendee;
  }
  static async postSupplier(opts = null) {
    try {
      if (!opts) return;
      let res = await Attendee.req("POST", "/idte/suppliers", opts);
      return res;
    } catch (e) {
      console.log(e.request);
      alert(
        "Error: " +
          e.status +
          "\n" +
          e.statusText +
          "\n" +
          "Make sure all required fields are filled with valid values"
      );
    }
  }

  static async postEvaluator(opts = null) {
    try {
      if (!opts) return;
      let res = await Attendee.req("POST", "/idte/evaluators", opts);
      return res;
    } catch (e) {
      console.log(e.request);
      alert(
        "Error: " +
          e.status +
          "\n" +
          e.statusText +
          "\n" +
          "Make sure all required fields are filled with valid values"
      );
    }
  }

  static async updateAttendee(opts = null) {
    try {
      if (!opts) return;
      let res = await Attendee.req("PUT", "/idte/attendees", opts);
      return res;
    } catch (e) {
      console.log(e.request);
      alert(
        "Error: " +
          e.status +
          "\n" +
          e.statusText +
          "\n" +
          "Make sure all required fields are filled with valid values"
      );
    }
  }

  static async deleteAttendee(opts = null) {
    try {
      if (!opts) return;
      let res = await Attendee.req("DELETE", "/idte/attendees", opts);
      return res;
    } catch (e) {
      console.log(e.request);
      alert(
        "Error: " +
          e.status +
          "\n" +
          e.statusText +
          "\n" +
          "Make sure all required fields are filled with valid values"
      );
    }
  }

  static async getAllSuppliers(opts = null) {
    let res = await Attendee.req("GET", "/idte/suppliers", opts);
    if (res.statusText) {
      return res;
    }
    res.forEach(attendee => {
      attendee.type = "Supplier";
    });
    return res;
  }

  static async getAllEvaluators(opts = null) {
    let res = await Attendee.req("GET", "/idte/evaluators", opts);
    if (res.statusText) {
      return res;
    }
    res.forEach(attendee => {
      attendee.type = "Evaluator";
    });
    return res;
  }

  static async req(method, url, opts = null) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response ? xhr.response : null));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
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
}

export default Attendee;
