import authApi from '@/api/v1/auth.js'
import { API_ENDPOINT, API_PATH } from '../config';

export async function secureFetch(url, options = {}) {
  const config = {
    ...options,
    credentials: 'include'  // Auto send with accessToken (cookie)
  };

  try {
    let res = await fetch(url, config);

    // Initial request unauthenticated
    if (res.status === 401 || res.status === 403) {
      // Try refresh
      const refresh = await fetch(API_PATH.auth + API_ENDPOINT.refresh, {
        method: 'POST',
        credentials: 'include'
      });

      const refreshResult = await refresh.json().catch(() => ({}));

      if (!refresh.ok) {
        authApi.logout(); // Refresh token expired too
        throw new Error(refreshResult.message || 'Session expired');
      }

      // Retry original request with new access token
      res = await fetch(url, config);
    }

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(result.message);
    }
    
    return result;
  }
  catch (err) {
    throw err;
  }
}