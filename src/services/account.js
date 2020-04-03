import request from "@/utils/request";
import {getToken} from "@/utils/token";

export async function getAccounts(data) {
  return request('http://localhost:8020/admin/user/list', {
    method: 'get',
    params: data,
    headers: {
      Authorization: getToken(),
    }
  }).then(res => {
    return new Promise(resolve => {
      resolve({
        success: true,
        data: res.data.list,
        total: res.data.total,
        pageSize: data.pageSize,
        current: data.current
      })
    })
  });
}

export async function selectRoleTags() {
  return request('http://localhost:8020/admin/role/tags', {
    headers: {
      Authorization: getToken(),
    }
  })
}
