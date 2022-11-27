<template>
    <div class="preview">
        <div class="preview_body">
            <!-- Если это Фото -->
            <img v-if="ViewSelect == 1" :src="pathLink" />
            <!-- Если это Текстовый файл -->
            <vcode
                v-else-if="ViewSelect == 2"
                :text="textFile"
                :color="`#d8dee9`"
                :border="`#2e3440`"
            />
            <!-- Если это PDF -->
            <iframe
                class="iframe"
                v-else-if="ViewSelect == 3"
                :src="pathLink"
                frameborder="0"
            ></iframe>
        </div>
        <div class="path">{{ absolutePathFile }}</div>
    </div>
</template>
<script lang="ts">
import { EviewSelect } from "@/store/fileStore";
export default {
    // Компоненты
    // Аргументы
    props: {
        // Полный путь к файлу
        absolutePathFile: String,
        // Путь к символьному файлу
        pathLink: String,
    },
    data() {
        return {
            // Текст в `vcode`
            textFile: "",
        };
    },
    computed: {
        /* Какой виджет показывать, в зависимости от расширения файла */
        ViewSelect(): EviewSelect | undefined {
            if (this.pathLink) {
                let res = undefined;
                switch (this.pathLink.split(".").slice(-1)[0]) {
                    case "pdf": {
                        res = EviewSelect.pdf;
                        break;
                    }
                    case "png":
                    case "jpg": {
                        res = EviewSelect.img;
                        break;
                    }
                    case "txt": {
                        res = EviewSelect.text;
                        // Читать ссылку на файл при изменения пути `pathTxt`
                        fetch(this.pathLink)
                            .then((response) => response.text())
                            .then((text) => {
                                // @ts-ignore
                                this.textFile = text;
                            });
                        break;
                    }
                }
                return res;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
@import "wbs/vue/gcolor.scss";

.preview {
    height: 100%;
    padding: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .preview_body {
        height: 95%;
        width: 100%;
        img {
            box-shadow: inset 0 0 15px 2px #000;
            object-fit: contain;
            height: 100%;
            width: 100%;
            padding: 0.5%;
            border-radius: 10px;
        }
        .iframe {
            height: 100%;
            width: 100%;
        }
    }
    .path {
        font-size: 0.9em;
        align-self: center;
        color: $ЯркоеВыделение;
        padding: 8px;
        border-radius: 0 0 5px 5px;
        white-space: nowrap;
        overflow: auto;
        height: 5%;
        text-align: center;
        width: 100%;
    }
}
</style>
