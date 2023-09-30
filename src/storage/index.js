import { createStore } from "vuex";
import util from './util/index.js'
import auth from './auth/index.js'
import admin from './admin/index.js'

const store = createStore({
    modules:{
        util: util,
        auth:auth,
        admin:admin
    }
})

export default store