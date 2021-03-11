<template>
    <div v-if="weatherForecastData">
        <div class="card" >
            <div class="card-body">
                <h5 class="card-title text-left">{{weatherForecastDates[0] | momentFullDayOfWeek }}</h5>
                <h6 class="card-subtitle text-left mb-4 text-muted">{{weatherForecastDates[0] | momentFullDate}}, {{cityName}} - {{stateName}}</h6>
                <div class="row mb-4">
                    <div class="col" v-for="(forecast, indexForecast) in Object.values(this.weatherForecastDataArray[0])" :key="`forecast-${indexForecast}`">
                        <h5 class="text-center"> {{ dayShift[indexForecast] }}</h5>
                        <img class="img-fluid text-center" :src="forecast.icone" style="max-height: 60px" />
                        <h6 class="text-center"> {{ forecast.temp_min }}-{{ forecast.temp_max }} ºC</h6>
                    </div>
                </div>
            </div>
            <div class="card-footer py-0">
                <div class="row">
                    <div class="col" v-for="(forecastDay, indexForecastDay) in this.weatherForecastFutureDataArray" :key="`forecastDay-${indexForecastDay}`">
                        <small class="font-weight-bold mb-0">{{weatherForecastFutureDates[indexForecastDay] | momentShortDayOfWeek }}</small>
                        <div v-if="Object.values(forecastDay).length == 3" :id="`carousel-${indexForecastDay}`" class="carousel slide" data-ride="carousel"  data-interval="false">
                            <div class="carousel-inner">
                                <div class="carousel-item" :class="index ? '' : 'active'" v-for="(forecastDayShift, index) in Object.values(forecastDay)" :key="`forecastDayShift-${index}`" >
                                    <small class="text-center">{{dayShift[index]}}</small><br/>
                                    <img class="text-center" :src="forecastDayShift.icone" style="width: 40px;" /><br/>
                                    <small class="text-center">{{forecastDayShift.temp_min}}-{{forecastDayShift.temp_max}} ºC</small>
                                </div>
                            </div>
                            <a class="carousel-control-prev" :href="`#carousel-${indexForecastDay}`" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" :href="`#carousel-${indexForecastDay}`" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                        <div v-else class="row">
                            <div class="col">
                                <small class="text-center">Day-long</small><br/>
                                <img class="text-center" :src="forecastDay.icone" style="width: 40px;" /><br/>
                                <small class="text-center"> {{ forecastDay.temp_min }}-{{ forecastDay.temp_max}} ºC</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import moment from 'moment'

export default {
    data() {
        return {
            weatherForecastData: null,
            dayShift : ["Morning", "Afternoon", "Night"]
        }
    },
    filters: {
        momentFullDayOfWeek: function (date) {
            return moment(date, 'DD/MM/YYYY').format('dddd');
        },
        momentShortDayOfWeek: function (date) {
            return moment(date, 'DD/MM/YYYY').format('ddd');
        },
        momentFullDate: function (date) {
            return moment(date, 'DD/MM/YYYY').format('Do MMMM  YYYY');
        },
    },
    computed:{
        isWeatherForecastLoaded(){
            return this.weatherForecastData ? true : false
        },
        weatherForecastDates(){
            return Object.keys(Object.values( this.weatherForecastData )[0])
        },
        weatherForecastFutureDates(){
            return Object.keys(Object.values( this.weatherForecastData )[0]).splice(1)
        },
        weatherForecastDataArray(){
            return Object.values(Object.values( this.weatherForecastData )[0])
        },
        weatherForecastFutureDataArray(){
            return Object.values(Object.values( this.weatherForecastData )[0]).splice(1)
        },
        stateName(){
            return Object.values(this.weatherForecastDataArray[0])[0].uf
        },
        cityName(){
            return Object.values(this.weatherForecastDataArray[0])[0].entidade
        }
    },
}
</script>

<style scoped>
    .card{
        background: #e1ecff;
        background-image: linear-gradient(to left bottom, #d6eef6, #dff0fa, #e7f3fc, #eff6fe, #f6f9ff)
    }

    .card .card-body:first-child {
        background: url('../assets/weather.svg') no-repeat center;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: local;
    }

    .card-footer{
        background-color: rgba(33, 33, 33, 0.085)
    }
</style>