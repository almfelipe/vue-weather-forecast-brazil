import axios from 'axios';

const http = axios.create({
    baseURL: 'http://brazil-geographic-api.almfelipe.com/api/'
})

export {http}