import UtilService from "./UtilService";

export default {
  toggleFavorite,
  getFavorites
};

const KEY_STORE='favorites'
const gFavorites = [];

function getFavorites(){
  let userFavorites = UtilService.load(KEY_STORE);
  if (!userFavorites) userFavorites = gFavorites;
  UtilService.store(KEY_STORE, userFavorites);
  return new Promise((resolve, reject) => {
    resolve(userFavorites);
  });
}


function toggleFavorite(city) {  
  let userFavorites = UtilService.load(KEY_STORE);
  if (!userFavorites) userFavorites = gFavorites;
  const idx = userFavorites.findIndex(fav => fav.id === city.id);  
  if (idx < 0) {
    city.isFav = true;
    userFavorites.push(city);
  } else {
    userFavorites.splice(idx, 1);
  }
  UtilService.store(KEY_STORE, userFavorites);
  return new Promise((resolve, reject) => {
    resolve(userFavorites);
  });
}
