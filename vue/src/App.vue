<template>
    <div class="app">
        <PyjsLog :hids="hids" />
        <div class="filesbox">
            <div class="wleft">
                <pathos
                    class="pathos"
                    :PathStr="pathStr"
                    @backPath="backPath"
                    @updatePath="updatePath"
                />
                <ofileList @onClick="onClickFile" />
            </div>
            <div class="wright">
                <div class="preview_box">
                    <preview
                        :absolutePathFile="absolutePathFile"
                        :pathLink="pathLink"
                    />
                </div>
                <div class="console_box">
                    <console :consoleStr="console" />
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>
<script lang="ts">
import Pathos from "@/components/pathos.vue";
import Console from "@/components/console.vue";
import Preview from "@/components/preview.vue";
import ofileList from "@/components/ofileList.vue";
import PyjsLog from "wbs/vue/pyjs_log/pyjs_log.vue";
import { hids, TFile } from "./store/fileStore";
import { ClientsWbsRequest_Mod } from "wbs/wbs_type";

export default {
    // Компоненты
    components: { Preview, Console, Pathos, PyjsLog, ofileList },
    // Переменные
    data() {
        return {
            isShow: true,
            //
            absolutePathFile: "",
            console: "$ ls",
            hids: hids,
        };
    },
    // Методы
    methods: {
        /* Нажатие на виджет "файла" или "папки" */
        onClickFile(newPath: string, detail: TFile) {
            // Если это папка то переходим в ней
            if (detail.type_f == "dir") {
                this.$store.dispatch(`file/addPathArray`, newPath);
            }
            // Если это файл то открываем его
            else {
                const suffix = newPath.split(".").slice(-1)[0].toLowerCase();
                const path =
                    this.$store.getters["file/pathStr"] + "/" + newPath;
                // Если это изображение то открываем его
                if (["png", "jpg", "webp"].includes(suffix)) {
                    this.absolutePathFile = path;
                    this.$store.dispatch(`file/viewFile`, {
                        pathFile: path,
                        extendsFile: suffix,
                    });
                }
                // Если это PDF
                else if (["pdf"].includes(suffix)) {
                    this.absolutePathFile = path;
                    this.$store.dispatch(`file/viewFile`, {
                        pathFile: path,
                        extendsFile: "pdf",
                    });
                }
                // Все остальное считается как текстовый файл.
                else {
                    // Размер файла в МБ
                    const size_file_md: number = detail.st_size / 1024 / 1024;
                    // Уведомить о большом размере файла если файл больше 5 мб
                    if (size_file_md >= 5) {
                        alert(
                            `Файл="${path}"" имеет большой размер '${size_file_md}', читаем файлы только менее 1 мб`
                        );
                    } else {
                        this.absolutePathFile = path;
                        this.$store.dispatch(`file/viewFile`, {
                            pathFile: path,
                            extendsFile: "txt",
                        });
                    }
                }
            }
        },
        /* На директорию вверх */
        backPath() {
            this.$store.dispatch(`file/popPathArray`);
        },
        /* Обновить путь, если в ручную указать путь в строке */
        updatePath(newPath) {
            this.$store.dispatch(`file/updatePath`, newPath);
        },
        /* Удаляем ссылочные файлы, чтобы они не засорялись */
        clearLink() {
            this.$store.dispatch(`file/clearLink`);
        },
    },
    computed: {
        /* Путь к текущей папке в текстовом формате */
        pathStr() {
            return this.$store.getters["file/pathStr"];
        },
        /* Получаем имя ссылочного файла который нужно показать */
        pathLink() {
            return this.$store.getters["file/pathLink"];
        },
    },
    beforeCreate() {
        // Инициализируем подключение к Python серверу через Web Socket
        this.$store.dispatch("wbs/initWebSocket", {
            token: "sysdba",
            host: "localhost",
            port: 9999,
            after_connect: () => {
                // Получения файлов по пути `/`
                this.$store.dispatch("file/init");
            },
            destruction: () => {
                // Удаляем ссылочные файлы, чтобы они не засорялись
                this.$store.dispatch(`file/clearLink`);
                // Добавить путь в пользовательский кеш
                this.$store.dispatch(
                    "wbs/send",
                    {
                        mod: ClientsWbsRequest_Mod.cache_add_key,
                        h_id: -1,
                        body: {
                            key: "rawPath",
                            value: this.pathStr,
                        },
                    },
                    { root: true }
                );
            },
        });
    },
};
</script>
<style lang="scss">
@import "wbs/vue/gcolor.scss";

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    background: rgb(255, 255, 255);
    height: 100vh;
}

.filesbox {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    .wleft {
        width: 40%;
        height: 100%;
        background: $ЦветФонаПодсказки;
        .pathos {
            position: sticky;
            position: -webkit-sticky;
            align-self: flex-start;
            top: 0;
            box-shadow: inset 0 0 5px 1px #000;
        }
        .files {
            display: flex;
            flex-direction: column;
            height: 94%;
        }
    }
    .wright {
        display: flex;
        flex-direction: column;
        width: 60%;
        height: 100%;

        .preview_box {
            width: 100%;
            background: $ЦветФонаВсплывающегоОкна;
            flex-basis: 70%;
            height: 70%;
        }
        .console_box {
            flex-basis: 30%;
            height: 30%;
        }
    }
    .footer {
        background: #000;
        width: 100%;
        height: 100px;
    }
}
</style>
