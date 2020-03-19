class RegStatus {
    
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

export default RegStatus;