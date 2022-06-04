import {message} from 'antd';
import axios from "axios";
import requestType from "../util/define";
import memoryParams from "../util/memoryParams"
import authGenerator from '../util/authGenerator';

const apiService = async (router,body={},method="GET") => {
    try{
        let response ;
        let urlPrefix = "https://morning-ocean-14546.herokuapp.com"
        let url = urlPrefix+router;
        // console.log("request url",url,body)
        message.loading({ content: 'Source Loading...', key:'update'});
        if(method===requestType.get){
            let type = "default"
            let token = authGenerator(memoryParams[0],type)
            response =
            await axios({
                method: 'GET',
                url,
                headers:token.headers,
                params:body
            });
        }else if(method===requestType.post){
            let type = router === "/user/uploadImg" ? "upload" :"default"
            response =await axios.post(url,body, authGenerator(memoryParams[0],type));
        }else if(method===requestType.delete){
            let type = "default"
            response =await axios.delete(url, authGenerator(memoryParams[0],type), body);
        }else if(method===requestType.patch){
            let type = "default"
            response =await axios.patch(url,body, authGenerator(memoryParams[0],type));
        }
        message.success({ content: 'Success', key:'update',duration: 2});
        return response.data;
    }catch(error){
        const {status,msg} = error.response.data
        message.error(`Error(${status}): ${msg}`,5);
        return error.response.data;
    }

}
export default apiService;


