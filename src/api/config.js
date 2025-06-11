export const BASE_URL = import.meta.env.VITE_API_BASE_URL;   // First link may be official api server on cloud
export const API_VERSION = '/api/v1';

export const API_ROOT = `${BASE_URL}${API_VERSION}`;

// API_PATH = API_ROOT + API_ROUTES (endpoint)
export const API_ENDPOINT = {
    login: '/login',
    logout: '/logout',
    me: '/me'
};

export const API_PATH = {
  auth: `${API_ROOT}/auth`,
  users: `${API_ROOT}/users`,
  machines: `${API_ROOT}/machines`,
};
