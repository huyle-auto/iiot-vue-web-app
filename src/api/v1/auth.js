import { ref } from 'vue';
import { API_ENDPOINT, API_PATH } from '../config';

const isAuthenticated = ref(false);
const isAuthChecked = ref(false);

// Authentication
async function login(email, password) {
    const response = await fetch(API_PATH.auth + API_ENDPOINT.login, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })

    const result = await response.json();
    console.log('Login response:', result);

    if (!response.ok) {
        throw new Error(result.message);
    }
    else {
        isAuthenticated.value = true;
        console.log("isAuthenticated.value is: ", isAuthenticated.value);
    }
}

async function logout() {
    const response = await fetch(API_PATH.auth + API_ENDPOINT.logout, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const result = await response.json();
    console.log('Login response:', result);

    if (!response.ok) {
        throw new Error(result.message);
    }
    else {
        isAuthenticated.value = false;
        isAuthChecked.value = false;
        console.log("isAuthenticated.value is: ", isAuthenticated.value);
        console.log("isAuthChecked.value is: ", isAuthChecked.value);
    }

    resetAuth();
}

// Only use this to retrieve authentication stastus when app reloads
// Initially, users have to gain token directly from Login Page
async function checkAuth() {
    try {
        const res = await fetch(API_PATH.auth + API_ENDPOINT.me, {
            method: 'GET',
            credentials: 'include', // Send with access token
        });

        if (!res.ok) {
            throw new Error();
        }

        isAuthenticated.value = true;
        console.log("authentication res:", res.json());
    }
    catch {
        isAuthenticated.value = false;
    }
    finally {
        isAuthChecked.value = true;
    }
}

function resetAuth() {
    isAuthenticated.value = false;
}

export default {
    isAuthenticated,
    isAuthChecked,
    checkAuth,
    resetAuth,
    login,
    logout
}