<template>
  <div class="demo">
    <div class="autosuggest-container search-input ">
      <vue-autosuggest
        v-model="query"
        :suggestions="suggestions"
        @focus="focusMe"
        @click="clickHandler"
        @input="onInputChange"
        @selected="onSelected"
        :get-suggestion-value="getSuggestionValue"
        :input-props="{id:'autosuggest__input', placeholder:'Search city...',
        style:'display:flex; margin:0 auto ; width:300px'}"
      >
        <div slot-scope="{suggestion}" style="display: flex; align-items: center;">
          <div
            style="{ display: 'flex', color: 'navyblue'}"
          >{{suggestion.item.city}},{{ suggestion.item.country}}</div>
        </div>
      </vue-autosuggest>
    </div>
  </div>
</template>
 
<script>
import { VueAutosuggest } from "vue-autosuggest";
import axios from "axios";
import WeatherService from '../services/WeatherService'

export default {
  components: {
    VueAutosuggest
  },
  data() {
    return {
      query: "",
      suggestions: [
        {
          data: []
        }
      ]
    };
  },
  computed: {},
  methods: {
    clickHandler(item) {
      // event fired when clicking on the input
    },
    onSelected(chosenCity) {
      this.$emit('setForecastWeather',chosenCity.item)
    },
    async onInputChange(text) {
      // event fired when the input changes
      const res = await WeatherService.getLocationAutoComplete(text)
      if (res) {
        const result = res.slice(0, 5).map(i => {
          return {
            city: i.LocalizedName,
            country: i.Country.LocalizedName,
            id: i.Key,
            isFav: false
          };
        });

        this.suggestions[0].data = result;
      }
    },
  
    getSuggestionValue(suggestion) {
      return suggestion.item.name;
    },
    focusMe(e) {
    }
  }
};
</script> 
 
<style>
.autosuggest-container{
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 500px

}

.search-input {
  width: 25rem;
  -webkit-appearance: none;
  border: 1px solid #dadada;
  padding: 0.9375rem;
  font-size: 1rem;
  border-radius: 4px;
  box-shadow: 0px 4px 10px 0px #b3b3b3;
  background-color: white;
  height: 60px;
}
.demo {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

input {
  width: 90%;
  padding: 0.5rem;
}

ul {
  width: 100%;
  color: rgba(30, 39, 46, 1);
  list-style: none;
  margin: 0;
  padding: 0.5rem 0 0.5rem 0;
}
li {
  margin: 0 0 0 0;
  border-radius: 5px;
  padding: 0.75rem 0 0.75rem 0.75rem;
  display: flex;
  align-items: center;
}
li:hover {
  cursor: pointer;
}

#autosuggest {
  /* width: 100%; */
  /* display: block; */
  position: absolute;
  background-color:#d9dddc

}
.autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178, 0.2);
}
</style> 