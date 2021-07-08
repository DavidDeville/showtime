import axios from 'axios';
import jwtDecode from 'jwt-decode';

/**
 * Check if a token exists. If that's the case, checks if the expiration
 * date still valid (on application boot)
 */
 const setup = () => {
    const token = window.localStorage.getItem('fitly-token');

    if(token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000  > new Date().getTime()) {
            setToken(token);
        }
    }
}

/**
 * Calls the API to retrieve informations (GET)
 * 
 * @param {string} path - the API URL
 */
 const get = (path) => {
    const baseApiUrl = 'http://localhost:3001';
    
    return axios.get(
        `${baseApiUrl}/${path}`
    )
}

/**
 * Calls the API to retrieve informations (GET)
 * 
 * @param {string} path - the API URL
 */
 const post = (path, data) => {
    const baseApiUrl = 'http://localhost:3001';
    
    return axios.post(
        `${baseApiUrl}/${path}`,
        data
    )
}

/**
 * Sets the user's token into axios default headers
 * 
 * @param {string} token - the token provided to the logged user
 */
 const setToken = (token) => {
    axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
}

/**
 * Checks if a token exist and if the expiration date is still valid
 * Similar to setup function but used when necessary, not on boot
 */
 const isAuthenticated = () => {
    const token = window.localStorage.getItem('access_token');

    if(token) {
        const {exp: expiration} = jwtDecode(token);
        if(expiration * 1000  > new Date().getTime()) {
            setToken(token);
            return true;
        }
        return false;
    }
    return false;
}

/**
 * Checks if a token exist and if the expiration date is still valid
 * Similar to setup function but used when necessary, not on boot
 */
 const isAdmin = () => {
    const token = window.localStorage.getItem('access_token');

    if(token) {
        const {role} = jwtDecode(token);
        if(role === "admin") {
            return true;
        }
        return false;
    }
    return false;
}

/**
 * Removes the token from local storage and headers on logout
 */
 const logout = () => {
    window.localStorage.removeItem('access_token');
    delete axios.defaults.headers.common['access_token'];
}

const api = {
    get,
    post,
    setToken,
    isAuthenticated,
    setup,
    logout,
    isAdmin
}

export default api;