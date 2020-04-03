export function getToken() {
  return window.localStorage.getItem('current-token');
}

export function setToken(token) {
  window.localStorage.setItem('current-token', `Bearer ${token}`);
}

export function clearToken() {
  window.localStorage.removeItem('current-token');
}

export function checkToken() {
  return !!localStorage.getItem('current-token')
}
