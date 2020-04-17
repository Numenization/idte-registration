
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
/*
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
*/
static async replaceCurrent(opts = null) {
  try {
     if (!opts) return;
     let res = await req('PUT', '/idte/admin/replaceCurrent', opts);     
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
static updateObjectFromState(state = null) {
  if (!state) return;
  var event = {
    registrationStart: state.registrationStart,
    registrationEnd: state.registrationEnd,
    techSubStart: state.techSubStart,
    techSubEnd: state.techSubEnd
  };

  for (let [key, val] of Object.entries(event)) {
    if (val === undefined) event[key] = null;
  }
  return event;
}
static updateDatesFromState(state = null) {
  if (!state) return;
  var event = {
    setUpOne: state.setUpOne,
    setUpTwo: state.setUpTwo,
    setUpThree: state.setUpThree,
    dryRun: state.dryRun,
    eventDayOne: state.eventDayOne,
    eventDayTwo: state.eventDayTwo,
    eventDayThree: state.eventDayThree,
    eventDayFour: state.eventDayFour,
    eventDayFive: state.eventDayFive
  };

  for (let [key, val] of Object.entries(event)) {
    if (val === undefined) event[key] = null;
  }
  return event;
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
static async getEventDates(opts = null) {
  let url = "/idte/eventDates"
  let method = "GET";
  let res = await ChangeRegistration.req(method, url, opts);
  if (res.statusText) {
    return res;
  }
  return res;
}

// nick use this one
static async getDateDetails(opts = null) {
  let url = "/idte/eventDateDetails"
  let method = "GET";
  let res = await ChangeRegistration.req(method, url, opts);
  if (res.statusText) {
    return res;
  }
  return res;
}

static async updateEvent(opts = null) {
  try {
    if (!opts) return;
    let res = await ChangeRegistration.req(
      "PUT",
      "/idte/admin/updateDates",
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
static async updateEventDates(opts = null) {
  try {
    if (!opts) return;
    let res = await ChangeRegistration.req(
      "PUT",
      "/idte/admin/updateEventDates",
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
static async deleteEvent(opts = null) {
  var r=confirm("Are you sure you want to delete this event?");
if (r==true)
  {
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