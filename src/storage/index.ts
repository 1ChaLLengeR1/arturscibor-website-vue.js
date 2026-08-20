import { createStore } from "vuex";
import aboutme from "./aboutme/index";
import auth from "./auth/index";
import contact from "./contact/index";
import cv from "./cv/index";
import projects from "./projects/index";
import tools from "./tools/index";
import util from "./util/index";
import work from "./work/index";

const store = createStore({
  modules: {
    util,
    auth,
    work,
    aboutme,
    cv,
    tools,
    projects,
    contact,
  },
});

export default store;
