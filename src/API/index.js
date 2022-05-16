import apiService from "./api"
import requestType from "../util/define";

const getPost = data => apiService('/posts', data, requestType.get);

const addPost = data => apiService('/posts', data, requestType.post);

export {
    getPost,
    addPost
}
// getPost({key:"3"})
// .then(function (response) {console.log(response.data)})
// .catch(function (error) {console.log(error)})
