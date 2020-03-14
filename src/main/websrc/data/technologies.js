class Technology {
  static async getCategories(opts = null) {
    let url = "/idte/technologyCategories/all";
    let method = "GET";
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
        "POST",
        "/idte/technologyCategories",
        opts
      );
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

  static async deleteCategory(opts = null) {
    try {
      if (!opts) return;
      let res = await Technology.req(
        "DELETE",
        "/idte/technologyCategories",
        opts
      );
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

export default Technology;
