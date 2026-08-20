import { fetchData } from "./fetch";
import store from '../../storage'

export async function fetchGet(url){
    const method = "GET";
    const headers = {
      "content-type": "application/json",
    };
    store.commit('util/loadingSpinner', true)
    const response = await fetchData(url, method, headers, null, false);
    store.commit('util/loadingSpinner', false)
    if(response.error){
        store.commit('util/notificationBox', {
            information: response.error,
            class: false,
            offNotification: true
        })
        return false;
    }
    return response
}
