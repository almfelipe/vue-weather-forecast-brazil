import { http } from './config';

export default{
    states:() => {
        return http.get('estados')
    },
    cities:(idState) => {
        return http.get('estados/' + idState + '/municipios')
    }
}