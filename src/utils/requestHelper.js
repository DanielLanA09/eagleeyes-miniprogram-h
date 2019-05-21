import Vue from 'vue'
import api from '@/api.js'

export default {
    install () {
        Vue.prototype.$http = api
    }
}