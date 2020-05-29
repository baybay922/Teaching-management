import axios from 'axios';

let base = 'http://qimeng.free.idcfengye.com';
let headersCT = {headers: {'Content-Type': 'application/json;charset=UTF-8'}};

//登录
export const login = params => { 
    return axios.post(`${base}/login/manager/login`, 
    JSON.stringify(params), 
    headersCT).then(res => res.data); 
};

//退出
export const signOut = params => { 
    return axios.post(`${base}/login/manager/signOut`, 
    JSON.stringify(params), 
    headersCT).then(res => res.data); 
};

//学生列表
export const studentList = params => { 
    return axios.post(`${base}/student/page`, 
    JSON.stringify(params), 
    headersCT).then(res => res.data); 
};

//学生列表
export const booksList = params => { 
    return axios.post(`${base}/book/page`, 
    JSON.stringify(params), 
    headersCT).then(res => res.data); 
};