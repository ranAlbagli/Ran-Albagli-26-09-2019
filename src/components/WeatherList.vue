
<template>
  <div class="weather-list">
    <WeatherPreview  v-for="(day, i) in forecastWeather" :key="i" :day="day" />
  </div>
</template>


<script>
import WeatherPreview from './WeatherPreview';
export default {
   props: {
    forecastWeather: Array
  },
  data() {
    return {};
  },
  components: {
    WeatherPreview,
    
  },
  created(){
      
  }
  
};
</script>


<style lang="scss" scoped>
@import '../styles/cmps/WeatherList.style.scss';

</style>