<template>
  <div class="home">
    <WeatherSearch @setForecastWeather="setForecastWeather" />
    <div v-if="currentCity" class="forecast-container">
      <div class="data-display">
      <p>{{currentCity.city}}, {{currentCity.country}}</p>
       <sui-icon @click="toggleFavorite" size="huge" :name="isFavorite" color="red"/>
       </div>
      <WeatherList :forecastWeather="forecastWeather" />
    </div>
  </div>
</template>


<script>

import WeatherSearch from "../components/WeatherSearch";
import WeatherList from "../components/WeatherList";
import weatherService from '../services/WeatherService'


export default {
   async created() {
    let currentCity = this.$store.getters.currentCity;    
    if (!currentCity){
      try{
        const userCity = await weatherService.getUserCity();    
        await this.$store.dispatch({ type: "setForecastWeather" ,city:userCity});
        await this.$store.dispatch({ type: "setCurrentCity" ,city:userCity});
        } catch(err){
        const telAvivCity = {city: "Tel-Aviv",country:'Israel',id:21584,isFav: false};        
        await this.$store.dispatch({ type: "setForecastWeather" ,city:telAvivCity});
        await this.$store.dispatch({ type: "setCurrentCity" ,city:telAvivCity});
        this.$toasted.show('User denied Geolocation',{duration:'2000'})
        console.log(err);
      }
    }
     else {
       try {  
         await this.$store.dispatch({ type: "setForecastWeather" ,city:currentCity});
      } catch (err) {
        console.log(err);   
      }
    }
  },

  methods: {
    async setForecastWeather(city) {
         try {
        await this.$store.dispatch({ type: "setForecastWeather" ,city});
        await this.$store.dispatch({ type: "setCurrentCity" ,city});
      } catch (err) {
        console.log(err);
      }
    },
    async toggleFavorite() {
      try {
        await this.$store.dispatch({ type: "toggleFavorite" ,city:this.currentCity});
      } catch (err) {
        console.log(err);
      }
    }
  },

  computed: {
      forecastWeather(){
      return this.$store.getters.forecastWeather;
      },
      currentCity(){
      return this.$store.getters.currentCity;
      },
        isFavorite(){        
         return  this.$store.getters.currentCity.isFav ? "heart icon":"heart outline icon" ; 
      }
  },

  components: {
    WeatherSearch,
    WeatherList,
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/views/Home.style.scss';
 
</style>
