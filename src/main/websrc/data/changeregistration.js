 import axios from 'axios';
class ChangeRegistration{
static async changeCurrentReg(opts = null){
    let url = "";
    let method = "PUT";
    let currentComponent = this;
    currentComponent.req(method, url, opts);
}
static async changeCurrentTech(opts = null){
    let url = "";
    let method = "PUT";
    let currentComponent = this;
    currentComponent.techReq(method, url, opts);
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
    }


export default ChangeRegistration;