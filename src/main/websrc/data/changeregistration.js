 import axios from 'axios';
class ChangeRegistration{
static async changeCurrentReg(opts = null){
    let url = "/idte/currentRegStatus";
    let method = "PUT";
    let currentComponent = this;
    let res = currentComponent.req(method, url, opts);
    if (res.statusText) {
      return res;
    }
    return res;
}
static async changeCurrentTech(opts = null){
    let url = "/idte/currentTechStatus";
    let method = "PUT";
    let currentComponent = this;
    let res = currentComponent.req(method, url, opts);
    if (res.statusText) {
      return res;
    }
    return res;
}
static async replaceCurrent(opts = null){
    let url = "";
    let method = "PUT";
    let currentComponent = this;
    let res = currentComponent.currentReq(method, url, opts);
}
static async getTechStatus(opts = null){
    let url = "/idte/getTechValue";
    let method = "GET";
    let currentComponent = this;
   let res = await currentComponent.req(method, url, opts);
   if (res.statusText) {
    return res;
  }
  return res;
}
static async getRegStatus(opts = null){
    let url = "/idte/getRegValue";
    let method = "GET";
    let currentComponent = this;
    let res =  await currentComponent.req(method, url, opts);
    if (res.statusText) {
        return res;
      }
      return res;

    
 
}

static async currentReq(contentType, data, setResponse) {
        axios({
        url: `/idte/replaceCurrent`,
        method: 'PUT',
        data: data,
        headers: {
        'Content-Type': contentType
        }
        }).then((response) => {
        setResponse(response.data);
        }).catch((error) => {
        setResponse("error");
        })
      }

static async techReq(contentType, data, setResponse) {
        axios({
        url: `/idte/currentTechStatus`,
        method: 'PUT',
        data: data,
        headers: {
        'Content-Type': contentType
        }
        }).then((response) => {
        setResponse(response.data);
        }).catch((error) => {
        setResponse("error");
        })
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

export default ChangeRegistration;