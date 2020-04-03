import request from '@/utils/request';
import {getToken} from "@/utils/token";

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryCurrentUser() {
  return request('http://localhost:8010/auth/api/user', {
    headers: {
      Authorization: getToken(),
    }
  })
}
export async function queryNotices() {
  return request('/api/notices');
}
