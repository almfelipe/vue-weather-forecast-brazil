<template>
  <div class="container">

      <div class="about">
        <h1>vue-weather-forecast-brazil</h1>
      </div>

      <div v-if="isStatesLoaded" class="form-group">
        <label>State</label>
        <select v-model="state.sigla" class="form-control form-control-sm">
          <option v-for="curState in states" :key="curState.sigla" v-bind:value="curState.sigla">
              {{curState.nome}}
          </option>
        </select>
      </div>
      <div v-if="isCitiesLoaded" class="form-group">
        <label>City</label>
        <select v-model="city.id" class="form-control form-control-sm">
          <option v-for="curCity in cities" :key="curCity.id" v-bind:value="curCity.id">
              {{curCity.nome}}
          </option>
        </select>
      </div>
    <hr/>
    <WeatherForecastCard ref="weatherForecastCard"/>
  </div>
</template>

<script>

import IbgeLocalityAPI from '@/services/ibge/locality/locality'
import InmeWeatherForecastAPI from '@/services/inmet/weatherForecast/weatherForecast'
import WeatherForecastCard from '@/components/WeatherForecastCard'

export default {
  components: {
    WeatherForecastCard
  },
  data() {
    return {
      states: [],
      cities: [],
      weatherForecastData: null,
      state: {sigla: null},
      city: {id: null}
    }
  },
  computed: {
    isStatesLoaded() {
      return (this.states && this.state.sigla) ? true : false
    },
    isCitiesLoaded(){
      return (this.cities && this.city.id) ? true : false
    },
  },
  methods:{
    updateWeatherForecastCard(){
      this.$refs.weatherForecastCard.weatherForecastData = this.weatherForecastData
    }
  },
  watch: {
      'state.sigla': function (newValue, oldValue) {
        if (oldValue){
          this.$isLoading(true)
          IbgeLocalityAPI.cities(newValue).then(response => {
            this.cities = response.data
            this.city.id = this.cities[0].id
            this.$isLoading(false)
          }).catch(e => {
              console.log(e)
              this.$isLoading(false)
          })
        }
      },
      'city.id': function (newValue, oldValue) {
        if (oldValue){
            this.$isLoading(true)
            InmeWeatherForecastAPI.weatherForecast(newValue).then(response => {
              this.weatherForecastData = response.data
              this.updateWeatherForecastCard()
              this.$isLoading(false)
            }).catch(e => {
                console.log(e)
                this.$isLoading(false)
            })
        }
      }
  },  
  mounted() {
    this.$isLoading(true)
    IbgeLocalityAPI.states().then(response => {
        this.states = response.data
        this.state.sigla = this.states[0].sigla
        IbgeLocalityAPI.cities(this.state.sigla).then(response => {
            this.cities = response.data
            this.city.id = this.cities[0].id
            InmeWeatherForecastAPI.weatherForecast(this.city.id).then(response => {
              this.weatherForecastData = response.data
              this.updateWeatherForecastCard();
              this.$isLoading(false)
            })
        })
    }).catch(e => {
        console.log(e)
        this.$isLoading(false)
    })
  },
}
</script>
