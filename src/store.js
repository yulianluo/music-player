import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		musicUrl: 1
	},
	mutations:{
		getMusicUrl(state,mp3url){
			state.musicUrl = mp3url;
		}
	}
})