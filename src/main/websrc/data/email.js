import Attendee from './attendee';

const API_BASE = 'http://localhost:8080/'

class Email{
  
    static createEmailObjectFromState(state = null) {
        if (!state) return;
        var email = {
          subject: state.subject,
          to: state.to,
          body: state.body,
          attachment: state.attachment,
          blastOption: state.blastOption
        };
    
        for (let [key, val] of Object.entries(email)) {
          if (val === undefined) email[key] = null;
        }
    
        return email;
      }

    static async sendThatEmail(opts = null) {
        try {
            
            if(!opts) return;
            let res = await Attendee.req('POST', '/idte/admin/email', opts);
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

  static async uploadWithJSON(opts = null, file){
    let currentComponent = this;

    const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    });
   
    let x = file.name

    const data = {
    to: opts.to,
    file: await toBase64(file),
    subject: opts.subject,
    body: opts.body,
    name: x,
    blastOption: opts.blastOption
    }

    try {
      await Attendee.req("POST", "/idte/admin/emailwattachment", data);
    } catch (e) {
      console.log(e.request);
      alert(
        'Error: ' +
          e.status +
          '\n' +
          e.statusText +
          '\n' +
          'Be sure to fill in the Subject, Body, To and attach a file To fields!'
      );
    }
  }

  
}

export default Email;
