
<template>
  <div class="favorite-list">
    <FavoritePreview v-for="(favorite, i) in favorites" :key="i" :favorite="favorite" />
  </div>
</template>


<script>
import FavoritePreview from './FavoritePreview';

export default {
   props: {
    favorites: Array
  },
  components: {
    FavoritePreview,
  }, 
};
</script>


<style lang="scss" scoped>
@import '../styles/cmps/FavoriteList.style.scss';

</style>
