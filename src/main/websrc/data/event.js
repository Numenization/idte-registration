import Attendee from './attendee';
class Event {
    static createEventObjectFromState(state = null) {
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


    static async postEvent(opts = null) {

       try {
          if (!opts) return;
          let res = await Attendee.req('POST', '/idte/events', opts); 
          console.log(alert(regStatus))         
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
     
}
export default Event;