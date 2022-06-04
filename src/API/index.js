import apiService from "./api"
import requestType from "../util/define";

const getPost = data => apiService('/posts', data, requestType.get);

const getSinglePost = data => apiService('/posts/singlePost', data, requestType.get);

const addPost = data => apiService('/posts', data, requestType.post);

const addLikes = (data) => apiService(`/posts/addlike/${data}`,[],requestType.post);

const addComment = (postID,data) => apiService(`/posts/comment/${postID}`,data,requestType.post)

const delComment = postID => apiService(`/posts/delcomment/${postID}`,[],requestType.delete)
 
const delLikes = (data) => apiService(`/posts/deletelike/${data}`,[],requestType.post);

const userRegistry = data => apiService('/user/register', data, requestType.post);

const userLogin = data => apiService('/user/login', data , requestType.post);

const uploadImg = data => apiService('/user/uploadImg', data , requestType.post);

const resetPASS = data => apiService('/user/reset', data, requestType.post);

const updataProfile = data => apiService('/user/updateUser',data , requestType.patch);

const getProfile = data => apiService('/user/profile',data, requestType.get);

const getLikeList = data => apiService('/user/getLikeList',data ,requestType.get);

const getUserPost = data => apiService('/user/getUserPost',data ,requestType.get);

export {
    getPost,
    addPost,
    userRegistry,
    userLogin,
    uploadImg,
    resetPASS,
    updataProfile,
    getProfile,
    addLikes,
    delLikes,
    addComment,
    delComment,
    getLikeList,
    getSinglePost,
    getUserPost
}
