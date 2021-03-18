import { http } from './config';

export default{
    reversegeocode:(latitude, longitude) => {
        return http.get('reversegeocode?latitude=' + latitude + '&longitude=' + longitude)
    },
}