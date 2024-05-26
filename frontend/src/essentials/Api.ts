import axios, { AxiosError, AxiosHeaders, RawAxiosRequestHeaders } from 'axios';
import useAuthStore from '../stores/auth';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

api.interceptors.request.use(function (config) {
    if (useAuthStore.getState().accessToken) {
        config.headers['Authorization'] = `Bearer ${useAuthStore.getState().accessToken}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


interface RequestOptions {
    url: string;
    method?: string;
    data?: null | Record<string, any>;
    params?: null | Record<string, any>;
    headers?: null | AxiosHeaders;
    loader?: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum HttpMethods {
    GET = 'Get',
    POST = 'Post',
    DELETE = 'Delete',
    PUT = 'Put',
    PATCH = 'Patch',
}


const ApiRequest = async (requestOptions: RequestOptions) => {
    requestOptions.loader && requestOptions.loader(true)
    return new Promise(async (resolve, reject) => {
        await api.request({
            url: requestOptions.url,
            method: requestOptions.method ?? "GET",
            data: requestOptions.data,
            params: requestOptions.params,
            ...(requestOptions.headers ? { headers: requestOptions.headers } : {}),
        }).then(res => {
            resolve(res.data)
        }).catch((error: AxiosError) => {
            // Hanlde Error
            reject(error)
        }).finally(() => {
            requestOptions.loader && requestOptions.loader(false)
        })
    })
}

export default ApiRequest;
