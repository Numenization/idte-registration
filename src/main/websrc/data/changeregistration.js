
class ChangeRegistration{
static async changeCurrentReg(opts = null){
    let url = "/idte/admin/currentRegStatus";
    let method = "PUT";
    let currentComponent = this;
    let res = currentComponent.req(method, url, opts);
    if (res.statusText) {
      return res;
    }
    return res;
}
static async changeCurrentTech(opts = null){
    let url = "/idte/admin/currentTechStatus";
    let method = "PUT";
    let currentComponent = this;
    let res = currentComponent.req(method, url, opts);
    if (res.statusText) {
      return res;
    }
    return res;
}
static async replaceCurrent(opts = null){
    let url = "/idte/admin/replaceCurrent";
    let method = "PUT";
    let currentComponent = this;
    let res = currentComponent.req(method, url, opts);
    if (res.statusText) {
      return res;
    }
    return res;
}
static async changeCurrent(opts = null){
  let url = "/idte/admin/changeCurrent";
  let method = "PUT";
  let currentComponent = this;
  let res = currentComponent.req(method, url, opts);
  if (res.statusText) {
    return res;
  }
  return res;
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
static async getTechEnd(opts = null){
  let url = "/idte/getTechEnd";
  let method = "GET";
  let currentComponent = this;
  let res =  await currentComponent.req(method, url, opts);
  if (res.statusText) {
      return res;
    }
    return res;
}

static async getTechStart(opts = null){
  let url = "/idte/getTechStart";
  let method = "GET";
  let currentComponent = this;
  let res =  await currentComponent.req(method, url, opts);
  if (res.statusText) {
      return res;
    }
    return res;
}
static async getRegStart(opts = null){
  let url = "/idte/getRegStart";
  let method = "GET";
  let currentComponent = this;
  let res =  await currentComponent.req(method, url, opts);
  if (res.statusText) {
      return res;
    }
    return res;
}
static async getRegEnd(opts = null){
  let url = "/idte/getRegEnd";
  let method = "GET";
  let currentComponent = this;
  let res =  await currentComponent.req(method, url, opts);
  if (res.statusText) {
      return res;
    }
    return res;
}














static async getEvents(opts = null) {
  let url = "/idte/admin/events/all";
  let method = "GET";
  let res = await ChangeRegistration.req(method, url, opts);
  if (res.statusText) {
    return res;
  }
  return res;
}
static async deleteEvent(opts = null) {
  try {
    if (!opts) return;
    let res = await ChangeRegistration.req(
      "DELETE",
      "/idte/admin/events",
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
        "Event not found"
    );
  }
}
//-----------------------------------------

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