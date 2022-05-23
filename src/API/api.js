import {message} from 'antd';
import axios from "axios";
import requestType from "../util/define";
import memoryParams from "../util/memoryParams"
import authGenerator from '../util/authGenerator';

const apiService = async (router,body={},method="GET") => {
    try{
        let response ;
        let urlPrefix = true ? "http://localhost:3000" : "https://morning-ocean-14546.herokuapp.com";
        let url = urlPrefix+router;
        console.log("request url",url,body)
        message.loading({ content: 'Source Loading...', key:'update'});
        if(method===requestType.get){
            response =await axios.get(url,{params:body});
        }else if(method===requestType.post){
            response =await axios.post(url,body, authGenerator(memoryParams[0]));
        }else if(method===requestType.delete){
            response =await axios.delete(url,body);
        }else if(method===requestType.patch){
            response =await axios.patch(url,body);
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


