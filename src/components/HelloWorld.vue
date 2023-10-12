<template>
    <div>
        <h1>{{ msg }}</h1>
        <p>
            For a guide and recipes on how to configure / customize this project,
            <br/>
            check out the
            <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>
            .
        </p>
        <v-row class="m-row" no-gutters align="start">
            <v-col cols="6">
                <h3 class="from-store">
                    From Store
                    <v-btn class="plus" text icon color="green" @click="increment">
                        <v-icon>mdi-plus-circle-outline</v-icon>
                    </v-btn>
                    <v-btn class="minus" text icon color="red" @click="store.decrement(1)">
                        <v-icon>mdi-minus-circle-outline</v-icon>
                    </v-btn>
                </h3>
                <ul>
                    <li class="counter">Counter: {{ store.count }}</li>
                </ul>
            </v-col>
            <v-col>
                <h3>Vuetify</h3>
                <div class="purple darken-2 text-center round">
                    <span class="white--text">Lorem ipsum</span>
                </div>
                <div>
                    <v-btn class="my-2 alert" color="primary" @click="alert = !alert">
                        Toggle
                    </v-btn>
                </div>
                <v-alert :value="alert"
                         color="pink"
                         dark
                         border="top"
                         icon="mdi-home"
                         transition="scale-transition">
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                    dolore magna aliquyam erat, sed diam voluptua.</p>
                </v-alert>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { CounterStore } from '@/store/interfaces/CounterStore'
import { RootState } from '@/store/interfaces/RootState'
import { LoggerFactory } from '@mmit/logging'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
    private readonly logger = LoggerFactory.getLogger('vuetify-ts-starter.components.HelloWorld')

    @Prop() public msg!: string

    public alert: boolean = true

    public increment(): void {
        this.logger.debug('Clicked!')
        this.store.increment(1)
    }

    // noinspection JSUnusedLocalSymbols
    public get store(): CounterStore {
        return (this.$store.state as RootState).counterStore()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.from-store .v-btn--icon.v-size--default {
    width: auto;
}
</style>
