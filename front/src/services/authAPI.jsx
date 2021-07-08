import axios from 'axios';

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

const api = {
    get,
}

export default api;