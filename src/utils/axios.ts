import axios from 'axios';
import {useKey} from 'hooks';
import {NavigationService, Routes} from 'navigation';
import {LOGOUT_ACT, REFRESH_TOKEN_ACT} from 'services/actionsUserParam';
import * as AppActions from 'store/app';
import {configStore} from 'store/createStore';
import {IRefreshParams} from 'types';
import {BASE_URI, GETWAY} from 'utils/constants';
import {encryptRSA, getCurrentTS} from './libs';

/** define an axios instance config */
const config = {
  baseURL: BASE_URI,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

/**
 * @description the interface of api response
 * @export
 * @interface APIResponse
 */
export interface APIResponse<T = any> {
  data: T;
  message: string;
  status: boolean;
}

/** create an axios client service with instance config */
const axiosClient = axios.create(config);

/** handle intercept requests or responses before they are handled */
axiosClient.interceptors.request.use(
  async (req: any) => {
    const {getKeyStore} = useKey();
    const token = await getKeyStore('token');
    console.log('client1', token);

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (err: any) => Promise.reject(err),
);
let countLogout = 0;
const onLogout = (resetPwd: any) => {
  if (countLogout > 0) {
    return false;
  }
  ++countLogout;

  const {store} = configStore();
  store.dispatch(
    AppActions.logoutRequest(LOGOUT_ACT, rs => {
      if (rs.success) {
        resetPwd('token');
        resetPwd('refreshToken');
        countLogout = 0;
        NavigationService.replace(Routes.Login);
      }
    }),
  );
};

const onRefreshToken = (formData: any) => {
  const {store} = configStore();
  store.dispatch(AppActions.updateRefreshToken(formData));
};
/** handle auto refresh token in interceptor when token expired */
// let countCode401 = 0;
axiosClient.interceptors.response.use(
  (res: any) => Promise.resolve(res.data),
  async (err: any) => {
    const originalRequest = err.config;
    if (err?.response?.status === 401 && !err.config.__isRetryRequest) {
      // ++countCode401;
      console.log('client2');
      const {getKeyStore, saveKeyStore, resetPwd} = useKey();
      const refreshToken = await getKeyStore('refreshToken');
      const salt = await encryptRSA(`${getCurrentTS()}`);
      const params = JSON.stringify({
        ...REFRESH_TOKEN_ACT,
        data: [{refreshToken, salt}],
      }).replace(/\\n/g, '');
      console.log('client3--', params);

      return axios
        .post(`${BASE_URI}${GETWAY}`, params, {headers: config.headers})
        .then(async (response: any) => {
          if (response.data.result.success) {
            const payload: IRefreshParams = response.data.result.data;
            const accessToken = payload.token;
            console.log('client4', payload);

            onRefreshToken(payload);
            if (payload?.token) {
              await saveKeyStore('token', payload.token);
            }
            if (payload?.refreshToken) {
              await saveKeyStore('refreshToken', payload.refreshToken);
            }
            originalRequest.headers = {
              ...originalRequest.headers,
              authorization: `Bearer ${accessToken}`,
            };
            originalRequest.__isRetryRequest = true;

            return axios(originalRequest);
          }
        })
        .catch((e: any) => {
          // countCode401 = 0;
          console.log('catch-axios', e);
          onLogout(resetPwd);
        });

      // return store.dispatch(logoutRequest());
    }
    return Promise.reject(((err || {}).response || {}).data);
  },
);

export default axiosClient;
