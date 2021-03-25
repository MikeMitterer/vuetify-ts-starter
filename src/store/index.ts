import { CounterStore } from '@/store/interfaces/CounterStore'
import { RootState } from '@/store/interfaces/RootState'
import { webSocketStore, WebSocketStore } from '@/store/interfaces/WebSocketStore'
import CounterModule from '@/store/modules/CounterModule'
import WebSocketModule from '@/store/modules/WebSocketModule'
import { isNotRegistered } from '@/store/utils'
import Vue from 'vue'
import Vuex, { ActionContext, ActionTree, MutationTree } from 'vuex'
import { getModule } from 'vuex-module-decorators'

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
            // console.log('Register jobModule...');
            // registerModule src: http://bit.ly/34uLFBk
            store.registerModule(CounterModule.NAME, CounterModule)
        }
        // getModule src: http://bit.ly/2CfpLWQ
        return getModule(CounterModule, store)
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
    async readyState(context: ActionContext<RootState, RootState>, payload: undefined): Promise<void> {

        await context.state.webSocketStore().init()
        await context.state.counterStore().init()

        context.commit('readyState', true)
    },
}

/**
 * Mutations are synchronous
 *
 *      context.commit('readyState', loadState);
 */
const mutations: MutationTree<RootState> = {
    readyState(status: RootState, payload): void {
        // logger.info(`readyState - Mutation`);
        status.loaded = true
    },
}

const store = new Vuex.Store<RootState>({
    state,
    actions,
    mutations,
    // modules: {
    //     gameModule,
    // },
})

export default store
