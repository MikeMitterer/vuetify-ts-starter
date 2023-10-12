import { appStore, AppStore } from '@/store/interfaces/AppStore'
import { CounterStore } from '@/store/interfaces/CounterStore'
import { RootState } from '@/store/interfaces/RootState'
import { webSocketStore, WebSocketStore } from '@/store/interfaces/WebSocketStore'
import AppModule from '@/store/modules/AppModule'
import CounterModule from '@/store/modules/CounterModule'
import WebSocketModule from '@/store/modules/WebSocketModule'
import { isNotRegistered } from '@/store/utils'
import Vue from 'vue'
import Vuex, { ActionContext, ActionTree, MutationTree } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import {authStore, AuthStore} from "@/store/interfaces/AuthStore";
import AuthModule from "@/store/modules/AuthModule";
import {LoggerFactory} from "@mmit/logging";

// import gameModule from './modules/GameModule';

Vue.use(Vuex)

const state: RootState = {
    loaded: false,

    webSocketStore: (): WebSocketStore => {
        if (isNotRegistered(webSocketStore.NAME, store)) {
            // console.log('Register jobModule...');
            // registerModule src: http://bit.ly/34uLFBk
            store.registerModule(webSocketStore.NAME, WebSocketModule)
        }
        // getModule src: http://bit.ly/2CfpLWQ
        return getModule(WebSocketModule, store)
    },

    counterStore: (): CounterStore => {
        if (isNotRegistered(CounterModule.NAME, store)) {
            store.registerModule(CounterModule.NAME, CounterModule)
        }
        return getModule(CounterModule, store)
    },

    appStore: (): AppStore => {
        if (isNotRegistered(appStore.NAME, store)) {
            store.registerModule(appStore.NAME, AppModule)
        }
        return getModule(AppModule, store)
    },

    authStore: (): AuthStore => {
        if (isNotRegistered(authStore.NAME, store)) {
            store.registerModule(authStore.NAME, AuthModule)
        }
        return getModule(AuthModule, store)
    },
}

/**
 * Actions can be asynchronous.
 *
 * Make it a practice to never commit your Mutations directly.
 * Always use Actions to commit your mutations
 *
 *      this.$store.dispatch('readyState');
 */
const actions: ActionTree<RootState, RootState> = {
    /**
     * main.ts (app) fires "readyState" if mounted
     *
     * @param context
     * @param payload
     */
    async readyState(context: ActionContext<RootState, RootState>, payload: boolean = true): Promise<void> {

        await context.state.authStore().init()

        await context.state.webSocketStore().init()

        await context.state.counterStore().init()

        await context.state.appStore().init()

        context.commit('readyState', payload)
    },
}

/**
 * Mutations are synchronous
 *
 *      context.commit('readyState', loadState);
 */
const mutations: MutationTree<RootState> = {
    readyState(status: RootState, payload): void {
        const logger = LoggerFactory.getLogger('vuetify-ts-starter.store.mutations.readyState')

        status.loaded = payload

        logger.info('Root-Store initialized!')
    },
}

export const store = new Vuex.Store<RootState>({
    state,
    actions,
    mutations,
    // modules: {
    //     gameModule,
    // },
})


