import Attendee from './attendee';

class Email{

    static createEmailObjectFromState(state = null) {
        if (!state) return;
        var email = {
          subject: state.subject,
          to: state.to,
          body: state.body
        };
    
        for (let [key, val] of Object.entries(email)) {
          if (val === undefined) email[key] = null;
        }
    
        return email;
      }

    static async sendThatEmail(opts = null) {
        try {
            console.log('TEST opts: ' + opts.to + opts.subject + opts.body)
            if(!opts) return;
            let res = await Attendee.req('POST', '/idte/email', opts);
            return res;
          } catch (e) {
            console.log(e.request);
            alert(
              'Error: ' +
                e.status +
                '\n' +
                e.statusText +
                '\n' +
                'Be sure to fill in the Subject, Body and who the email is To fields!'
            );
          }
    }
}

export default Email;
