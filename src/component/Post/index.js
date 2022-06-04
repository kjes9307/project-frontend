import React, { Component } from 'react'
import "./post.css"
import ShowPost from "../showPost"
import userInfo from "../../util/memoryUser"
import {getPost,getUserPost} from "../../API"

export default class Post extends Component {
    state ={
        UserPost: [],
        usedId: {}
      }
    componentDidMount = async () =>{
        let res = await getPost({});
        if(res.status === 200){
            let UserPost = res.data;
            let newUserPost = this.addFlag(UserPost)
            this.setState({UserPost:newUserPost});
        }
    }
    addFlag = (data) =>{
        let userID = userInfo.getUser().id;
        data.forEach(x=>{
            x.comments.forEach(info=>{
                if(info.user._id === userID){
                    info.flag = 'Y';
                }
            })
        })
        return data;
    }
    callStatusChange = async(query) =>{
        let obj ={};
        let res;
        if(query && query !== undefined){
            obj[`${Object.keys(query)[0]}`] = Object.values(query)[0]
            res = await getPost(obj)
        }else{
            res = await getPost({})     
        };
        if(res.status === 200){
          this.addFlag(res.data);
          this.setState({UserPost:res.data})
        }
    }
    callChangeUser = async(userInfo) =>{
        let obj ={};
        obj["_id"] = userInfo._id;
        let res = await getUserPost(obj);
        console.log("callback @ post")
        if(res.status === 200){
          this.addFlag(res.data);
          this.setState({UserPost:res.data,usedId: userInfo})
        }
      }
    componentWillUnmount = () =>{
        this.setState = () => false;
    }
    render() {
    const  {UserPost} = this.state
    return ( 
        <ShowPost 
            UserPost={UserPost} 
            callStatusChange = {this.callStatusChange}
            callChangeUser = {this.callChangeUser}
        />
    )
  }
}
