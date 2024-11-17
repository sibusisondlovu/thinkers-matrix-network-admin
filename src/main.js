import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// import VueToasty from "vue-toasty";
// import "vue-toasty/dist/vue-toasty.css";
createApp(App).use(router).mount("#app");
