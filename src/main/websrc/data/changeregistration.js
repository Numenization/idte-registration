 import axios from 'axios';
class ChangeRegistration{
static async changeCurrentReg(opts = null){
    let url = "";
    let method = "PUT";
    let currentComponent = this;
    currentComponent.req(method, url, opts);
     
/*
    if (res.statusText){
        return res;
    }
    return res;
*/
}
    static async req(contentType, data, setResponse) {
        axios({
        url: `/idte/currentRegStatus`,
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
    }

export default ChangeRegistration;