import { createStore } from "vuex";
import { fileStore } from "./fileStore";
import { wbsStore } from "wbs/vue/wbsStore";

export default createStore({
    modules: { wbs: wbsStore, file: fileStore },
});
