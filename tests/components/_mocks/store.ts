import { LoggerFactory } from '@mmit/logging'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { getModule } from 'vuex-module-decorators'
import { appStore, AppStore } from '../../../src/store/interfaces/AppStore'
import { CounterStore } from '../../../src/store/interfaces/CounterStore'
import { RootState } from '../../../src/store/interfaces/RootState'
import { webSocketStore, WebSocketStore } from '../../../src/store/interfaces/WebSocketStore'
import AppModule from '../../../src/store/modules/AppModule'
import CounterModule from '../../../src/store/modules/CounterModule'
import WebSocketModule from '../../../src/store/modules/WebSocketModule'
import { isNotRegistered } from '../../../src/store/utils'
import {authStore, AuthStore} from "@/store/interfaces/AuthStore";
import AuthModule from "@/store/modules/AuthModule";

export const localVue = createLocalVue()

localVue.use(Vuex)

// LoggerFactory.defaultLevel = LogLevel.DEBUG;

const state: RootState = {
    loaded: true,

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
        const logger = LoggerFactory.getLogger('test.unit.components._mocks.store.counterStore')

        if (isNotRegistered(CounterModule.NAME, store)) {
            logger.debug('Register jobModule...')
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

export const store = new Vuex.Store<RootState>({
    state,
    // modules: {
    //     gameModule,
    // },
})
