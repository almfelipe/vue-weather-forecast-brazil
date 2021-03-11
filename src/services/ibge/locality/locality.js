import { http } from './config';

export default{
    states:() => {
        return http.get('estados')
    },
    cities:(stateAcronym) => {
        return http.get('estados/' + stateAcronym + '/municipios')
    }
}