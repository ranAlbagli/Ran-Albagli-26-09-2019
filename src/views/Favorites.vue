<template>
  <div class="favorites-container">
    <div v-if="favorites.length>0">
      <FavoriteList :favorites="favorites" />
    </div>
    <p v-else>THERE IS NO FAVORITE YET</p>
  </div>
</template>


<script>
import FavoriteList from "../components/FavoriteList";
export default {
 async created(){
      await this.$store.dispatch({ type: "setFavorites"});
},
 computed:{
    favorites(){
      console.log( this.$store.getters.favorites); 
      return this.$store.getters.favorites;
    }
  },
  components: {
    FavoriteList
  }
};
</script>

<style lang="scss" scoped>
@import '../styles/views/Favorites.style.scss';

</style>
