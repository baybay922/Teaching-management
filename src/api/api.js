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

//学生下拉框配置项
export const studentListConfigs = params => { 
    return axios.post(`${base}/student/listConfigs`, 
    JSON.stringify(params), 
    headersCT).then(res => res.data); 
};

//学生详情
export const studentDetails = params => { 
    return axios.post(`${base}/student/details`, 
    JSON.stringify(params), 
    headersCT).then(res => res.data); 
};

//书单列表
export const booksList = params => { 
    return axios.post(`${base}/book/page`, 
    JSON.stringify(params), 
    headersCT).then(res => res.data); 
};

//反馈话术列表
export const feedackWordsList = params => { 
    return axios.post(`${base}/feedackWords/page`,
    JSON.stringify(params), 
    headersCT).then(res => res.data); 
};