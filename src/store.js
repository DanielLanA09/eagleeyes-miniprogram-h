import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      USER_INFO:null,
      BASE_HOST:null,
      DEVISIONS:null,
      CURRENT_DEVISION:null,
      CURRENT_COVER:null
    },
    mutations: {
      SET_USER(state,user){
        console.log('STORING USER INFO...');
        state.USER_INFO = user;
        console.log('STORED USER INFO IS:',state.USER_INFO);
      },
      SET_BASE_HOST(state,host){
        console.log('STORING BASE_HOST...');
        state.BASE_HOST = host;
        console.log('STORED BASE_HOST IS:',state.BASE_HOST);        
      },
      SET_CURRENT_COVER(state,cover){
        console.log('STORING CURRENT COVER...');
        state.CURRENT_COVER = cover;
        console.log('STORED CURRENT COVER IS: ',state.CURRENT_COVER);
      },
      SET_CURRENT_DEVISION(state,dev){
        console.log('STORING CURRENT DEV...');
        state.CURRENT_DEVISION = dev;
        console.log('STORED CURRENT DEV IS:',state.CURRENT_DEVISION);
      },
      SET_DEVISIONS(state,devs){
        console.log('STORING DEVS...');
        state.DEVISIONS = devs;
        console.log('STORED DEVISIONS ARE:',state.DEVISIONS);
        
      }
    },
    actions: {
  
    }
  })