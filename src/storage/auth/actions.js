import { fetchData } from "../../components/JS/fetch.js";
import router from '../../router/index.js'
import store from '../../storage/index.js';

export default {
  async automaticallyLogin() {
    
    const localStorageObject = JSON.parse(localStorage.getItem("user"));
    
    if (
      localStorageObject === null ||
      localStorageObject.id_user === null ||
      localStorageObject.access_token === null ||
      localStorageObject.refresh_token === null ||
      localStorageObject.type === null
    ) {
      store.commit("util/navigationAdmin", true);
      return;
    }

    const url = "";
    const method = "POST";
    const headers = {
      "content-type": "application/json",
    };
    const body = {
      id_user: localStorageObject.id_user,
      refresh_token: localStorageObject.refresh_token,
    };

    const response = await fetchData(url, method, headers, body, "body");

    if (response.error) {
      store.commit("util/navigationAdmin", true);
      store.commit("auth/logout");
      router.push({ name: "signin" });
      return;
    }
    localStorage.setItem("user", JSON.stringify(response));
    store.commit("auth/loadTokens", response);
    store.commit("util/navigationAdmin", false);
    router.push({ name: "adminhome" });
  },
};
