import WeatherService from '../services/WeatherService'

export default {
    state:{
        forecastWeather:null,
        currentCity:null,
        isCelsius:true
    },
    mutations:{
       setForecastWeather(state,{forecastWeather}){
           state.forecastWeather=forecastWeather
       },
       setCurrentCity(state,{city}){
           state.currentCity=city
       },
        toggleTempFormat(state){
            state.isCelsius=!state.isCelsius
        }
    },
    getters: {
        forecastWeather(state) {
            return  state.forecastWeather
        },
        currentCity(state) {
            return  state.currentCity
        },
        
        tempFormat(state){
            return state.isCelsius
        }
    },
    actions:{
        async setForecastWeather(context, { city}) {
            try {
                const forecastWeather = await WeatherService.getForcastWeather(city.id)
                context.commit({ type: 'setForecastWeather', forecastWeather })
            } catch (err) {
                console.log(err);
                
            }
        },
        async setCurrentCity(context, { city}) {
            try {
                context.commit({ type: 'setCurrentCity', city })
            } catch (err) {
                console.log(err);  
            }
        },
        async toggleTempFormat(context){
            try{
                 context.commit({type:'toggleTempFormat'})
            }catch(err){
                console.log(err);
            
            }
        }
    }
}