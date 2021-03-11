import axios from 'axios';

const http = axios.create({
    baseURL: 'https://apiprevmet3.inmet.gov.br/'
})

export {http}
