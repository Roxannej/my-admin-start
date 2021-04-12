import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { message } from 'antd';
// eslint-disable-next-line import/no-cycle
import { getToken } from '../utils/cookie';

export interface Config {
    TOKEN_KEY: string;
}

export const AdminConfig: Config = {
    TOKEN_KEY: 'e10adc3949ba59abbe56e057f20f883e',
};

axios.defaults.headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

axios.defaults.baseURL = 'https://www.fastmock.site/mock/3b94e1c3501665e1265df64c3ec971c5/system';

interface ReaponseData<T> {
    code: number;
    data: T;
    msg: string;
}
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getToken();
        console.log(token);
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error),
);

axios.interceptors.response.use(
    (response: AxiosResponse<ReaponseData<any>>) => {
        console.log(response.data.data.code);
        if (!response.data.data) {
            return Promise.resolve(response);
        }
        if (response.data.data.code === 400) {
            message.error('错误');
            return Promise.reject(new Error(response.data.data.msg));
        }

        if (response.data.data.code === 200) {
            return response.data as any;
        }

        // 请求成功，状态不为成功时
        message.error(response.data.data.msg);

        return Promise.reject(new Error(response.data.data.msg));
    },
    (error: AxiosError) => {
        message.error(error.message);
        return Promise.reject(error);
    },
);

// eslint-disable-next-line import/prefer-default-export
export function request<T>(options: AxiosRequestConfig) {
    return axios.request<T>(options);
}
