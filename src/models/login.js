import { stringify } from 'querystring';
import { history } from 'umi';
import { setToken, clearToken } from "@/utils/token";
import { accountLogin } from '@/services/login';
import {clearAuthority, setAuthority} from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';


const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if (response.code === 200 && response.data != null) {  // 登录成功
        yield put({
          type: 'setToken',
          payload: response.data.token,
        });
        yield put({
          type: 'changeLoginStatus',
          payload: response.data.userInfo,
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },
    logout() {
      clearToken(); // 清除登录状态
      clearAuthority(); // 轻触权限信息
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.roles);
      return { ...state, status: true, type: 'account' };
    },
    setToken(state, { payload }) {
      setToken(payload);
      return { ...state };
    },
  },
};
export default Model;
