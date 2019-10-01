import axios from 'axios';
// import storeService from './storeService'

export default{
    getLocationAutoComplete,
    getCurrentWether,
    getForcastWeather,
    getUserCity
}

const API_KEY ='Ri5y2eX4Y3kO65mtvxhPDAX7AsZ1tJb1'
// const API_KEY ='m9lAGyPN4SxWZAFBBSghB43DxuBB1VDj '


 async function getLocationAutoComplete(text){
     const res = await axios.get(
     `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${text}`)    
     return res.data

}

async function getCurrentWether(cityKey){
  const res = await axios.get(
    `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`
  )    
  return res.data[0]
}

async function getForcastWeather(cityKey){ 
    const res = await axios.get(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}`
  )  
  return res.data.DailyForecasts
}


async function getUserCity() {
  const coords = await _getUserLocation();  
  if (!coords) return;
  const lat = coords.coords.latitude;
  const lon = coords.coords.longitude;
  try {
    const res = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat}%2C${lon}`
    );
    const userCity = {
      id: res.data.ParentCity.Key,
      city: res.data.EnglishName,
      country: res.data.Country.EnglishName,
      isFav: false,
    };
    return userCity;
  } catch (err) {
    throw err;
  }
}


function _getUserLocation() {
  if (!navigator.geolocation) {
    return;
  } else {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
}