import { fetchData } from "./fetch";
import router from '../../router/index.js'
import store from '../../storage/index.js'

export async function fetchGet(url){
    const method = "GET";
    const headers = {
      "content-type": "application/json",
    };
    store.commit('util/loadingSpinner', true)
    const response = await fetchData(url, method, headers, null, false);
    store.commit('util/loadingSpinner', false)
    if(response.error){
        store.commit('util/informationObject', {
            error: response.error,
            information: 'Błąd serwera!'
        })
        router.push({name:'not-found'})
        return false;
    }
    return response
}