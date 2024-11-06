import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import ru from "element-plus/dist/locale/ru.mjs";

createApp(App)
  .use(ElementPlus, {
    locale: ru,
  })
  .mount("#app");
