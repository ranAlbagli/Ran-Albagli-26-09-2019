<template>
  <div class="weather-preview-container">
    <div class="weather-preview">
      <img :src="icon" alt="">
      <p>{{ day.Date | moment("dddd, MMMM Do") }}</p>
      <p>{{day.Day.IconPhrase}}</p>
      <p>{{temp}}</p>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    day: Object
  },
  data() {
    return {
      
    };
  },
   created() {
     
  },
  computed: {
      icon(){
         return  `https://developer.accuweather.com/sites/default/files/${this.day.Day.Icon < 10 ? "0" + this.day.Day.Icon : this.day.Day.Icon}-s.png`
      },
      temp(){
         return  (this.$store.getters.tempFormat? this.day.Temperature.Maximum.Value+' ℉' : Math.round(((this.day.Temperature.Maximum.Value-32)*5)/9) +' ℃') 
      }
  },
  methods: {
  
  },
  components: {
  }
};
</script>



<style lang="scss" scoped>
@import '../styles/cmps/WeatherPreview.style.scss';


</style>
