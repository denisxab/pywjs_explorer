import { ClientsWbsRequest_Mod, ServerWbsResponse } from "wbs/wbs_type";
import { ClassHID } from "wbs/wbs";
import { getPath } from "wbs/wbs_std";

export interface TFile {
    type_f: "dir" | "file";
    chmod: string;
    user: string;
    group: string;
    date_create: string;
    date_update: string;
    st_size: number;
}
export interface TFiles {
    [key: string]: TFile;
    // files: <TFiles>[
    //     {name: etc, v: {
    //         type_f: "dir",
    //         chmod: "777",
    //         user: "root",
    //         st_size: 4,
    //         group: "root",
    //         date_create: "01.01.2023",
    //         date_update: "01.01.2023",
    //     }},
    // ]
}

export const hids = new ClassHID({
    filesFromDir: 1,
    pathLink: 2,
    user_cache: 3,
});

export enum EviewSelect {
    none = 0,
    img = 1,
    text = 2,
    pdf = 3,
}
export const fileStore = {
    // Доступные переменные в хранилище
    state() {
        return {
            pathArray: [],
            pathDirLinks: getPath(
                "/media/denis/dd19b13d-bd85-46bb-8db9-5b8f6cf7a825/MyProject/vue_test/vts2/public/raw"
            ),
        };
    },
    // Вычисляемые функции аналогичные `computed`
    getters: {
        /*Получить путь к ссылки c PDF*/
        pathLink(state, getters, rootState) {
            if (rootState.wbs.res.value[hids.names.pathLink]) {
                return `raw/${
                    rootState.wbs.res.value[hids.names.pathLink].response
                }`;
            }
        },
        /*Получить список файлов*/
        filesFromDir(
            state,
            getters,
            rootState
        ): Array<[string, TFile | unknown]> {
            const c = rootState.wbs.res.value[hids.names.filesFromDir];
            if (c) {
                return c.response;
            } else {
                return [];
            }
            // // Отсортированный список файлов в пути `getters.filesFromDirWBS`
            // if (getters.filesFromDirWBS) {
            //     // Сортируем папки и файлы, по отдельным группам и объедением
            //     return [
            //         ...Object.entries(getters.filesFromDirWBS)
            //             .filter((e: any) => {
            //                 return e[1].type_f == "dir";
            //             })
            //             .sort(
            //                 (a: string | unknown, b: TFile | unknown): any => {
            //                     return a[0] > b[0];
            //                 }
            //             ),

            //         ...Object.entries(getters.filesFromDirWBS)
            //             .filter((e: any) => {
            //                 return e[1].type_f == "file";
            //             })
            //             .sort(
            //                 (a: string | unknown, b: TFile | unknown): any => {
            //                     return a[0] > b[0];
            //                 }
            //             ),
            //     ];
            // } else {
            //     return [];
            // }
        },
        /*Текущий путь*/
        pathStr(state, getters, rootState) {
            // Текущий путь в формате строки
            if (state.pathArray[0] !== "/") {
                return "/" + state.pathArray.join("/");
            }
            return "/";
        },
    },
    // Синхронные функции для изменения данных в переменных
    mutations: {
        // Добавить директорию к текущему пути
        addPathArray(state, newPath: string) {
            state.pathArray = [...state.pathArray, newPath];
        },
        // На директория вверх
        popPathArray(state) {
            state.pathArray.pop();
            state.pathArray = [...state.pathArray];
        },
        // Обновить путь целиком
        updatePath(state, newPath: string) {
            state.pathArray = newPath.split("/").filter((i) => i != "");
        },
    },
    // Действия могут использоваться для асинхронных операций.
    actions: {
        //
        //
        //
        init({
            dispatch,
            commit, // то же, что и `store.dispatch`
        }) {
            // Получаем пользовательский кеш
            dispatch(
                "wbs/send_before",
                {
                    mod: ClientsWbsRequest_Mod.cache_read_key,
                    h_id: hids.names.user_cache,
                    body: {
                        key: "rawPath",
                    },
                    after: (las_res: ServerWbsResponse) => {
                        // Обновляем путь
                        commit("updatePath", JSON.parse(las_res.response));
                        // Переходим на путь из кеша
                        dispatch("getFileFromPath");
                    },
                },
                { root: true }
            );
        },
        // Добавить директорию к текущему пути
        addPathArray({ commit, dispatch }, newPath) {
            commit("addPathArray", newPath);
            dispatch("getFileFromPath");
        },
        // На директория вверх
        popPathArray({ commit, dispatch }) {
            commit("popPathArray");
            dispatch("getFileFromPath");
        },
        // Обновить путь целиком
        updatePath({ commit, dispatch }, newPath: string) {
            commit("updatePath", newPath);
            dispatch("getFileFromPath");
        },
        //
        //
        //
        /* Получить файлы по пути `getters.pathStr` */
        getFileFromPath({ dispatch, getters }) {
            // Переходим на путь из кеша
            dispatch(
                "wbs/send",
                {
                    mod: ClientsWbsRequest_Mod.func,
                    h_id: hids.names.filesFromDir,
                    body: {
                        n_func: "getFileFromPath",
                        kwargs: { path: getters.pathStr },
                    },
                },
                { root: true }
            );
        },
        /* Создать символьную ссылку на указанный файл, чтобы можно было его открыть в браузере */
        viewFile({ state, dispatch, getters }, { pathFile, extendsFile }) {
            if (pathFile) {
                dispatch(
                    "wbs/send",
                    {
                        mod: ClientsWbsRequest_Mod.func,
                        h_id: hids.names.pathLink,
                        body: {
                            n_func: "createLinkToFile",
                            kwargs: {
                                pathDirLinks: state.pathDirLinks,
                                pathFile: pathFile,
                                extendsFile: extendsFile,
                            },
                        },
                    },
                    { root: true }
                );
            }
        },
        /* Отчистить все символьные файлы */
        clearLink({ state, commit, dispatch }) {
            dispatch(
                "wbs/send",
                {
                    mod: ClientsWbsRequest_Mod.func,
                    h_id: hids.names.pathLink,
                    body: {
                        n_func: "clearLink",
                        kwargs: {
                            pathDirLinks: state.pathDirLinks,
                        },
                    },
                },
                { root: true }
            );
        },
    },
    // Локальное пространство имен. Позволяет обращаться к мутации через `ИмяМодуляХранилища/ФункцияМутации`
    namespaced: true,
};
