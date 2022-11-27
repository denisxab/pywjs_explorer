<template>
    <div class="path">
        <input type="text" :value="PathStr" @blur="updatePath" />
        <vbutton @click="backPath">&lt</vbutton>
    </div>
</template>
<script lang="ts">
export default {
    emits: ["updatePath", "backPath"],
    // Компоненты
    // Аргументы
    props: {
        PathStr: String,
    },
    // Переменные
    data() {
        return {
            // ИмяПеременной: ЗначениеПоУмолчанию,
        };
    },
    // Методы
    methods: {
        backPath() {
            this.$emit("backPath");
        },
        updatePath(event) {
            this.$emit("updatePath", event.target.value);
        },
    },
};
</script>
<style lang="scss" scoped>
@import "wbs/vue/gcolor.scss";

.path {
    padding: 10px;
    color: $ЯркоеВыделение;
    background: $ЦветФона;
    display: flex;
    justify-content: row;
    align-items: center;
    input {
        font-size: 1.0em;
        flex-basis: 90%;
        color: $ЯркоеВыделение;
        background: $ЦветФона;
        border: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }
    button {
        flex-basis: 10%;
        align-self: stretch;
    }
}
</style>
