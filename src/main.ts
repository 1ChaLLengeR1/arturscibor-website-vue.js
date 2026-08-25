import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./storage"
import { i18n } from "./utils/i18n";
import { initTheme } from "./utils/theme";

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(store)
app.use(i18n);

initTheme();

app.mount("#app");
