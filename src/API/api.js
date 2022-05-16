const axios = require("axios").default;
const apiService = (router,body={},method="GET") => {
        let response ;
        let urlPrefix = "https://morning-ocean-14546.herokuapp.com"
        let url = urlPrefix+router;
        console.log("request url",url,body)
        if(method==="GET"){
            response=axios.get(url,{params:body});
        }else if(method==="POST"){
            response=axios.post(url,body);
        }else if(method==="DELETE"){
            response=axios.delete(url,body);
        }else if(method==='PATCH'){
            response=axios.patch(url,body);
        }
        return response;

}

module.exports = apiService;


