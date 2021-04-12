import cookie from 'js-cookie';
// eslint-disable-next-line import/no-cycle
import { AdminConfig } from '../api/request';

export const setToken = (token: string) => cookie.set(AdminConfig.TOKEN_KEY, token);

export const getToken: () => string = () => cookie.get(AdminConfig.TOKEN_KEY) || '';

export const removeToken = () => cookie.remove(AdminConfig.TOKEN_KEY);
