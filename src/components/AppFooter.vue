<template>
    <v-footer fixed dark>
        <v-row class="mb-6" no-gutters>
            <v-col>
                <v-btn class="mr-3" color="success" small @click="onClickIncrement">+</v-btn>
                <v-btn class="mr-3" color="error" small v-on:click="onClickDecrement">-</v-btn>
                <span>Loading... / {{ title_inc || title }} </span>
                <span v-if="isEven">even</span>
                <span v-if="counter % 2 !== 0">odd</span>
            </v-col>
            <v-col class="version_block align-end">
                <span class="version">Version {{ version }}</span>
                <span class="separator mx-1">/</span>
                <span class="published">{{ published }}</span>
            </v-col>
        </v-row>
        <!--        <div>-->
        <!--        </div>-->
        <!--        <div>-->
        <!--            <div class="version_block">-->
        <!--            </div>-->
        <!--            <span v-if="devmode" class="devmode">DevMode</span>-->
        <!--            <span v-if="!devmode" class="production">Production</span>-->
        <!--        </div>-->
    </v-footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CounterModule from '../store/modules/CounterModule';

@Component
export default class AppFooter extends Vue {
    @Prop({ default: process.env.VUE_APP_TITLE })
    private title!: string;

    // Component methods can be declared as instance methods
    public onClickIncrement(): void {
        CounterModule.increment(1);
        // this.anotherTitle = `${this.title} + ${counter.count}`;
    }

    public onClickDecrement(): void {
        CounterModule.decrement(1);
        // this.anotherTitle = `${this.title} + ${counter.count}`;
    }

    public get title_inc(): string {
        return `${this.title} + ${CounterModule.count}`;
    }

    public get published(): string {
        return process.env.VUE_APP_PUBLISHED || '<process.env.VUE_APP_PUBLISHED = undefined>';
    }

    public get version(): string {
        return process.env.VUE_APP_VERSION || '<process.env.VUE_APP_VERSION = undefined>';
    }

    public get devmode(): boolean {
        const devMode =
            process.env.VUE_APP_DEV_MODE || '<process.env.VUE_APP_DEV_MODE = undefined>';

        return devMode === 'true';
    }

    public get isEven(): boolean {
        return CounterModule.count % 2 === 0;
    }

    public get counter(): number {
        return CounterModule.count;
    }
}
</script>

<style scoped lang="scss">
.v-footer--absolute,
.v-footer--fixed {
    z-index: 4;

    .row {
        margin: 0 !important;
        padding: 0;
    }

    .col {
        background-color: inherit;
    }

    .version_block {
        text-align: right;
        font-size: 90%;
    }
}
</style>