import axios from 'axios';

const http = axios.create({
    baseURL: 'https://brazil-geographic-api.almfelipe.com/api/'
})

export {http}