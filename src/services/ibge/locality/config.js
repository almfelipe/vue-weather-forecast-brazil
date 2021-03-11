import axios from 'axios';

const http = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/'
})

export {http}
