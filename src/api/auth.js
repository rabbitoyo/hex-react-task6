import axios from 'axios';
import { getToken } from '../utils';

const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

const authApi = axios.create({
    baseURL: `${VITE_API_BASE}/`,
});

const frontApi = axios.create({
    baseURL: `${VITE_API_BASE}/api/${VITE_API_PATH}/`,
});

const adminApi = axios.create({
    baseURL: `${VITE_API_BASE}/api/${VITE_API_PATH}/admin/`,
});

// 設定 interceptor
const setAuthHeader = (config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
};

// 設定 interceptor
adminApi.interceptors.request.use(setAuthHeader);
authApi.interceptors.request.use(setAuthHeader);

// 登入 API
export const loginApi = (account) => authApi.post('admin/signin', account);

// 檢查權限 API
export const checkAdminApi = () => authApi.post('api/user/check');

// 登出 API
export const logoutApi = () => authApi.post('logout');

export { authApi, frontApi, adminApi };
