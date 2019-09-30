
import FavoriteService from '../services/FavoriteService'
export default {
    state: {
        favorites: [],
    },
    mutations: {
        setFavorites(state, { favorites }) {
            state.favorites = favorites
        }
    },
    getters: {
        favorites(state) {
            return state.favorites
        }
    },
    actions: {
        async setFavorites(context){
            const favorites=await FavoriteService.getFavorites()
            context.commit({ type: 'setFavorites', favorites })
        },
        async toggleFavorite(context, { city }) {
            const favorites = await FavoriteService.toggleFavorite(city)
            context.commit({ type: 'setFavorites', favorites })
        }
    },

}