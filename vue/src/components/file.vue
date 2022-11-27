<template>
    <div class="file" @click="onClick">
        <span class="date_update"> {{ detail.date_update }}</span>
        <span class="chmod">{{ detail.chmod }}</span>
        <span class="chown">{{ detail.group }}:{{ detail.user }}</span>
        <span
            class="name"
            :class="{
                file__file: detail.type_f === 'file',
                file__dir: detail.type_f === 'dir',
            }"
            >{{ name }}</span
        >
    </div>
</template>
<script lang="ts">
import { TFile } from "@/store/fileStore";

export default {
    emits: ["onClick"],
    // Компоненты
    components: {},
    // Аргументы
    props: {
        detail: {
            type: Object as () => TFile,
        },
        name: {
            type: String,
        },
    },
    // Методы
    methods: {
        onClick(event: any) {
            this.$emit("onClick", this.name, this.detail);
        },
    },
};
</script>
<style lang="scss" scoped>
@import "wbs/vue/gcolor.scss";

.file {
    font-size: 0.9em;
    color: $БазовыйЦветТекста;
    border: 1px solid $ЦветФонаПодсказки;
    text-align: start;
    padding-left: 10px;
    display: flex; //!!!!
    align-items: center;
    /////////////
    width: 100%;
    height: 48px;
    background: $ЦветФона;
    &:hover,
    &:focus {
        box-shadow: inset 0 0 10px 1px #000;
    }
    span {
        &.date_update {
            color: $ПриглушенныйЦветТекста;
            flex-basis: 20%;
        }
        &.chmod {
            color: $ПриглушенныйЦветТекста;
            flex-basis: 10%;
        }
        &.chown {
            color: $ПриглушенныйЦветТекста;
            flex-basis: 20%;
        }
        &.name {
            // box-shadow: inset 0 0 8px 1px $ЦветФона;
            flex-basis: 50%;
            background: $ЦветФонаПодсказки;
            overflow: auto;
            padding: 6px;
            color: $ЯркоеВыделение;
            border-radius: 5px 0 0 5px;
        }
        &.file__file {
            background: $ЦветФона;
        }
        &.file__dir {
            // background: $ЦветФонаПодсказки;
            // box-shadow:  0 0 1px 1px $Среднее;
        }
    }
}
</style>
