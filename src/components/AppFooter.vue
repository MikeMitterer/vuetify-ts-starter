<template>
    <v-footer fixed dark>
        <v-row class="mb-6" no-gutters>
            <v-col>
                <v-btn class="mr-3" color="success" small @click="onClickIncrement">+</v-btn>
                <v-btn class="mr-3" color="error" small v-on:click="onClickDecrement">-</v-btn>
                <span>Loading... / {{ title_inc || title }} </span>
                <span v-if="isEven">even</span>
                <span v-if="count % 2 !== 0">odd</span>
            </v-col>
            <v-col class="version_block align-end">
                <span class="version">Version {{ version }}</span>
                <span class="separator mx-1">/</span>
                <span class="published">{{ published }}</span>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
// import CounterModule from '../store/modules/CounterModule';

// Weitere Infos:
//      https://medium.com/@fernalvarez/level-up-your-vuejs-project-with-typescript-part-3-vuex-7ad6333db947
//      https://github.com/ktsn/vuex-class
const counterModule = namespace('counterModule');

@Component
export default class AppFooter extends Vue {
    @Prop({ default: process.env.VUE_APP_TITLE })
    private title!: string;

    @counterModule.Getter
    private readonly count!: number;

    @counterModule.Action
    private increment!: (delta: number) => Promise<number>;

    @counterModule.Action
    private decrement!: (delta: number) => Promise<number>;

    // Component methods can be declared as instance methods
    public onClickIncrement(): void {
        // CounterModule.increment(1);
        this.increment(1);
    }

    public onClickDecrement(): void {
        // CounterModule.decrement(1);
        this.$store.dispatch('counterModule/decrement', 1);
    }

    public get title_inc(): string {
        return `${this.title} + ${this.count}`;
        // return `${this.title} + ${CounterModule.count}`;
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
        // return CounterModule.count % 2 === 0;
        return this.count % 2 === 0;
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
