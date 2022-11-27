<template>
    <div v-keydown="keydown" class="files">
        <RecycleScroller
            class="scroller"
            :items="files"
            :item-size="43"
            :gridItems="64"
            :buffer="1000"
            key-field="name"
            v-slot="{ item, index }"
        >
            <File
                class="item"
                :key="item.name"
                :detail="item.v"
                v-keydown="keydown"
                :name="item.name"
                :tabindex="<number>index + 1"
                @onClick="onClick"
            />
        </RecycleScroller>
    </div>
</template>
<script lang="ts">
// import { TransitionGroup } from "vue";
import { TFile, TFiles } from "@/store/fileStore";
import File from "@/components/file.vue";

export default {
    emits: ["onClick"],
    components: { File },
    computed: {
        files(): TFiles {
            // Список файлов в текущей директории
            return this.$store.getters["file/filesFromDir"];
        },
    },
    // Методы
    methods: {
        /* Обработка ЛКМ по элементу */
        onClick(newPath: string, detail: TFile) {
            this.$emit("onClick", newPath, detail);
        },
        /* Обработка нажатий клавиш */
        keydown(target: HTMLElement, event_key: KeyboardEvent) {
            if (target["classList"] && target.classList.contains("file")) {
                if (event_key.key == "Tab") {
                    //
                    // Логика
                    //
                    let select = undefined;
                    if (event_key.shiftKey) {
                        select = target.parentNode.previousSibling;
                    } else {
                        select = target.parentNode.nextSibling;
                    }
                    select.children[0].click();
                }
            }
        },
    },
};
</script>
<style lang="scss" scoped></style>
