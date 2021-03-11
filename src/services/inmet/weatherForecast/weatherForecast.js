import { http } from './config';

export default{
    weatherForecast:(idCity) => {
        return http.get('previsao/' + idCity)
    },
}