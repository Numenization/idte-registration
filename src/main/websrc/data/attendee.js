class Attendee {
  static async getAllSuppliers(opts = null) {
    let res = await Attendee.req('GET', '/idte/suppliers', opts);
    if (res.statusText) {
      return res;
    }
    res.forEach(attendee => {
      attendee.type = 'Supplier';
    });
    return res;
  }

  static async getAllEvaluators(opts = null) {
    let res = await Attendee.req('GET', '/idte/evaluators', opts);
    if (res.statusText) {
      return res;
    }
    res.forEach(attendee => {
      attendee.type = 'Evaluator';
    });
    return res;
  }

  static async req(method, url, opts = null) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response));
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
      xhr.send(opts);
    });
  }
}

export default Attendee;
