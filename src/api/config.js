export const BASE_URL = "api-server-gggrajdbdmdhcvdh.southeastasia-01.azurewebsites.net";   // Official api server on cloud || Dev-purpose only
export const API_VERSION = '/api/v1';

export const API_ROOT = `${BASE_URL}${API_VERSION}`;

// API_PATH = API_ROOT + API_ROUTES (endpoint)
export const API_ENDPOINT = {
  login: '/login',
  logout: '/logout',
  me: '/me',
  refresh: '/refresh-token',
  getAllUsers: '/getAllUsers',
  getLatest: '/latest'
};

export const API_PATH = {
  auth: `${API_ROOT}/auth`,
  users: `${API_ROOT}/users`,
  sensors: `${API_ROOT}/sensors`,
};
