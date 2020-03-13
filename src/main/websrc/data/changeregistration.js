class ChangeRegistration{

static async getEvents(opts = null){
    let url = "/idte/events/all";
    let method = "GET";
    let res = await ChangeRegistration.req(method,url,opts);
    if (res.statsText){
        return res;
    }
    return res;
}

static async req(method,url, opts = null){
    return new Promise(function(resolve,reject){
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function(){
            if (this.status >= 200 && this.status < 300){
                resolve(JSON.parse(xhr.response ? xhr.response : null));
            }
            else{
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.oneerro = function(){
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