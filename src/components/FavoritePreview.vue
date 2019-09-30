<template>
   <div class="forecast-preview-container">
    <div class="forecast-preview">
      <img :src="tempIcon" alt="">
      <h3>{{favorite.city}},{{ favorite.country}}</h3>
      <p>{{ date | moment("dddd, MMMM Do") }}</p>
      <p>{{desc}}</p>
      <p>{{temp1}}</p>
        <sui-button size="small" compact icon="trash alternate outline icon"
        style="border: 1px solid white;"
         @click="toggleFavorite"
        ></sui-button>
        <sui-button size="small" compact
        style="border: 1px solid white;"
        @click="moveToHome"
        >FORECAST</sui-button>
      </div>
  </div>
</template>

<script>
import WeatherService from "../services/WeatherService";
export default {
  props: {
    favorite: Object
  },
  data() {
    return {
      icon: "",
      temp: "",
      date: "",
      desc: ""
    };
  },

  async created() {
    const details = await WeatherService.getCurrentWether(this.favorite.id);
    this.desc = details.WeatherText;
    this.icon = details.WeatherIcon;
    this.temp = details.Temperature.Imperial.Value;
    this.date = details.LocalObservationDateTime;
  },

  computed: {
    tempIcon() {
      return `https://developer.accuweather.com/sites/default/files/${
        this.icon < 10 ? "0" + this.icon : this.icon
      }-s.png`;
    },
     temp1(){
          return  (this.$store.getters.tempFormat? this.temp+' ℉' : Math.round(((this.temp-32)*5)/9) +' ℃')
      }
  },
  methods: {
    async toggleFavorite() {
      try {
        await this.$store.dispatch({
          type: "toggleFavorite",
          city: this.favorite
        });
      } catch (err) {
        console.log(err);
      }
    },
    async moveToHome() {
      try {
        await this.$store.dispatch({ type: "setCurrentCity" ,city:this.favorite});
        this.$router.push('/');
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
  

<style lang="scss" scoped>
@import '../styles/cmps/FavoritePreview.style.scss';
</style>