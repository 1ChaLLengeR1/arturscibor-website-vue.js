import mutations from './mutations.js'
import action from './actions.js'
import getters from './getters.js'

export default{
    namespaced: true,
    state(){
        return{
            loadingSpinner: false,
            navigationAdmin: true,
            informationObject: null,
            notificationBox:{
                information: null,
                class: null,
                offNotification: false
            }
        }
    },
    mutations: mutations,
    action: action,
    getters: getters
}