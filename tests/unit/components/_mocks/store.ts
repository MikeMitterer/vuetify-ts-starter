import { appStore, AppStore } from '@/store/interfaces/AppStore'
import { CounterStore } from '@/store/interfaces/CounterStore'
import { RootState } from '@/store/interfaces/RootState'
import { webSocketStore, WebSocketStore } from '@/store/interfaces/WebSocketStore'
import AppModule from '@/store/modules/AppModule'
import CounterModule from '@/store/modules/CounterModule'
import WebSocketModule from '@/store/modules/WebSocketModule'
import { isNotRegistered } from '@/store/utils'
import { LoggerFactory } from '@mmit/logging'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { getModule } from 'vuex-module-decorators'

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
}

export const store = new Vuex.Store<RootState>({
    state,
    // modules: {
    //     gameModule,
    // },
})
