import apiService from "./api"
import requestType from "../util/define";

const getPost = data => apiService('/posts', data, requestType.get);

const addPost = data => apiService('/posts', data, requestType.post);

const userRegistry = data => apiService('/user/register', data, requestType.post);

const userLogin = data => apiService('/user/login', data , requestType.post);

const uploadImg = data => apiService('/user/uploadImg', data , requestType.post)

export {
    getPost,
    addPost,
    userRegistry,
    userLogin,
    uploadImg
}
