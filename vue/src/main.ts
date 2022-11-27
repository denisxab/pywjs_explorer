import { createApp } from "vue";
// import router from "./router/router";
import App from "./App.vue";
// import App from "wbs/vue/test_stend/App.vue";
import init_ui from "vue_xable/ui/init";
import init_directives from "vue_xable/directives/init";
import store from "./store";

//--------
import VueVirtualScroller from "vue3-virtual-scroller";
import "vue3-virtual-scroller/dist/vue3-virtual-scroller.css";
//--------

const app = createApp(App);

// Импорт пользовательских директив  в глобальную область
init_directives.map((i) => {
    app.directive(i.name, i);
});
// Импорт UI в глобальную область
init_ui.map((i) => {
    app.component(i.name, i);
});

app.use(VueVirtualScroller);

app.use(store) // .use(router)
    .mount("#app");


