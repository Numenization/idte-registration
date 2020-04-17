import changeReg from './changeregistration';
class Event {
    static createEventObjectFromState(state = null) {
      if (!state) return;
      var event = {
        registrationStart: state.registrationStart,
        registrationEnd: state.registrationEnd,
        techSubStart: state.techSubStart,
        techSubEnd: state.techSubEnd,
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


    static async postEvent(opts = null) {
       try {
          if (!opts) return;
          let res = await changeReg.req('POST', '/idte/admin/events', opts);     
          alert('Event Created');
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