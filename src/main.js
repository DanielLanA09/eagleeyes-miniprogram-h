import Vue from 'vue'
import App from './App'
import store from "./store"
import request from "@/utils/requestHelper.js"

Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(request)

Vue.prototype.$store = store
const app = new Vue(App,store)
app.$mount()
