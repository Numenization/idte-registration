import Attendee from './attendee';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/'

class Email{
  
    static createEmailObjectFromState(state = null) {
        if (!state) return;
        var email = {
          subject: state.subject,
          to: state.to,
          body: state.body,
          attachment: state.attachment
        };
    
        for (let [key, val] of Object.entries(email)) {
          if (val === undefined) email[key] = null;
        }
    
        return email;
      }

    static async sendThatEmail(opts = null) {
        try {
            
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

    static async sendAttachmentEmail(opts = null) {
      try {
          
          if(!opts) return;
          let res = await Attendee.req('POST', '/idte/emailwattachment', opts);
          return res;
        } catch (e) {
          console.log(e.request);
          alert(
            'Error: ' +
              e.status +
              '\n' +
              e.statusText +
              '\n' +
              'Be sure to fill in the attachment, Subject, Body and who the email is To fields!'
          );
        }
  }

  static async submitForm(contentType, data, setResponse) {
    axios({
    url: `/idte/emailwattachment`,
    method: 'POST',
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

  static async uploadWithJSON(opts = null, file){
    let currentComponent = this;

    const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    });
   
    const data = {
    to: opts.to,
    file: await toBase64(file),
    subject: opts.subject,
    body: opts.body
    }
   
    currentComponent.submitForm("application/json", data, (msg) => console.log(msg));
  }

  
}

export default Email;
