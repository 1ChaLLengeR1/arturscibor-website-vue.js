import mutations from "./mutations.js"
import actions from "./actions.js"
import getters from './getters.js'

export default{
    namespaced: true,
    state(){
        return{
            optionsTokens:{
                id_user:null,
                access_token:null,
                refresh_token:null,
                type:null
            }
        }
    },
    mutations:mutations,
    actions:actions,
    getters:getters
}