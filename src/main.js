import { createApp } from "vue";
import App from "./App.vue";
import Vuex from "./Store/Store";
import "./index.css";

// Vue.mixin({

// })

const app = createApp(App);

app.use(Vuex);
app.mount("#app");
