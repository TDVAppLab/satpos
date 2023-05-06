import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { APIURL } from "../constants";
import { User, UserFormValues } from "../models/user";
import { WebsiteSetting } from "../models/WebsiteSetting";
import { store } from "../stores/store";
import { SatelliteOrbitalElement } from "../models/SatelliteOrbitalElement";
import { tlestring } from "../models/tlestring";
import { batchlog } from "../models/batchlog";

const sleep = (delay: number) => {
    return new Promise((resolve)=>{
        setTimeout(resolve, delay)
    })
}


axios.defaults.baseURL = APIURL;



axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    if(process.env.NODE_ENV === 'development') { await sleep(1000); }
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response!;
    switch (status) {
        case 400:
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                toast.error('/not-found');
            }            
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            toast.error('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            toast.error('server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url:string) => axios.get<T>(url).then(responseBody),
    post: <T>(url:string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url:string, body: {}) => axios.put<T>(url,body).then(responseBody),
    del: <T>(url:string) => axios.delete<T>(url).then(responseBody),
}



const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}



const WebsiteSettings = {
    list: () => requests.get<WebsiteSetting[]>('/websitesetting/index'),
    details:(title:string) => requests.get<WebsiteSetting>(`/websitesetting/details/title=${title}`),
    create:(object: WebsiteSetting) => axios.post<WebsiteSetting>(`/websitesetting/create`,object),
    update:(object: WebsiteSetting) => axios.post<WebsiteSetting>(`/websitesetting/update`,object),
    delete: (title:string) => axios.post<void>(`/websitesetting/delete/title=${title}`),
}

const SatelliteOrbitalElements = {
    list:() => requests.get<tlestring[]>(`/SatelliteOrbitalElement/index`),
    details:(title:string) => requests.get<SatelliteOrbitalElement>(`/SatelliteOrbitalElement/details/${title}`),
    gettlestring:(id:string) => requests.get<tlestring>(`/SatelliteOrbitalElement/gettlestring/${id}`),
    //
}

const batchlogs = {
    list:() => requests.get<batchlog[]>(`/batch/index`),
}


const agent = {
    Account,
    WebsiteSettings,
    SatelliteOrbitalElements,
    batchlogs,
}

export default agent;