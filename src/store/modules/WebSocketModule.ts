import { RootState } from '@/store/interfaces/RootState'
import { WebSocketStore, webSocketStore } from '@/store/interfaces/WebSocketStore'
import { getWebSocketServe } from '@/store/utils/WebSocketServer'
import { LoggerFactory, LogLevel } from '@mmit/logging'

import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ namespaced: true, name: webSocketStore.NAME })
export default class WebSocketModule extends VuexModule implements WebSocketStore {
    private readonly logger = LoggerFactory.for('vuetify-ts-starter.store.modules.WebSocket')
        .level(LogLevel.INFO)
        .get()

    public isConnected: boolean = false

    // - Actions -----------------------------------------------------------------------------------

    /**
     * Init wird durch den Create-Hook in  App.vue angestoßen
     *
     * action 'init' commits mutation '_init' when done
     */
    @Action({ commit: '_init' })
    public async init(): Promise<void> {
        try {
            const webSocketUrl = getWebSocketServe().url
            let timerID: ReturnType<typeof setInterval> | undefined

            this.logger.info('WebSocketModule initializing...', webSocketUrl)

            let webSocket: WebSocket
            let isConnecting = false

            const autoConnect = async (): Promise<void> => {
                if (typeof timerID !== 'undefined') {
                    clearInterval(timerID)
                    timerID = undefined
                }
                timerID = setInterval(() => {
                    if (webSocket === undefined && !isConnecting) {
                        isConnecting = true
                        connect()
                    }
                }, 1000)
            }

            const connect = async (): Promise<void> => {
                webSocket = new WebSocket(webSocketUrl)

                webSocket.onopen = (_: Event): void => {
                    isConnecting = false
                    this.logger.info('Connection established')

                    this.localStore.connectionState('connected')
                }

                webSocket.onmessage = (event): void => {
                    this.logger.info('Data received from server', event.data)
                    // app.$emit('event', event.data)
                }

                webSocket.onclose = (event: CloseEvent): void => {
                    if (event.wasClean) {
                        this.logger.info(`Connection closed cleanly, code=${event.code} reason=${event.reason}`)
                    } else {
                        // e.g. server process killed or network down
                        // event.code is usually 1006 in this case
                        this.logger.info(`Connection died`)
                    }
                    this.localStore.connectionState('disconnected')
                }

                webSocket.onerror = (error: Event): void => {
                    this.logger.info(`Error occurred!`, error)
                }
            }

            // noinspection ES6MissingAwait
            autoConnect()

        } catch (_) {
            this.logger.error('Could not establish ab WebSocket-Connection - continue without!')
        }
    }

    @Action({ commit: '_connectionState' })
    private async connectionState(state: 'connected' | 'disconnected'): Promise<boolean> {
        return state === 'connected'
    }

    // - Keep all the Mutations private - we don't want to call Mutations directly -----------------

    @Mutation
    private _init(_: unknown): void {
        this.logger.info('WebSocketModule initialized!')
    }

    @Mutation
    private _connectionState(payload: boolean): void {
        this.isConnected = payload
    }

    // - Stores / Stats - (sind in Mutations nicht verfügbar) ----------------------------------------------------------

    private get localStore(): WebSocketModule {
        return (this.context.rootState as RootState).webSocketStore() as WebSocketModule
    }

    // private get localState(): SettingsStore {
    //     return this.context.state as SettingsStore
    // }
}
