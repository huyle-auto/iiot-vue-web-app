import authApi from '@/api/v1/auth.js'

export async function secureFetch(url, options = {}) {
  const config = {
    ...options,
    credentials: 'include'  // Auto send with accessToken (cookie)
  };

  let res = await fetch(url, config);

  if (res.status === 401 || res.status === 403) {
    // Try refresh
    const refresh = await fetch('http://localhost:3000/api/v1/refresh-token', {
      method: 'POST',
      credentials: 'include'
    });

    if (!refresh.ok) {
      authApi.logout(); // ❌ Refresh token expired
      return null;
    }

    // ✅ Retry original request with new access token
    res = await fetch(url, config);
  }

  return res;
}