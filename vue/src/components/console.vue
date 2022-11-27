<template>
    <div class="console">
        <div class="command">
            <!-- {{ consoleStr }} -->
            <div class="in">
                <div>[1]</div>
                <input class="input_in" type="text" :value="consoleStr" />
            </div>
            <div class="input_out" type="text">{{ consoleStr }}</div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    // Компоненты
    components: {},
    // Аргументы
    props: {
        consoleStr: String,
    },
    // Переменные
    data() {
        return {
            // ИмяПеременной: ЗначениеПоУмолчанию,
        };
    },
    // Методы
    methods: {},
};
</script>
<style lang="scss" scoped>
* {
    padding: 0px;
    margin: 0px;
}

@import "wbs/vue/gcolor.scss";
input {
    background: $ЦветФона;
    color: $ПриглушенныйЦветТекста;
    outline: 1px solid $ЯркоеВыделение;
    border-radius: 1px;
    width: 90%;
    height: 100%;
    border: none;
    font-size: medium;
    padding: 6px;
    &:focus {
        outline: 1px solid $ЯркоеВыделение2;
    }
}
.console {
    width: 100%;
    height: 100%;
    background: $ЦветФона;
    color: $ПриглушенныйЦветТекста;
    padding: 10px;
    box-shadow: inset 0 0 15px 1px #000;
    .command {
        display: flex;
        flex-direction: column;
        height: 30%;
        .in {
            height: 30%;
            width: 100%;
            display: flex;
            flex-direction: row;
            .input_in {
                width: 96%;
            }
            div {
                text-align: center;
                width: 4%;
                padding-top: 2px;
                padding-right: 4px;
            }
        }

        .input_out {
            // margin-top: 10px;
            height: 70%;
            text-align: start;
            display: table-cell;
            vertical-align: middle;
            vertical-align: top;
            width: 100%;
        }
    }
}
</style>
