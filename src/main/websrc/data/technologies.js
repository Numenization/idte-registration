class Technology {
  static createTechnologyObjectFromState(state = null) {
    if (!state) return;
    var technology = {
      title: state.title,
      description: state.description,
      type: state.type,
      category: state.category,
      shippingCity: state.shippingCity,
      shippingCountry: state.shippingCountry,
      source: state.source,
      fordContact: state.fordContact,
      fordPresenter: state.fordPresenter,
      director: state.director,
      supplierCompany: state.supplierCompany,
      email: state.email
    };

    for (let [key, val] of Object.entries(technology)) {
      if (val === undefined) technology[key] = null;
    }

    return technology;
  }
  static async postTechnology(opts) {
    console.log(opts);
    try {
      if (!opts) return;
      let res = await Technology.req('POST', '/idte/admin/technologies', opts);
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
  static async updateTechnology(opts = null) {
    try {
      if (!opts) return;
      let res = await Technology.req('PUT', '/idte/admin/technologies', opts);
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
  static async getCategories(opts = null) {
    let url = '/idte/technologyCategories/all';
    let method = 'GET';
    let res = await Technology.req(method, url, opts);
    if (res.statusText) {
      return res;
    }
    return res;
  }

  static async postCategory(opts) {
    console.log(opts);
    try {
      if (!opts) return;
      let res = await Technology.req(
        'POST',
        '/idte/admin/technologyCategories',
        opts
      );
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

  static async deleteTechnology(opts = null) {
    try {
      if (!opts) return;
      let res = await Technology.req(
        'DELETE',
        '/idte/admin/technologies',
        opts
      );
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
  
  static async findAllTechnologies(opts = null) {
    let url = opts ? '/idte/admin/technologies/search' : '/idte/admin/technologies';
    let method = opts ? 'POST' : 'GET';
    let res = await Technology.req(method, url, opts);
    if (res.statusText) {
      return res;
    }
    return res;
  }

  static async deleteCategory(opts = null) {
    try {
      if (!opts) return;
      let res = await Technology.req(
        'DELETE',
        '/idte/admin/technologyCategories',
        opts
      );
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

  static async req(method, url, opts = null) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Content-Type', 'application/json');
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

export default Technology;
