import { fetchGet } from "../../components/JS/fetchGetActions";
import { fetchData } from "../../components/JS/fetch";
import store from "../../storage/index.js";
import router from "../../router/index.js";

export default {
  async loadArrayJobs(context) {
    const url = "";
    const response = await fetchGet(url);
    if (!response) {
      return;
    }
    context.commit("loadArrayJobs", response);
  },

  async loadInformationHome(context) {
    const url = "";
    const response = await fetchGet(url);
    if (!response) {
      return;
    }
    context.commit("loadInformationMe", response);
  },

  async loadImagesPortfolio(context) {
    const url = "";
    const response = await fetchGet(url);
    if (!response) {
      return;
    }
    context.commit("loadImagesPortfolio", response);
  },

  async loadInformationAboutMe(context) {
    const url = "";
    const response = await fetchGet(url);
    if (!response) {
      return;
    }
    context.commit("loadInformationAboutMe", response);
  },

  async loadReadMore(context) {
    const url = "";
    const response = await fetchGet(url);
    if (!response) {
      return;
    }
    context.commit("loadReadMore", response);
  },

  async loadTools(context) {
    const url = "";
    const response = await fetchGet(url);
    if (!response) {
      return;
    }
    context.commit("loadTools", response);
  },

  async loadProjects(context) {
    const url = "";
    const response = await fetchGet(url);
    if (!response) {
      return;
    }
    context.commit("loadProjects", response);
  },

  async loadProject(context, payload) {
    const url = "";
    const method = "POST";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = { id: payload };
    const response = await fetchData(url, method, headers, body, "body");
    if (response.error) {
      store.commit("util/informationObject", {
        error: response.error,
        information: "Błąd serwera!",
      });
      router.push({ name: "not-found" });
      return;
    }
    context.commit("loadProject", response);
  },

  async loadMessage(context){
    const url = ''
    const response = await fetchGet(url);
    if (!response) {
      return;
    }
    context.commit("loadMessage", response)
  }
};
